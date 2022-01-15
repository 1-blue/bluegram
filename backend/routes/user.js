import express from "express";
import bcrypt from "bcrypt";

import { isNotLoggedIn, isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Image, Post } = db;

const router = express.Router();

// 로그인한 유저 정보 가져오기
router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    const fullUser = await User.findOne({
      attributes: ["_id", "name", "provider"],
      where: { _id: req.user._id },
      include: [
        { model: Image, attributes: ["_id", "name", "url"] },
        { model: Post, attributes: ["_id"] },
        {
          model: User,
          as: "Followers",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: "Followings",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.status(200).json({ message: "로그인한 유저의 정보를 가져오는데 성공했습니다.", user: fullUser });
  } catch (error) {
    console.error("GET /user/me error >> ", error);
    return next(error);
  }
});

// 로그인한 유저의 상세정보 가져오기
router.get("/me/detail", isLoggedIn, async (req, res, next) => {
  try {
    const me = await User.findByPk(req.user._id, {
      attributes: {
        exclude: ["password", "updatedAt"],
      },
      include: [{ model: Image, attributes: ["_id", "name"] }],
    });

    return res.status(200).json({ message: "로그인한 유저의 상세정보를 가져오는데 성공했습니다.", me });
  } catch (error) {
    console.error("GET /user/me/detail error >> ", error);
    return next(error);
  }
});

// 회원가입
router.post("/", isNotLoggedIn, async (req, res, next) => {
  const { id, password, name, phone, birthday, imageName } = req.body;

  try {
    const exUser = await User.findOne({ where: { id } });

    if (exUser) return res.status(409).json({ message: "이미 가입된 아이디입니다.\n다른 아이디로 다시 시도해주세요" });

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
      UserId: createdUser._id,
    });

    return res.status(200).json({ message: `${name}님 회원가입이 완료되었습니다.\n로그인페이지로 이동합니다.` });
  } catch (error) {
    console.error("POST /user error >> ", error);
    return next(error);
  }
});

// 2021/12/31 - 특정 유저 정보 가져오기 - by 1-blue
router.get("/:UserId", isLoggedIn, async (req, res, next) => {
  const UserId = +req.params.UserId;

  try {
    const targetUser = await User.findOne({
      where: { _id: UserId },
      attributes: ["_id", "name"],
      include: [
        {
          model: Image,
          attributes: ["_id", "name"],
        },
        {
          model: Post,
          attributes: ["_id"],
        },
        {
          model: User,
          as: "Followers",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: "Followings",
          attributes: ["_id"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!targetUser) return res.status(404).json({ message: "유저가 존재하지 않습니다." });

    return res.status(200).json({ message: "특정 유저의 정보를 가져오는데 성공했습니다.", user: targetUser });
  } catch (error) {
    console.error("GET /user/:UserId error >> ", error);
    return next(error);
  }
});

// 2022/01/03 - 로그인한 유저의 기본 정보 변경 - by 1-blue
router.put("/", isLoggedIn, async (req, res, next) => {
  const { name, phone, birthday, profileImage } = req.body;

  try {
    await User.update(
      {
        name,
        phone,
        birthday,
      },
      {
        where: {
          _id: req.user._id,
        },
      },
    );

    if (profileImage) {
      await Image.update(
        {
          name: profileImage,
        },
        { where: { UserId: req.user._id } },
      );
    }

    res.status(200).json({
      message: "유저의 정보변경에 성공했습니다.",
      result: { name, phone, birthday, profileImage },
    });
  } catch (error) {
    console.error("PUT /user error >> ", error);
    return next(error);
  }
});

// 2022/01/03 - 로그인한 유저의 비밀번호 변경 - by 1-blue
router.patch("/", isLoggedIn, async (req, res, next) => {
  const { prevPassword, currPassword } = req.body;

  try {
    if (!(await bcrypt.compare(prevPassword, req.user.password))) {
      return res.status(202).json({ message: "비밀번호가 불일치합니다." });
    }

    const hashedPassword = await bcrypt.hash(currPassword, 6);

    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: { _id: req.user._id },
      },
    );

    req.logout();
    req.session.destroy();
    res
      .status(200)
      .clearCookie("auth-bluegram")
      .json({ message: "비밀번호 변경에 성공하셨습니다.\n강제로 로그아웃되며 로그인페이지로 이동합니다." });
  } catch (error) {
    console.error("PATCH /user error >> ", error);
    return next(error);
  }
});

// 2022/01/03 - 로그인한 유저 회원탈퇴 - by 1-blue
router.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    await User.destroy({ where: { _id: req.user._id } });

    req.logout();
    req.session.destroy();
    res
      .status(200)
      .clearCookie("auth-bluegram")
      .json({ message: "회원탈퇴에 성공하셨습니다.\n강제로 로그아웃되며 회원가입페이지로 이동합니다." });
  } catch (error) {
    console.error("DELETE /user error >> ", error);
    return next(error);
  }
});

export default router;
