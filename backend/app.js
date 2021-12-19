import dotenv from "dotenv";
dotenv.config();

import path from "path";
import fs from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import fileStore from "session-file-store";
import passport from "passport";
import cors from "cors";

import db from "./models/index.js"
import passportConfig from "./passport/index.js";

const __dirname = path.resolve();
const FileStore = fileStore(expressSession);
const app = express();
app.set("PORT", process.env.PORT);

try {
  fs.accessSync(path.join(__dirname, "public"));
  fs.accessSync(path.join(__dirname, "public", "images"));
} catch (error) {
  fs.mkdirSync(path.join(__dirname, "public"));
  fs.mkdirSync(path.join(__dirname, "public", "images"));
}

// sequelize
db.sequelize
  .sync({ force: false, alter: false })
  .then(() => console.log("DB 연결 성공!"))
  .catch(error => console.error("DB 연결 실패 >> ", error));

// passport
passportConfig();

// middleware
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    name: "session-cookie",
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new FileStore(),
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  credentials: true,
  origin: process.env.CLENT_URL
}));

// routes
import authRouter from "./routes/auth.js";
import imageRouter from "./routes/image.js";
import userRouter from "./routes/user.js";

// router 등록
app.use("/auth", authRouter);
app.use("/image", imageRouter);
app.use("/user", userRouter);

// 404 에러처리 미들웨어
app.use(function(req, res, next) {
  console.log("404 에러처리 미들웨어");
  res.status(404).send('404');
});

// 에러처리 미들웨어
app.use((error, req, res, next) => {
  console.error("에러처리 미들웨어 >>", error);
  res.status(500).json({ error: "Error" });
});

app.listen(app.get("PORT"), console.log(`${app.get("PORT")}번 대기중`));
