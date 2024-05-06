const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const User = require("./models/userModel");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
  new JwtStrategy(opts,async function (jwt_payload, done) {
    try {
      const user = await User.getUserById(jwt_payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log(error);
    }
  })
);
