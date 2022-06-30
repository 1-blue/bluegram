import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import fileStore from "session-file-store";
import passport from "passport";
import cors from "cors";
import morgan from "morgan";
import hpp from "hpp";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";

import db from "./models/index.js";
import passportConfig from "./passport/index.js";

const __dirname = path.resolve();
const FileStore = fileStore(expressSession);
const app = express();
app.set("PORT", 8080);

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
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: "https://blegram.com",
    }),
  );
  app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      name: "blegram",
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
        domain: "blegram.com",
      },
      store: new FileStore(),
    }),
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    }),
  );
  app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      name: "blegram",
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
      store: new FileStore(),
    }),
  );
}
app.use(passport.initialize());
app.use(passport.session());

// routes
import authRouter from "./routes/auth.js";
import photoRouter from "./routes/photo.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import postsRouter from "./routes/posts.js";
import likeRouter from "./routes/like.js";
import commentRouter from "./routes/comment.js";
import followRouter from "./routes/follow.js";
import bookmarkRouter from "./routes/bookmark.js";
import roomRouter from "./routes/room.js";
import chatsRouter from "./routes/chats.js";

// router 등록
app.use("/api/auth", authRouter);
app.use("/api/photo", photoRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/posts", postsRouter);
app.use("/api/like", likeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/follow", followRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use("/api/room", roomRouter);
app.use("/api/chats", chatsRouter);

import database from "./models/index.js";
const { Chat } = database;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://blegram.com",
    credentials: true,
  },
});
// 소켓 최초 연결
io.on("connection", socket => {
  // console.log("소켓 연결 완료 >> ", socket.id);
  console.log("연결된 소켓 >> ", io.engine.clientsCount);

  // 소켓 연결 후 방에 입장
  socket.on("onJoinRoom", roomId => socket.join(roomId));

  socket.on("onSend", async ({ user, roomId, chat }) => {
    Chat.create({
      contents: chat,
      UserId: user._id,
      RoomId: +roomId,
    });

    socket.broadcast.to(roomId).emit("onReceive", { user, chat });
  });
});

// 404 에러처리 미들웨어
app.use((req, res, next) => {
  console.log("404 에러처리 미들웨어");
  res.status(404).send("404 에러처리 미들웨어");
});

// 에러처리 미들웨어
app.use((error, req, res, next) => {
  console.error("에러처리 미들웨어 >>", error);
  res.status(500).json({ error: "500 Error처리 미들웨어" });
});

httpServer.listen(app.get("PORT"), console.log(`${app.get("PORT")}번 대기중`));
