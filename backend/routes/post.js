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
      attributes: ["_id", "content", "updatedAt"],
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
          attributes: ["_id", "content", "UserId", "CommentId"],
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
          ],
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "Likers",
          attributes: ["_id"],
        },
      ],
    });

    return res.status(201).json({ message: "게시글 생성이 완료되었습니다.", createdPost: createdPostWithData });
  } catch (error) {
    console.error("POST /post error >> ", error);
    return next(error);
  }
});

// 2021/12/22 - 게시글 불러오기 - by 1-blue
router.get("/", async (req, res, next) => {
  const lastId = +req.query.lastId || -1;

  const where = {
    _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
  };

  try {
    const posts = await Post.findAll({
      where,
      limit: 30,
      order: [["updatedAt", "DESC"]],
      attributes: ["_id", "content", "updatedAt"],
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
          attributes: ["_id", "content", "UserId", "CommentId"],
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
          ],
        },
        // 게시글의 좋아요
        {
          model: User,
          as: "Likers",
          attributes: ["_id"],
        },
      ],
    });

    res.json({ message: "게시글을 불러오는데 성공했습니다.", posts });
  } catch (error) {
    console.error("GET /post error >> ", error);
    return next(error);
  }
});

export default router;
