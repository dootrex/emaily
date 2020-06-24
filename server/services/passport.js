const passport = require("passport");
//following line returns an object but we only need the strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  //accesing user from mongodb as User is assigned up
  User.findById(id).then((user) => {
    done(null, user);
  });
});
//the following code was mostly found from facebook developer site
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAppID,
      clientSecret: keys.facebookSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        //there is a user with this id
        done(null, existingUser);
      } else {
        //lets make a new user
        const user = await new User({
          facebookId: profile.id,
          userName: profile.displayName,
        }).save();
        done(null, user); //the user in this instance is the freshest
      }
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
    async (accessToken, refreshToken, profile, done) => {
      //this is creating a model instance and then saving it to DB
      const existingUser = await User.findOne({
        googleId: profile.id,
      });
      if (existingUser) {
        //there is a user with this id
        done(null, existingUser);
      } else {
        //lets make a new user
        const user = await new User({
          googleId: profile.id,
          userName: profile.displayName,
        }).save();
        done(null, user); //the user in this instance is the freshest
      }
    }
  )
);
