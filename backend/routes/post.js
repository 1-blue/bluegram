// 2021/12/22 - 게시글 관련 엔드포인트 - by 1-blue

import express from "express";

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Image, Post } = db;

const router = express.Router();

// 로그인한 유저 정보 가져오기
router.post("/", isLoggedIn, async (req, res, next) => {
  const { content, images } = req.body;

  try {
    const createdPost = await Post.create({ content, UserId: req.user._id});

    const imagePromiseList = images.map(image => Image.create({
      name: image,
      UserId: req.user._id,
      PostId: createdPost._id,
    }));

    await Promise.all(imagePromiseList);
    
    return res.status(201).json({ message: "게시글 생성이 완료되었습니다." });
  } catch (error) {
    console.error("POST /post error >> ", error);
    return next(error);
  }
});

export default router;