const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");
//express doesnt automaticaly parse info in the POST request. SO you
//cant get the token from req object thats why we install bodyParser

module.exports = (app) => {
  //we didnt invoke requireLogin coz we want express to do it
  //internally when a request comes in
  //express has a simple requirement that one of the functions or middlewares
  //has to return a response
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "5 bucks for 5 surveys",
      source: req.body.id,
    });
    //req.user is wired up automatically by passport
    req.user.credits += 5;
    //since save takes some time thats why we use await and
    //the second user is the freshest copy of the same user
    const user = await req.user.save();
    res.send(user);
  });
};
