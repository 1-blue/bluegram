import passport from "passport";
import passportLocalConfig from "./local.js";
import db from "../models/index.js"

const { User } = db;

const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (_id, done) => {
    try {
      const user = await User.findOne({ where: { _id } });
      done(null, user);
    } catch (error) {
      console.error("deserializeUser >> ", error);
      done(error)
    }
  });
  
  passportLocalConfig();
}

export default passportConfig;