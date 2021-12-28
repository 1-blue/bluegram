import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { Post, Comment, User, Image } = db;

// 2021/12/27 - 게시글에 댓글 추가 - by 1-blue
router.post("/post", isLoggedIn, async (req, res, next) => {
  const { content, PostId, CommentId } = req.body;
  const { _id: UserId } = req.user;

  try {
    const targetPost = await Post.findByPk(PostId);

    if (!targetPost) {
      return res.status(404).json({ message: "존재하지 않는 게시글입니다.\n잠시후에 다시 시도해주세요" });
    }

    const createdComment = await targetPost.createComment({ content, CommentId, UserId });

    const createdCommentWithData = await Comment.findOne({
      where: { _id: createdComment._id },
      attributes: ["_id", "content", "createdAt", "UserId", "CommentId", "PostId"],
      include: {
        model: User,
        attributes: ["_id", "name"],
        include: {
          model: Image,
          attributes: ["_id", "name"],
        },
      },
    });

    res.json({ message: "댓글 생성이 생성되었습니다.", createdCommentWithData });
  } catch (error) {
    console.error("POST /comment >> ", error);
    next(error);
  }
});

// 2021/12/27 - 게시글의 댓글 제거 - by 1-blue
router.delete("/post/:CommentId", isLoggedIn, async (req, res, next) => {
  const CommentId = +req.params.CommentId;

  try {
    const targetComment = await Comment.findByPk(CommentId);

    if (!targetComment) {
      return res.status(404).json({ message: "존재하지 않은 댓글입니다.\n잠시후에 다시 시도해주세요" });
    }
    const removedPostId = targetComment.PostId;

    await Comment.destroy({ where: { _id: CommentId } });

    res.json({
      message: "댓글 삭제가 완료되었습니다.",
      result: { removedCommentId: CommentId, removedPostId },
    });
  } catch (error) {
    console.error("POST /comment >> ", error);
    next(error);
  }
});

export default router;
