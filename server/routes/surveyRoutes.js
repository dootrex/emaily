//we define an arrow function and then we immidiately export it and
//we wire that up to express app object inside top level index.js
//mongoose sometimes causes trouble if you require a model multiple times
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting");
  });

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const allevents = _.map(req.body, (event) => {
      const pathname = new URL(event.url).pathname;
      const p = new Path("/api/surveys/:surveyId/:choice");
      const match = p.test(pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    });
    //you can use lodash chain function to compact this code by a lot
    const compactEvents = _.compact(allevents);
    const events = _.uniqBy(compactEvents, "email", "surveyId");
    events.forEach(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: Date.now(),
        }
      ).exec();
    });
    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    //we will create an instance of the survey which does not automatically add it to the
    //database. Therefore use a function like save() on the survey
    const survey = new Survey({
      //es6 syntactic sugar for destructring
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => {
        //didnt use es6 destructing to convey easily whats happening
        //could have been email => ({email})
        //we used email.trim() coz there could be trailing or leading spaces
        //in recipients string
        return { email: email.trim() };
      }),
      _user: req.user.id,
      dateSent: Date.now(),
      lastResponded: Date.now(),
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err); //422 means unprocessable entity
    }
  });
};
