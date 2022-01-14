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
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";

import db from "./models/index.js";
import passportConfig from "./passport/index.js";

const __dirname = path.resolve();
const dist = path.join(__dirname, "..", "frontend", "dist");
const FileStore = fileStore(expressSession);
const app = express();
app.set("PORT", 3000);

try {
  fs.accessSync(path.join(__dirname, "public"));
} catch (error) {
  fs.mkdirSync(path.join(__dirname, "public"));
}
// 실제 사용될 이미지를 저장할 곳
try {
  fs.accessSync(path.join(__dirname, "public", "images"));
} catch (error) {
  fs.mkdirSync(path.join(__dirname, "public", "images"));
}
// 게시글 생성 전에 임시로 이미지를 저장해둘 곳
try {
  fs.accessSync(path.join(__dirname, "public", "images", "preview"));
} catch (error) {
  fs.mkdirSync(path.join(__dirname, "public", "images", "preview"));
}
// 삭제된 게시글의 이미지를 저장해둘 곳
try {
  fs.accessSync(path.join(__dirname, "public", "images", "deleted"));
} catch (error) {
  fs.mkdirSync(path.join(__dirname, "public", "images", "deleted"));
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
app.use("/", express.static(dist));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    name: "auth-bluegram",
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

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: "https://bluegram.cf",
    }),
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:8080",
    }),
  );
}

// routes
import authRouter from "./routes/auth.js";
import imageRouter from "./routes/image.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import likeRouter from "./routes/like.js";
import commentRouter from "./routes/comment.js";
import followRouter from "./routes/follow.js";

// router 등록
app.use("/auth", authRouter);
app.use("/image", imageRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);
app.use("/comment", commentRouter);
app.use("/follow", followRouter);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: dist });
  });
} else {
  // 404 에러처리 미들웨어
  app.use((req, res, next) => {
    console.log("404 에러처리 미들웨어");
    res.status(404).send("404");
  });
}

// 에러처리 미들웨어
app.use((error, req, res, next) => {
  console.error("에러처리 미들웨어 >>", error);
  res.status(500).json({ error: "Error" });
});

app.listen(app.get("PORT"), console.log(`${app.get("PORT")}번 대기중`));
