import passport from "passport";
import passportLocalConfig from "./local.js";
import passportKakaoConfig from "./kakao.js";
import db from "../models/index.js";

const { User } = db;

const passportConfig = () => {
  passport.serializeUser(({ user, accessToken }, done) => {
    done(null, { _id: user._id, accessToken });
  });

  passport.deserializeUser(async ({ _id, accessToken }, done) => {
    try {
      const user = await User.findOne({ where: { _id } });
      user.accessToken = accessToken;
      done(null, user);
    } catch (error) {
      console.error("deserializeUser >> ", error);
      done(error);
    }
  });

  passportLocalConfig();
  passportKakaoConfig();
};

export default passportConfig;
