const passport = require("passport");
//following line returns an object but we only need the strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ facebookId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //there is a user with this id
          done(null, existingUser);
        } else {
          //lets make a new user
          new User({ facebookId: profile.id })
            .save()
            .then((user) => done(null, user)); //the user in this instance is the freshest
        }
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      //this is creating a model instance and then saving it to DB
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //there is a user with this id
          done(null, existingUser);
        } else {
          //lets make a new user
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user)); //the user in this instance is the freshest
        }
      });
    }
  )
);
