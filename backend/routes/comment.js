import express from "express";
import { Op } from "sequelize";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { Post, Comment, User, Image } = db;

// 2021/12/27 - 게시글에 댓글/답글 추가 - by 1-blue
router.post("/post", isLoggedIn, async (req, res, next) => {
  const { content, PostId, RecommentId } = req.body;
  const { _id: UserId } = req.user;

  try {
    const targetPost = await Post.findByPk(PostId);

    if (!targetPost) {
      return res.status(404).json({ message: "존재하지 않는 게시글입니다.\n잠시후에 다시 시도해주세요" });
    }

    const createdComment = await targetPost.createComment({ content, RecommentId, UserId });

    const createdCommentWithData = await Comment.findOne({
      where: { _id: createdComment._id },
      attributes: ["_id", "content", "createdAt", "UserId", "RecommentId", "PostId"],
      include: [
        {
          model: User,
          attributes: ["_id", "name"],
          include: {
            model: Image,
            attributes: ["_id", "name", "url"],
          },
        },
        // 방금 생성한 댓글에 답글이 있을 수가 없으므로 그냥 include만 해줌... 빈 배열을 넘기기 위해서
        {
          model: Comment,
          as: "Recomments",
        },
        // 방금 생성한 댓글에 좋아요가 있을 수가 없으므로 그냥 include만 해줌... 빈 배열을 넘기기 위해서
        {
          model: User,
          as: "CommentLikers",
        },
      ],
    });

    res.json({ message: `${RecommentId ? "답글" : "댓글"}이 생성되었습니다.`, createdCommentWithData });
  } catch (error) {
    console.error("POST /comment/post >> ", error);
    next(error);
  }
});

// 2021/12/27 - 게시글의 댓글/답글 제거 - by 1-blue
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
      message: `${targetComment.RecommentId ? "답글" : "댓글"}이 삭제되었습니다.`,
      result: { removedCommentId: CommentId, removedPostId, RecommentId: targetComment.RecommentId },
    });
  } catch (error) {
    console.error("DELETE /comment/post/:CommentId >> ", error);
    next(error);
  }
});

// 2022/01/16 - 특정 게시글의 댓글들 불러오기 - by 1-blue
router.get("/post/:PostId", async (req, res, next) => {
  const PostId = +req.params.PostId;
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 10;

  console.log("lastId >> ", req.query.lastId);

  // 댓글은 오래된 순서로 정렬하기 때문
  const where = {
    _id: lastId === -1 ? { [Op.lt]: 999999 } : { [Op.gt]: lastId },
    RecommentId: {
      [Op.eq]: null,
    },
  };

  try {
    const targetPost = await Post.findByPk(PostId);

    if (!targetPost) {
      return res.status(404).json({ message: "존재하지 않은 게시글입니다.\n잠시후에 다시 시도해주세요" });
    }

    // 댓글 관련 정보 불러오기
    const comments = await targetPost.getComments({
      attributes: ["_id", "content", "createdAt", "UserId", "RecommentId"],
      // 답글은 제외
      where,
      limit,
      order: [["createdAt", "ASC"]],
      include: [
        // 댓글 작성자
        {
          model: User,
          attributes: ["_id", "name"],
          include: [
            {
              model: Image,
              attributes: ["_id", "name"],
            },
          ],
        },
        // 댓글의 좋아요
        {
          model: User,
          as: "CommentLikers",
          attributes: ["_id", "name"],
        },
        // 답글 개수
        {
          model: Comment,
          as: "Recomments",
          attributes: ["_id"],
        },
      ],
    });

    res.status(200).json({ message: "댓글들을 정상적으로 불러왔습니다.", Comments: comments, PostId, limit });
  } catch (error) {
    console.error("GET /comment/post/:PostId >> ", error);
    next(error);
  }
});

// 2022/01/16 - 특정 댓글의 답글들 불러오기 - by 1-blue
router.get("/comment/:CommentId", isLoggedIn, async (req, res, next) => {
  const CommentId = +req.params.CommentId;
  const lastId = +req.query.lastId || 999999;
  const limit = +req.query.limit || 10;

  // 답글은 오래된 순서로 정렬하기 때문
  const where = {
    _id: lastId === 999999 ? { [Op.lt]: lastId } : { [Op.gt]: lastId },
  };

  try {
    const targetComment = await Comment.findByPk(CommentId);

    if (!targetComment) {
      return res.status(404).json({ message: "존재하지 않은 답글입니다.\n잠시후에 다시 시도해주세요" });
    }

    // 답글의 유저와 유저 프로필 이미지 불러오기
    const recomments = await targetComment.getRecomments({
      attributes: ["_id", "content", "createdAt", "UserId", "RecommentId"],
      where,
      limit,
      order: [["createdAt", "ASC"]],
      include: [
        // 답글 작성자
        {
          model: User,
          attributes: ["_id", "name"],
          include: [
            // 답글 작성자의 프로필 이미지
            {
              model: Image,
              attributes: ["_id", "name"],
            },
          ],
        },
        // 답글의 좋아요
        {
          model: User,
          as: "CommentLikers",
          attributes: ["_id", "name"],
          through: {
            attributes: ["createdAt"],
          },
        },
      ],
    });

    res.status(200).json({ message: "답글들을 정상적으로 불러왔습니다.", Recomments: recomments });
  } catch (error) {
    console.error("GET /comment/recomment/:CommentId >> ", error);
    next(error);
  }
});

export default router;
