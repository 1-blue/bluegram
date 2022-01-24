import path from "path";
import fs from "fs";
import express from "express";
import bcrypt from "bcrypt";

import { isNotLoggedIn, isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Image, Post } = db;

const router = express.Router();
const __dirname = path.resolve();

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
  const { id, password, name, email, phone, birthday, about, imageName } = req.body;

  try {
    const exUser = await User.findOne({ where: { id } });

    if (exUser) return res.status(409).json({ message: "이미 가입된 아이디입니다.\n다른 아이디로 다시 시도해주세요" });

    const hashedPassword = await bcrypt.hash(password, 6);

    const createdUser = await User.create({
      id,
      password: hashedPassword,
      name,
      email,
      phone,
      birthday,
      about,
    });

    await Image.create({
      name: imageName,
      UserId: createdUser._id,
    });

    // 2022/01/23 - 게시글 생성 완료 시 추가한 이미지 위치 이동 - by 1-blue
    const oldPath = path.join(__dirname, "public", "images", "preview", imageName);
    const newPath = path.join(__dirname, "public", "images", imageName);
    fs.rename(oldPath, newPath, () => {});

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
      attributes: ["_id", "name", "about"],
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

    return res
      .status(200)
      .json({ message: `${targetUser.name}님의 정보를 가져오는데 성공했습니다.`, user: targetUser });
  } catch (error) {
    console.error("GET /user/:UserId error >> ", error);
    return next(error);
  }
});

// 2022/01/24 - 로그인한 유저의 기본 정보 변경 - by 1-blue
router.put("/", isLoggedIn, async (req, res, next) => {
  const { name, email, phone, birthday, about, profileImage } = req.body;

  try {
    await User.update(
      {
        name,
        email,
        phone,
        birthday,
        about,
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

      // 2022/01/23 - 게시글 생성 완료 시 추가한 이미지 위치 이동 - by 1-blue
      const oldPath = path.join(__dirname, "public", "images", "preview", profileImage);
      const newPath = path.join(__dirname, "public", "images", profileImage);
      fs.rename(oldPath, newPath, () => {});
    }

    res.status(200).json({
      message: `${name}님의 정보를 성공적으로 변경했습니다.`,
      name,
      email,
      phone,
      birthday,
      about,
      profileImage,
    });
  } catch (error) {
    console.error("PUT /user error >> ", error);
    return next(error);
  }
});

// 2022/01/24 - 로그인한 유저의 비밀번호 변경 - by 1-blue
router.patch("/", isLoggedIn, async (req, res, next) => {
  const { currentPassword, password } = req.body;

  try {
    if (!(await bcrypt.compare(currentPassword, req.user.password))) {
      return res.status(202).json({ message: "기존 비밀번호와 불일치합니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

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

// 2022/01/24 - 로그인한 유저 회원탈퇴 - by 1-blue
// 어차피 회원 탈퇴니까 password를 params형태로 넘겨도 상관없다고 판단함
router.delete("/:password", isLoggedIn, async (req, res, next) => {
  const { password } = req.params;

  try {
    if (!(await bcrypt.compare(password, req.user.password))) {
      return res.status(202).json({ message: "기존 비밀번호와 불일치합니다." });
    }

    await User.destroy({ where: { _id: req.user._id } });

    req.logout();
    req.session.destroy();
    res
      .status(200)
      .clearCookie("auth-bluegram")
      .json({ message: "회원탈퇴에 성공하셨습니다.\n강제로 로그아웃되며 회원가입페이지로 이동합니다." });
  } catch (error) {
    console.error("DELETE /user/:password error >> ", error);
    return next(error);
  }
});

export default router;
