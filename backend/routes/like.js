import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { Post } = db;

// 2021/12/25 - 좋아요 추가 - by 1-blue
router.post("/post/:PostId", isLoggedIn, async (req, res, next) => {
  const PostId = +req.params.PostId;
  const { _id: UserId } = req.user;

  try {
    const targetPost = await Post.findOne({ where: { _id: PostId } });

    // 2021/12/25 - 존재 하지 않는 게시글에 좋아요 누른 경우 - by 1-blue
    if (!targetPost) {
      return res
        .status(404)
        .json({ message: "존재하지 않는 게시글에 좋아요를 누르셨습니다.\n새로 고침 후 다시 시도해 주세요" });
    }

    // 2021/12/25 - 좋아요를 누른 게시글에 다시 좋아요 추가 요청인 경우 - by 1-blue
    if (await targetPost.hasLikers(UserId)) {
      return res.status(409).json({ message: "이미 좋아요를 누른 게시글입니다.\n새로 고침 후 다시 시도해 주세요." });
    }

    // 2021/12/25 - 정상적으로 좋아요 추가 - by 1-blue
    const [result] = await targetPost.addLikers(UserId);

    res.json({ message: `${req.user.name}님 게시글에 좋아요를 누르셨습니다.`, result });
  } catch (error) {
    console.error("POST /like/:PostId >> ", error);
    next(error);
  }
});

// 2021/12/25 - 좋아요 제거 - by 1-blue
router.delete("/post/:PostId", async (req, res, next) => {
  const PostId = +req.params.PostId;
  const { _id: UserId } = req.user;

  try {
    const targetPost = await Post.findOne({ where: { _id: PostId } });

    // 2021/12/25 - 존재 하지 않는 게시글에 좋아요 누른 경우 - by 1-blue
    if (!targetPost) {
      return res
        .status(404)
        .json({ message: "존재하지 않는 게시글에 좋아요를 누르셨습니다.\n새로 고침 후 다시 시도해 주세요" });
    }

    // 2021/12/25 - 좋아요를 제거한 게시글에 다시 좋아요 제거 요청인 경우 - by 1-blue
    if (!(await targetPost.hasLikers(UserId))) {
      return res.status(409).json({ message: "좋아요를 누르지 않은 게시글입니다.\n새로 고침 후 다시 시도해 주세요." });
    }

    // 2021/12/25 - 정상적으로 좋아요 제거 - by 1-blue
    await targetPost.removeLikers(UserId);

    res.json({
      message: `${req.user.name}님 게시글에 좋아요를 취소하셨습니다.`,
      result: { removedPostId: PostId, UserId },
    });
  } catch (error) {
    console.error("POST /like/:PostId >> ", error);
    next(error);
  }
});

export default router;
