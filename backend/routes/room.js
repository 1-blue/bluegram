import express from "express";
import { Op } from "sequelize";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Room, Photo, Chat } = db;

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

export default router;
