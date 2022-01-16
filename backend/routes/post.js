import fs from "fs";
import path from "path";
import express from "express";

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { Image, Post, Comment, User, Hashtag, sequelize } = db;

const router = express.Router();
const __dirname = path.resolve();

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

    // 2022/01/01 - 해시태그 생성 - by 1-blue
    const hashtags = content.match(/#[a-z0-9_가-힣]+/gm);
    if (hashtags) {
      const hashtagPromiseList = hashtags.map(hashtag => {
        const content = hashtag.substr(1, hashtag.length);
        return Hashtag.findOrCreate({ where: { content } });
      });
      const results = await Promise.all(hashtagPromiseList);

      // 2022/01/01 - 해시태그 게시글과 연결 - by 1-blue
      const hashtagPostPromiseList = results.map(hashtag => {
        return hashtag[0].addPostHashtaged(createdPost._id);
      });
      await Promise.all(hashtagPostPromiseList);
    }

    // 2021/12/22 - 생성된 게시글에 데이터를 합쳐서 전달 - by 1-blue
    const createdPostWithData = await Post.findOne({
      where: {
        _id: createdPost._id,
      },
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
        // 게시글의 댓글들
        {
          model: Comment,
          attributes: ["_id", "content", "UserId", "RecommentId", "createdAt"],
          include: [
            // 게시글의 댓글 작성자
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
            // 게시글의 댓글들에 좋아요
            {
              model: User,
              as: "CommentLikers",
              through: {
                attributes: [],
              },
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

    // 2022/01/15 - 게시글 생성 완료 시 추가한 이미지 위치 이동
    images.forEach(image => {
      const oldPath = path.join(__dirname, "public", "images", "preview", image);
      const newPath = path.join(__dirname, "public", "images", image);
      fs.rename(oldPath, newPath, () => {});
    });

    return res.status(201).json({ message: "게시글 생성이 완료되었습니다.", createdPost: createdPostWithData });
  } catch (error) {
    console.error("POST /post error >> ", error);
    return next(error);
  }
});

// 2021/12/22 - 특정 게시글 불러오기 - by 1-blue
router.get("/:PostId", isLoggedIn, async (req, res, next) => {
  const PostId = +req.params.PostId;

  try {
    const post = await Post.findOne({
      where: {
        _id: PostId,
      },
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
        // 게시글의 댓글들
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
      order: [["createdAt", "DESC"]],
    });

    if (!post) return res.status(404).json({ message: "존재하지 않은 게시글입니다.\n잠시후에 다시 시도해주세요" });

    res.json({ message: "특정 게시글을 불러오는데 성공했습니다.", post });
  } catch (error) {
    console.error("GET /post error >> ", error);
    return next(error);
  }
});

// 2021/12/28 - 특정 게시글 삭제하기 - by 1-blue
router.delete("/:PostId", isLoggedIn, async (req, res, next) => {
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
