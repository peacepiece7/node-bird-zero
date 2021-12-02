const passport = require("passport");
const { User } = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.fineOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.log(error);
      done(error);
    }
  });
  local();
};
