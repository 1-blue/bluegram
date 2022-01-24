import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { Post, Comment, Image, User } = db;

// 2022/01/18 - 게시글에 좋아요 추가 - by 1-blue
router.post("/post/:PostId", isLoggedIn, async (req, res, next) => {
  const PostId = +req.params.PostId;
  const { _id: UserId } = req.user;

  try {
    const targetPost = await Post.findOne({ where: { _id: PostId }, include: [{ model: User, attributes: ["name"] }] });

    // 2022/01/18 - 존재 하지 않는 게시글에 좋아요 누른 경우 - by 1-blue
    if (!targetPost) {
      return res
        .status(404)
        .json({ message: "존재하지 않는 게시글에 좋아요를 누르셨습니다.\n새로 고침 후 다시 시도해 주세요" });
    }

    // 2022/01/18 - 좋아요를 누른 게시글에 다시 좋아요 추가 요청인 경우 - by 1-blue
    if (await targetPost.hasPostLikers(UserId)) {
      return res.status(409).json({ message: "이미 좋아요를 누른 게시글입니다.\n새로 고침 후 다시 시도해 주세요." });
    }

    // 2022/01/18 - 정상적으로 좋아요 추가 - by 1-blue
    await targetPost.addPostLikers(UserId);

    res.json({
      message: `${targetPost.User.name}님의 게시글에 좋아요를 누르셨습니다.`,
      likedPostId: PostId,
      UserId,
    });
  } catch (error) {
    console.error("POST /like/post/:PostId >> ", error);
    next(error);
  }
});

// 2022/01/18 - 게시글에 좋아요 제거 - by 1-blue
router.delete("/post/:PostId", isLoggedIn, async (req, res, next) => {
  const PostId = +req.params.PostId;
  const { _id: UserId } = req.user;

  try {
    const targetPost = await Post.findOne({ where: { _id: PostId }, include: [{ model: User, attributes: ["name"] }] });

    // 2022/01/18 - 존재 하지 않는 게시글에 좋아요 누른 경우 - by 1-blue
    if (!targetPost) {
      return res
        .status(404)
        .json({ message: "존재하지 않는 게시글에 좋아요를 누르셨습니다.\n새로 고침 후 다시 시도해 주세요" });
    }

    // 2022/01/18 - 좋아요를 제거한 게시글에 다시 좋아요 제거 요청인 경우 - by 1-blue
    if (!(await targetPost.hasPostLikers(UserId))) {
      return res.status(409).json({ message: "좋아요를 누르지 않은 게시글입니다.\n새로 고침 후 다시 시도해 주세요." });
    }

    // 2022/01/18 - 정상적으로 좋아요 제거 - by 1-blue
    await targetPost.removePostLikers(UserId);

    res.json({
      message: `${targetPost.User.name}님 게시글에 좋아요를 취소하셨습니다.`,
      unlikedPostId: PostId,
      UserId,
    });
  } catch (error) {
    console.error("DELETE /like/post/:PostId >> ", error);
    next(error);
  }
});

// 2022/01/18 - 댓글/답글에 좋아요 추가 - by 1-blue
router.post("/comment/:CommentId", isLoggedIn, async (req, res, next) => {
  const CommentId = +req.params.CommentId;
  const { _id: UserId } = req.user;

  try {
    const targetComment = await Comment.findOne({
      where: { _id: CommentId },
      include: [{ model: User, attributes: ["name"] }],
    });

    // 2022/01/18 - 존재 하지 않는 게시글에 좋아요 누른 경우 - by 1-blue
    if (!targetComment) {
      return res
        .status(404)
        .json({ message: "존재하지 않는 댓글에 좋아요를 누르셨습니다.\n새로 고침 후 다시 시도해 주세요" });
    }

    // 2022/01/18 - 좋아요를 누른 게시글에 다시 좋아요 추가 요청인 경우 - by 1-blue
    if (await targetComment.hasCommentLikers(UserId)) {
      return res.status(409).json({ message: "이미 좋아요를 누른 댓글입니다.\n새로 고침 후 다시 시도해 주세요." });
    }

    // 2022/01/18 - 정상적으로 좋아요 추가 - by 1-blue
    await targetComment.addCommentLikers(UserId);

    const [commentLikerWithData] = await targetComment.getCommentLikers({
      attributes: ["_id", "name"],
      include: [
        {
          model: Image,
          attributes: ["_id", "name", "url"],
        },
      ],
      through: {
        attributes: [],
      },
    });

    const message = `${targetComment.User.name}님의 ${
      targetComment.RecommentId ? "답글" : "댓글"
    }에 좋아요를 눌렀습니다.`;

    res.json({
      message,
      PostId: targetComment.PostId,
      CommentId: targetComment._id,
      RecommentId: targetComment.RecommentId,
      commentLikerWithData,
    });
  } catch (error) {
    console.error("POST /like/comment/:CommentId >> ", error);
    next(error);
  }
});

// 2021/12/28 - 댓글/답글에 좋아요 제거 - by 1-blue
router.delete("/comment/:CommentId", isLoggedIn, async (req, res, next) => {
  const CommentId = +req.params.CommentId;
  const { _id: UserId } = req.user;

  try {
    const targetComment = await Comment.findOne({
      where: { _id: CommentId },
      include: [{ model: User, attributes: ["name"] }],
    });

    // 2021/12/28 - 존재 하지 않는 게시글에 좋아요 누른 경우 - by 1-blue
    if (!targetComment) {
      return res
        .status(404)
        .json({ message: "존재하지 않는 댓글에 좋아요를 누르셨습니다.\n새로 고침 후 다시 시도해 주세요" });
    }

    // 2021/12/28 - 좋아요를 제거한 게시글에 다시 좋아요 제거 요청인 경우 - by 1-blue
    if (!(await targetComment.hasCommentLikers(UserId))) {
      return res.status(409).json({ message: "좋아요를 누르지 않은 댓글입니다.\n새로 고침 후 다시 시도해 주세요." });
    }

    // 2021/12/28 - 정상적으로 좋아요 제거 - by 1-blue
    await targetComment.removeCommentLikers(UserId);

    const message = `${targetComment.User.name}님의 ${
      targetComment.RecommentId ? "답글" : "댓글"
    }에 좋아요를 취소하셨습니다.`;

    res.json({
      message,
      PostId: targetComment.PostId,
      CommentId: targetComment._id,
      RecommentId: targetComment.RecommentId,
      UserId,
    });
  } catch (error) {
    console.error("DELETE /like/comment/:CommentId >> ", error);
    next(error);
  }
});

export default router;
