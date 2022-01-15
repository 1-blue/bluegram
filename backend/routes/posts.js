import express from "express";
import { Op } from "sequelize";

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { Image, Post, Comment, User, Hashtag } = db;

const router = express.Router();

// 2021/12/22 - 게시글들 불러오기 - by 1-blue
router.get("/", async (req, res, next) => {
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const posts = await Post.findAll({
      where,
      limit,
      order: [["createdAt", "DESC"]],
      attributes: ["_id", "content", "createdAt"],
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
        // 게시글의 댓글들 ( 댓글과 답글 모두 포함 )
        {
          model: Comment,
          attributes: ["_id"],
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "PostLikers",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.json({ message: "최신 게시글들을 불러오는데 성공했습니다.", posts, limit });
  } catch (error) {
    console.error("GET /post error >> ", error);
    return next(error);
  }
});

// 2022/01/15 - 게시글들 상세 내용 불러오기 - by 1-blue
router.get("/detail", async (req, res, next) => {
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const posts = await Post.findAll({
      where,
      limit,
      attributes: ["_id", "createdAt", "UserId"],
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
          attributes: ["_id", "content", "UserId", "RecommentId", "createdAt"],
          include: [
            // 게시글의 댓글의 작성자
            {
              model: User,
              attributes: ["_id", "name"],
              include: [
                // 댓글 작성자의 프로필 이미지
                {
                  model: Image,
                  attributes: ["_id", "name", "url"],
                },
              ],
            },
            // 게시글의 댓글들에 좋아요를 누른 유저
            {
              model: User,
              as: "CommentLikers",
              attributes: ["_id", "name"],
              through: {
                attributes: ["createdAt", "UserId", "CommentId"],
              },
              include: [
                // 게시글의 댓글들에 좋아요를 누른 유저의 이미지
                {
                  model: Image,
                  attributes: ["_id", "name", "url"],
                },
              ],
            },
            // 댓글의 답글들 개수를 위함
            {
              model: Comment,
              as: "Recomments",
              attributes: ["_id"],
            },
          ],
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
      ],
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "ASC"],
      ],
    });

    res.json({ message: "최신 게시글들을 불러오는데 성공했습니다.", posts, limit });
  } catch (error) {
    console.error("GET /post error >> ", error);
    return next(error);
  }
});

// 2022/01/04 - 특정 유저의 게시글들 불러오기 - by 1-blue
router.get("/user/:UserId", isLoggedIn, async (req, res, next) => {
  const UserId = +req.params.UserId;
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const user = await User.findByPk(UserId);

    const posts = await user.getPosts({
      where,
      limit,
      order: [["createdAt", "DESC"]],
      attributes: ["_id", "content", "createdAt"],
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
        // 게시글의 댓글들 ( 댓글과 답글 모두 포함 )
        {
          model: Comment,
          attributes: ["_id"],
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
      ],
    });

    res.json({ message: "특정 유저의 게시글들을 불러오는데 성공했습니다.", posts, limit });
  } catch (error) {
    console.error("GET /post/user/:UserId error >> ", error);
    return next(error);
  }
});

// 2022/01/01 - 해시태그의 게시글들 불러오기 - by 1-blue
router.get("/hashtag/:hashtagText", async (req, res, next) => {
  const hashtagText = decodeURI(req.params.hashtagText);
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    // 특정 해시태그 찾기
    const hashtag = await Hashtag.findOne({
      where: { content: hashtagText },
    });

    if (!hashtag)
      return res.status(200).json({
        message: "해시태그가 존재하지 않습니다.",
        postsOfHashtag: [],
        metadata: {
          limit,
          postsOfHashtagCount: 0,
          hashtagText,
        },
      });

    const postsOfHashtag = await hashtag.getPostHashtaged({
      where,
      limit,
      attributes: ["_id", "createdAt", "UserId"],
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
          attributes: ["_id", "content", "UserId", "RecommentId", "createdAt"],
          include: [
            // 게시글의 댓글의 작성자
            {
              model: User,
              attributes: ["_id", "name"],
              include: [
                // 댓글 작성자의 프로필 이미지
                {
                  model: Image,
                  attributes: ["_id", "name", "url"],
                },
              ],
            },
            // 게시글의 댓글들에 좋아요를 누른 유저
            {
              model: User,
              as: "CommentLikers",
              attributes: ["_id", "name"],
              through: {
                attributes: ["createdAt", "UserId", "CommentId"],
              },
              include: [
                // 게시글의 댓글들에 좋아요를 누른 유저의 이미지
                {
                  model: Image,
                  attributes: ["_id", "name", "url"],
                },
              ],
            },
            // 댓글의 답글들 개수를 위함
            {
              model: Comment,
              as: "Recomments",
              attributes: ["_id"],
            },
          ],
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
      ],
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "ASC"],
      ],
    });

    const postsOfHashtagCount = await hashtag.countPostHashtaged();

    res.status(200).json({
      message: "해시태그의 게시글들을 불러오는데 성공했습니다.",
      postsOfHashtag,
      metadata: {
        limit,
        postsOfHashtagCount,
        hashtagText,
      },
    });
  } catch (error) {
    console.error("GET /post/hashtag/:hashtag error >> ", error);
    return next(error);
  }
});

export default router;
