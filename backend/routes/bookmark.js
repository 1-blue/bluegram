import express from "express";
import { Op } from "sequelize";

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { Image, Post, Comment, User } = db;

const router = express.Router();

// 2022/01/23 - 로그인한 유저의 북마크 추가하기 - by 1-blue
router.post("/:PostId", isLoggedIn, async (req, res, next) => {
  const PostId = +req.params.PostId;

  try {
    const targetPost = await Post.findByPk(PostId, { include: [{ model: User, attributes: ["name"] }] });

    if (!targetPost)
      return res
        .status(404)
        .json({ message: "존재하지 않는 게시글에 북마크를 요청하셨습니다.\n새로 고침 후 다시 시도해주세요!" });

    if (await targetPost.hasPostBookmarks(req.user._id))
      return res.status(409).json({ message: "이미 북마크를 누른 게시글입니다.\n새로 고침 후 다시 시도해 주세요." });

    await targetPost.addPostBookmarks(req.user._id);

    res.json({
      message: `${targetPost.User.name}님의 게시글을 북마크에 추가했습니다.`,
      PostId: targetPost._id,
      UserId: req.user._id,
    });
  } catch (error) {
    console.error("POST /bookmark error >> ", error);
    return next(error);
  }
});

// 2022/01/23 - 로그인한 유저의 북마크 제거하기 - by 1-blue
router.delete("/:PostId", isLoggedIn, async (req, res, next) => {
  const PostId = +req.params.PostId;

  try {
    const targetPost = await Post.findByPk(PostId, { include: [{ model: User, attributes: ["name"] }] });

    if (!targetPost)
      return res
        .status(404)
        .json({ message: "존재하지 않는 게시글에 북마크를 요청하셨습니다.\n새로 고침 후 다시 시도해주세요!" });

    if (!(await targetPost.hasPostBookmarks(req.user._id)))
      return res.status(409).json({ message: "북마크를 누르지 않은 게시글입니다.\n새로 고침 후 다시 시도해 주세요." });

    await targetPost.removePostBookmarks(req.user._id);

    res.json({
      message: `${targetPost.User.name}님의 게시글의 북마크를 제거했습니다.`,
      PostId: targetPost._id,
      UserId: req.user._id,
    });
  } catch (error) {
    console.error("DELETE /bookmark error >> ", error);
    return next(error);
  }
});

// 2022/01/23 - 북마크한 게시글 가져오기 - by 1-blue
router.get("/", isLoggedIn, async (req, res, next) => {
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const me = await User.findByPk(req.user._id);

    const bookmarkPosts = await me.getUserBookmarks({
      where,
      limit,
      attributes: ["_id", "createdAt", "content", "UserId"],
      include: [
        // 게시글 작성자
        {
          model: User,
          attributes: ["_id", "name"],
          include: [
            // 게시글 작성자의 프로필 이미지
            {
              model: Image,
              attributes: ["_id", "name", "url"],
            },
          ],
        },
        // 게시글의 이미지들
        {
          model: Image,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글들
        {
          model: Comment,
          attributes: ["_id"],
          separate: true,
          where: {
            RecommentId: { [Op.eq]: null },
          },
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "PostLikers",
          attributes: ["_id"],
          through: {
            attributes: ["createdAt"],
          },
        },
        // 게시글을 북마크하는 유저들
        {
          model: User,
          as: "PostBookmarks",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const message =
      lastId === -1
        ? `${me.name}님이 북마크한 게시글을 ${bookmarkPosts.length}개 가져왔습니다.`
        : `${me.name}님이 북마크한 게시글을 추가로 ${bookmarkPosts.length}개 가져왔습니다.`;

    res.json({ message, posts: bookmarkPosts, limit });
  } catch (error) {
    console.error("DELETE /bookmark error >> ", error);
    return next(error);
  }
});

export default router;
