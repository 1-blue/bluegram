import express from "express";
import passport from "passport";

import db from "../models/index.js";
import { isLoggedIn, isNotLoggedIn } from "../middleware/index.js"

const router = express.Router();
const { User, Post, Image } = db;

// 로그인
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
    
    return req.login(user, async loginError => {
      if (loginError) {
        console.error("POST /user/login loginError >> ", loginError);
        return res.status(500).json({ message: "서버에서 알 수 없는 에러가 발생했습니다. 잠시후에 다시 시도해주세요" });
      }

      // 유저와 유저와 관련된 정보까지 모아서 찾음
      const fullUser = await User.findOne({
        attributes: ["_id", "name", "createdAt"],
        where: { _id: req.user._id },
        include: [
          { model: Image },
          { model: Post, attributes: ["_id"] },
          { model: User, as: "Followers" },
          { model: User, as: "Followings" }
        ],
      });
      
      return res.status(200).json({ message: "로그인에 성공했습니다.", user: fullUser });
    });
  })(req, res, next);
});

// 로그아웃
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(204).json({ message: "로그아웃에 성공했습니다." });
});

export default router;
