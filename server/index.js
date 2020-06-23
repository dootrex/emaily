const express = require("express");
const app = express();
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");

require("./models/Users");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //its an array because it allows multiple keys for additional security
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app); //these return a function which takes app as an arg
const PORT = process.env.PORT || 5000;

app.listen(PORT);
