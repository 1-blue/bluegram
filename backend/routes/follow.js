import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Photo } = db;

// 2022/07/03 - 특정 유저의 팔로워들 정보 요청 - by 1-blue
router.get("/followers/:UserId", async (req, res, next) => {
  const UserId = +req.params.UserId;

  try {
    const followers = await User.findOne({
      where: { _id: UserId },
      attributes: ["_id", "name"],
      include: [
        {
          model: User,
          as: "Followers",
          attributes: ["_id", "name"],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Photo,
              attributes: ["_id", "name", "url"],
            },
          ],
        },
      ],
    });

    if (!followers)
      res
        .status(404)
        .json({ status: { ok: false }, data: { message: "존재하지 않는 유저의 팔로워들을 요청하셨습니다." } });

    res.status(200).json({
      status: { ok: true },
      data: { message: `${followers.name}님의 팔로워들을 성공적으로 가져왔습니다.`, followers: followers.Followers },
    });
  } catch (error) {
    console.error("GET /follow/followers/:UserId >> ", error);
    next(error);
  }
});

// 2022/07/03 - 특정 유저의 팔로잉들 정보 요청 - by 1-blue
router.get("/followings/:UserId", async (req, res, next) => {
  const UserId = +req.params.UserId;

  try {
    const followings = await User.findOne({
      where: { _id: UserId },
      attributes: ["_id", "name"],
      include: [
        {
          model: Photo,
          attributes: ["_id", "name"],
        },
        {
          model: User,
          as: "Followings",
          attributes: ["_id", "name"],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Photo,
              attributes: ["_id", "name", "url"],
            },
          ],
        },
      ],
    });

    if (!followings)
      res.status(404).json({
        status: { ok: false },
        data: { message: "존재하지 않는 유저의 팔로잉들을 요청하셨습니다." },
      });

    res.status(200).json({
      status: { ok: true },
      data: {
        message: `${followings.name}님의 팔로잉들을 성공적으로 가져왔습니다.`,
        followings: followings.Followings,
      },
    });
  } catch (error) {
    console.error("GET /followings/:UserId >> ", error);
    next(error);
  }
});

// 2022/07/03 - 팔로우하기- by 1-blue
router.post("/:UserId", isLoggedIn, async (req, res, next) => {
  const UserId = +req.params.UserId;

  try {
    // 2022/01/19 - 본인을 팔로우 하는 요청인 경우 - by 1-blue
    if (req.user._id === UserId) {
      return res.status(409).json({
        status: { ok: false },
        data: { message: "본인이 본인을 팔로우할 수 없습니다.\n새로 고침 후 다시 시도해 주세요." },
      });
    }

    const me = await User.findByPk(req.user._id);

    // 2022/01/19 - 이미 팔로우한 상태에서 팔로우 요청인 경우 - by 1-blue
    if (await me.hasFollowings(UserId)) {
      return res.status(409).json({
        status: { ok: false },
        data: { message: "이미 팔로우한 유저입니다.\n새로 고침 후 다시 시도해 주세요." },
      });
    }

    const Following = await me.addFollowings(UserId);

    if (!Following)
      return res.status(404).json({
        status: { ok: false },
        data: { message: "존재하지 않는 유저를 팔로우하셨습니다.\n잠시후에 다시 시도해주세요" },
      });

    const followUser = await User.findByPk(UserId, { attributes: ["name"] });

    const { FollowingId: followingId, FollowerId: followerId } = Following[0];

    return res.json({
      status: { ok: true },
      data: { message: `${followUser.name}님을 팔로우했습니다.`, followingId, followerId },
    });
  } catch (error) {
    console.error("POST /follow/:UserId >> ", error);
    next(error);
  }
});

// 2022/07/03 - 언팔로우하기 - by 1-blue
router.delete("/:UserId", isLoggedIn, async (req, res, next) => {
  const UserId = +req.params.UserId;

  try {
    // 2022/01/19 - 본인을 언팔로우 하는 요청인 경우 - by 1-blue
    if (req.user._id === UserId) {
      return res.status(409).json({
        status: { ok: false },
        data: { message: "본인이 본인을 언팔로우할 수 없습니다.\n새로 고침 후 다시 시도해 주세요." },
      });
    }

    const me = await User.findByPk(req.user._id);

    // 2022/01/04 - 이미 언팔로우한 상태에서 팔로우 요청인 경우 - by 1-blue
    if (!(await me.hasFollowings(UserId))) {
      return res.status(409).json({
        status: { ok: false },
        data: { message: "이미 팔로우한 유저입니다.\n새로 고침 후 다시 시도해 주세요." },
      });
    }

    const result = await me.removeFollowings(UserId);

    if (result === 0)
      return res.status(404).json({
        status: { ok: false },
        data: { message: "존재하지 않는 유저를 언팔로우하셨습니다.\n잠시후에 다시 시도해주세요" },
      });

    const unfollowUser = await User.findByPk(UserId, { attributes: ["name"] });

    return res.json({
      status: { ok: true },
      data: {
        message: `${unfollowUser.name}님을 언팔로우했습니다.`,
        unfollowingId: UserId,
        unfollowerId: req.user._id,
      },
    });
  } catch (error) {
    console.error("DELETE /follow/:UserId >> ", error);
    next(error);
  }
});

export default router;
