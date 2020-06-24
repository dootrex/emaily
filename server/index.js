const express = require("express");
const app = express();
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./models/Users");
require("./services/passport");

//starts up the mongodb connection by telling the key through mongoose
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//.use statements are for middlewares
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //its an array because it allows multiple keys for additional security
    keys: [keys.cookieKey],
  })
);
//.initialize starts the passport
app.use(passport.initialize());
//assport.session() acts as a middleware to alter the req object and change the 'user'
//value that is currently the session id (from the client cookie) into the true deserialized user object
//session makes use of serializer and deserializer function which we defined in passport file
app.use(passport.session());
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app); //these return a function which takes app as an arg

if (process.env.NODE_ENV === "production") {
  //express will serve up production assets in the client build such as main.js
  app.use(express.static("client/build"));
  //express will serve index.html if it doesnt recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT);
