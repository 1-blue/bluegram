import express from "express";
import bcrypt from "bcrypt";

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Photo, Post } = db;

const router = express.Router();

// 로그인한 유저 정보 가져오기
router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    const fullUser = await User.findOne({
      attributes: ["_id", "name", "provider"],
      where: { _id: req.user._id },
      include: [
        { model: Photo, attributes: ["_id", "name", "url"] },
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

    return res
      .status(200)
      .json({ ok: true, message: "로그인한 유저의 정보를 가져오는데 성공했습니다.", user: fullUser });
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
      include: [{ model: Photo, attributes: ["_id", "name"] }],
    });

    return res.status(200).json({ ok: true, message: "로그인한 유저의 상세정보를 가져오는데 성공했습니다.", me });
  } catch (error) {
    console.error("GET /user/me/detail error >> ", error);
    return next(error);
  }
});

// 2022/05/26 - 특정 유저 정보 가져오기 - by 1-blue
router.get("/:UserId", async (req, res, next) => {
  const UserId = +req.params.UserId;

  try {
    const targetUser = await User.findOne({
      where: { _id: UserId },
      attributes: ["_id", "name", "introduction"],
      include: [
        {
          model: Photo,
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

    if (!targetUser) return res.status(404).json({ ok: false, message: "유저가 존재하지 않습니다." });

    return res
      .status(200)
      .json({ ok: true, message: `${targetUser.name}님의 정보를 가져오는데 성공했습니다.`, user: targetUser });
  } catch (error) {
    console.error("GET /user/:UserId error >> ", error);
    return next(error);
  }
});

// 2022/01/24 - 로그인한 유저의 기본 정보 변경 - by 1-blue
router.put("/", isLoggedIn, async (req, res, next) => {
  const { name, email, phone, birthday, introduction, profileImage } = req.body;

  try {
    await User.update(
      {
        name,
        email,
        phone,
        birthday,
        introduction,
      },
      {
        where: {
          _id: req.user._id,
        },
      },
    );

    if (profileImage) {
      await Photo.update(
        {
          name: profileImage,
        },
        { where: { UserId: req.user._id } },
      );
    }

    res.status(200).json({
      message: `${name}님의 정보를 성공적으로 변경했습니다.`,
      name,
      email,
      phone,
      birthday,
      introduction,
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
      .clearCookie("blegram")
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
      return res.status(202).json({ ok: false, message: "기존 비밀번호와 불일치합니다." });
    }

    await User.destroy({ where: { _id: req.user._id } });

    req.logout();
    req.session.destroy();
    res
      .status(200)
      .clearCookie("blegram")
      .json({ ok: false, message: "회원탈퇴에 성공하셨습니다.\n강제로 로그아웃되며 회원가입페이지로 이동합니다." });
  } catch (error) {
    console.error("DELETE /user/:password error >> ", error);
    return next(error);
  }
});

export default router;
