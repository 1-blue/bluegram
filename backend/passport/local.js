import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../models/index.js";
import bcrypt from "bcrypt";

const { User } = db;

const passportLocalConfig = () =>
  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
      },
      async (id, password, done) => {
        try {
          const user = await User.findOne({ where: { id } });
          if (!user) return done(null, false, "존재하지 않는 아이디입니다.");

          const result = await bcrypt.compare(password, user.password);
          if (result) return done(null, user);

          return done(null, false, "비밀번호가 틀렸습니다.");
        } catch (error) {
          console.error("passport local >> ", error);
          return done(error);
        }
      },
    ),
  );

export default passportLocalConfig;
