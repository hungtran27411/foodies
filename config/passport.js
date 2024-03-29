const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const UserModel = require("../models/user");
passport.use(new GoogleStrategy(
  // Configuration object
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  // The verify callback function...
  // Marking a function as an async function allows us
  // to consume promises using the await keyword
  async function(accessToken, refreshToken, profile, cb) {
    // A user has logged in with OAuth...
    // Instead of using promise.then with a callback,
    // we can use the await keyword followed by the promise.
    // When that promise is fulfilled, it will return
    // whatever the promise's resolved value is.
    let user = await UserModel.findOne({ googleId: profile.id });
    // Existing user found, so provide it to passport
    if (user) return cb(null, user);
    // We have a new user via OAuth!
    // When using async/await to consume promises,
    // there is no use of .then or .catch, so we
    // use a try/catch block to handle an error
    try {
      user = await UserModel.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value
      });
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(userId, cb) {
  UserModel.findById(userId).then(function(user) {
    cb(null, user);
  });
});
