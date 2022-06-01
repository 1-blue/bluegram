import express from "express";
import { Op } from "sequelize";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Room, Photo, Chat, RoomUsers } = db;

// 2022/05/29 - 로그인한 유저의 채팅방들 가져오기 - by 1-blue
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const me = await User.findByPk(req.user._id);

    const rooms = await me.getUserRoom({
      include: [
        {
          model: User,
          as: "RoomUser",
          // 상대방의 유저 정보만 가져오기
          where: {
            [Op.not]: {
              _id: +req.user._id,
            },
          },
          attributes: ["_id", "name"],
          include: [
            // 게시글 작성자의 프로필 이미지
            {
              model: Photo,
              attributes: ["_id", "name", "url"],
            },
          ],
        },
        {
          model: Chat,
          limit: 1,
          order: [["createdAt", "DESC"]],
          attributes: ["contents", "createdAt"],
        },
      ],
    });

    res.status(200).json({
      ok: true,
      message: `채팅방들을 가져왔습니다.`,
      rooms,
    });
  } catch (error) {
    console.error("POST api/room >> ", error);
    next(error);
  }
});

// 2022/05/28 - 로그인한 유저와 특정 유저의 채팅방 생성 - by 1-blue
router.post("/", isLoggedIn, async (req, res, next) => {
  const { roomName, UserId } = req.body;

  try {
    const me = await User.findByPk(req.user._id);
    let RoomId = null;

    // 이미 채팅방이 만들어졌는지 확인
    const exRoom = await me.getUserRoom({
      attributes: ["_id"],
      include: [
        {
          model: User,
          as: "RoomUser",
          where: {
            _id: {
              [Op.eq]: +UserId,
            },
          },
          attributes: ["_id", "name"],
        },
      ],
    });

    if (exRoom.length >= 1) {
      RoomId = exRoom[0]._id;

      await RoomUsers.update(
        {
          selfGranted: 0,
        },
        {
          where: {
            RoomId,
          },
        },
      );
    } else {
      const createdRoom = await Room.create({ name: roomName });

      const addRoomPromise = createdRoom.addRoomUser(+UserId);
      const addRoomUserPromise = createdRoom.addRoomUser(+req.user._id);

      await Promise.allSettled([addRoomPromise, addRoomUserPromise]);

      RoomId = createdRoom._id;
    }

    res.status(201).json({
      ok: true,
      message: `"${roomName}" 채팅방을 생성했습니다.`,
      RoomId,
    });
  } catch (error) {
    console.error("POST api/room >> ", error);
    next(error);
  }
});

// 2022/06/01 - 로그인한 유저 채팅방 나가기 - by 1-blue
router.delete("/", isLoggedIn, async (req, res, next) => {
  const { RoomId } = req.query;

  try {
    const exRoomUsers = await RoomUsers.findOne({ where: { RoomId } });

    // 특정 유저만 채팅방 나가기
    if (!exRoomUsers.selfGranted) {
      await RoomUsers.update(
        {
          selfGranted: req.user._id,
        },
        {
          where: {
            RoomId,
          },
        },
      );
    }
    // 둘 다 채팅방 나가서 채팅방 제거
    else {
      await Room.destroy({
        where: {
          _id: RoomId,
        },
      });
    }

    res.status(201).json({
      ok: true,
      message: `채팅방을 나갔습니다.`,
    });
  } catch (error) {
    console.error("DELETE api/room >> ", error);
    next(error);
  }
});

export default router;
