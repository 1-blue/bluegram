import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User } = db;

// // 2021/12/30 - 팔로워 가져오기 - by 1-blue
// router.get("/follower/:UserId", isLoggedIn, async (req, res, next) => {
//   const UserId = +req.params.UserId;
//   const lastId = +req.query.lastId;

//   try {
//   } catch (error) {
//     console.error("POST /comment/post/:CommentId >> ", error);
//     next(error);
//   }
// });

// 2021/12/30 - 팔로우하기- by 1-blue
router.post("/follower/:UserId", isLoggedIn, async (req, res, next) => {
  const UserId = +req.params.UserId;

  try {
    const me = await User.findByPk(req.user._id);

    const Following = await me.addFollowings(UserId);

    if (!Following)
      return res.status(404).json({ message: "존재하지 않는 유저를 팔로우하셨습니다.\n잠시후에 다시 시도해주세요" });

    return res.json({ message: `팔로우에 성공하셨습니다.`, Follow: Following[0] });
  } catch (error) {
    console.error("POST /comment/post/:CommentId >> ", error);
    next(error);
  }
});

// 2021/12/30 - 언팔로우하기 - by 1-blue
router.delete("/follower/:UserId", isLoggedIn, async (req, res, next) => {
  const UserId = +req.params.UserId;

  try {
    const me = await User.findByPk(req.user._id);

    const result = await me.removeFollowings(UserId);

    console.log(result);

    if (result === 0)
      return res.status(404).json({ message: "존재하지 않는 유저를 언팔로우하셨습니다.\n잠시후에 다시 시도해주세요" });

    return res.json({
      message: `언팔로우에 성공하셨습니다.`,
      Follow: { unfollowingId: UserId, unfollowerId: req.user._id },
    });
  } catch (error) {
    console.error("DELETE /comment/post/:CommentId >> ", error);
    next(error);
  }
});

export default router;
