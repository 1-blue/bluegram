import dotenv from "dotenv";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();

const __dirname = path.resolve();

const app = express();
app.set("PORT", process.env.PORT);

// middleware
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    name: "session-cookie",
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

// routes
import authRouter from "./routes/auth.js";

// router 등록
app.use("/auth", authRouter);

// 에러처리 미들웨어
app.use((error, req, res, next) => {
  console.error("에러처리 미들웨어 >>", error);
  res.status(500).json({ error: "Error" });
});

app.listen(app.get("PORT"), console.log(`${app.get("PORT")}번 대기중`));
