// 2021/12/22 - 게시글 관련 엔드포인트 - by 1-blue

import express from "express";
import { Op } from "sequelize";

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { Image, Post, Comment, User } = db;

const router = express.Router();

// 2021/12/22 - 게시글 생성하기 - by 1-blue
router.post("/", isLoggedIn, async (req, res, next) => {
  const { content, images } = req.body;

  try {
    const createdPost = await Post.create({ content, UserId: req.user._id });

    const imagePromiseList = images.map(image =>
      Image.create({
        name: image,
        PostId: createdPost._id,
      }),
    );

    await Promise.all(imagePromiseList);

    // 2021/12/22 - 생성된 게시글에 데이터를 합쳐서 전달 - by 1-blue
    const createdPostWithData = await Post.findOne({
      where: {
        _id: createdPost._id,
      },
      attributes: ["_id", "content", "createdAt"],
      include: [
        // 게시글을 작성한 유저
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
        // 게시글의 이미지들
        {
          model: Image,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글과 답글들
        {
          model: Comment,
          attributes: ["_id", "content", "UserId", "CommentId", "createdAt"],
          include: [
            // 게시글의 댓글과 답글들을 작성한 유저
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
            // 게시글의 댓글과 답글들에 좋아요
            {
              model: User,
              as: "CommentLikers",
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

    return res.status(201).json({ message: "게시글 생성이 완료되었습니다.", createdPost: createdPostWithData });
  } catch (error) {
    console.error("POST /post error >> ", error);
    return next(error);
  }
});

// 2021/12/22 - 전체 게시글 불러오기 - by 1-blue
router.get("/", async (req, res, next) => {
  const lastId = +req.query.lastId || -1;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const posts = await Post.findAll({
      where,
      limit: 30,
      order: [["createdAt", "DESC"]],
      attributes: ["_id", "content", "createdAt"],
      include: [
        // 게시글을 작성한 유저
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
        // 게시글의 이미지들
        {
          model: Image,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글과 답글들
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

    res.json({ message: "최신 게시글을 불러오는데 성공했습니다.", posts });
  } catch (error) {
    console.error("GET /post error >> ", error);
    return next(error);
  }
});

// 2021/12/22 - 특정 게시글 불러오기 - by 1-blue
router.get("/:PostId", async (req, res, next) => {
  const PostId = +req.params.PostId;

  try {
    const post = await Post.findOne({
      where: {
        _id: PostId,
      },
      attributes: ["_id", "content", "createdAt"],
      include: [
        // 게시글을 작성한 유저
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
        // 게시글의 이미지들
        {
          model: Image,
          attributes: ["_id", "name"],
        },
        // 게시글의 댓글과 답글들
        {
          model: Comment,
          attributes: ["_id", "content", "UserId", "CommentId", "createdAt"],
          include: [
            // 게시글의 댓글과 답글들을 작성한 유저
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
            // 게시글의 댓글과 답글들에 좋아요를 누른 유저
            {
              model: User,
              as: "CommentLikers",
              attributes: ["_id", "name"],
              through: {
                attributes: ["createdAt", "UserId", "CommentId"],
              },
              // 게시글의 댓글과 답글들에 좋아요를 누른 유저의 이미지
              include: [
                {
                  model: Image,
                  attributes: ["_id", "name"],
                },
              ],
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

    if (!post) return res.status(404).json({ message: "존재하지 않은 게시글입니다.\n잠시후에 다시 시도해주세요" });

    res.json({ message: "특정 게시글을 불러오는데 성공했습니다.", post });
  } catch (error) {
    console.error("GET /post error >> ", error);
    return next(error);
  }
});

// 2021/12/28 - 특정 게시글 제거하기 - by 1-blue
router.delete("/:PostId", async (req, res, next) => {
  const PostId = +req.params.PostId;

  try {
    const removedPostCount = await Post.destroy({ where: { _id: PostId } });

    if (removedPostCount === 0)
      return res.status(404).json({ message: "존재하지 않은 게시글입니다\n잠시후에 다시 시도해주세요" });

    res.status(200).json({ message: "게시글 삭제에 성공하셨습니다.", result: { removedPostId: PostId } });
  } catch (error) {
    console.error("DELETE /post/:PostId error >> ", error);
    return next(error);
  }
});

export default router;
