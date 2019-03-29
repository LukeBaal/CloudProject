const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const Company = require('../models/Company');
const keys = require('./keys');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.MONGO_SECRET
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.name) {
        Company.findById(jwt_payload.id)
          .then(company => {
            if (company) {
              return done(null, company);
            }

            return done(null, false);
          })
          .catch(err => console.log(err));
      } else {
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }

            return done(null, false);
          })
          .catch(err => console.log(err));
      }
    })
  );
};
