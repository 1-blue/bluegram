import express from "express";
import bcrypt from "bcrypt";

import { isNotLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Image } = db;

const router = express.Router();

// 회원가입
router.post("/", isNotLoggedIn, async (req, res, next) => {
  const { id, password, name, phone, birthday, imageName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 6);

    const createdUser = await User.create({
      id,
      password: hashedPassword,
      name,
      phone,
      birthday,
    });

    await Image.create({
      name: imageName,
      UserId: createdUser._id
    });

    return res.json({ message: `${name}님 회원가입이 완료되었습니다.\n로그인페이지로 이동합니다.` });
  } catch (error) {
    console.error("GET /user error >> ", error);
    return next(error);
  }
});

export default router;