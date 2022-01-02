import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import axios from "axios";

import db from "../models/index.js";
import { isLoggedIn, isNotLoggedIn } from "../middleware/index.js";

const router = express.Router();
const { User, Post, Image } = db;

// 로컬 로그인
router.post("/", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (error, user, message) => {
    // 서버측 에러 ( 조건검사 도중에 에러 )
    if (error) {
      console.error("POST /auth >> ", error);
      return res.status(500).json({ message: "서버에서 알 수 없는 에러가 발생했습니다. 잠시후에 다시 시도해주세요" });
    }

    // 클라이언트측 에러 ( 아이디 or 비밀번호 불일치 )
    if (message) {
      return res.status(403).json({ message });
    }

    return req.login({ user }, async loginError => {
      if (loginError) {
        console.error("POST /user/login loginError >> ", loginError);
        return res.status(500).json({ message: "서버에서 알 수 없는 에러가 발생했습니다. 잠시후에 다시 시도해주세요" });
      }

      // 유저와 유저와 관련된 정보까지 모아서 찾음
      const fullUser = await User.findOne({
        attributes: ["_id", "name", "createdAt"],
        where: { _id: user._id },
        include: [
          { model: Image },
          { model: Post, attributes: ["_id"] },
          { model: User, as: "Followers" },
          { model: User, as: "Followings" },
        ],
      });

      return res.status(200).json({ message: "로그인에 성공했습니다.", user: fullUser });
    });
  })(req, res, next);
});

// 카카오 로그인
router.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect(process.env.NODE_ENV === "production" ? "http://www.bluegram.cf" : "http://localhost:8080");
  },
);

// 로그아웃
router.delete("/", isLoggedIn, async (req, res, next) => {
  if (req.user.accessToken) {
    try {
      await axios.post("https://kapi.kakao.com/v1/user/unlink", null, {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
  req.logout();
  req.session.destroy();
  res.status(200).clearCookie("auth-bluegram").json({ message: "로그아웃에 성공했습니다." });
});

export default router;
