//we define an arrow function and then we immidiately export it and
//we wire that up to express app object inside top level index.js
//mongoose sometimes causes trouble if you require a model multiple times

const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplate/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting");
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
