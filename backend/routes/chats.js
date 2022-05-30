import express from "express";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Room, Photo } = db;

// 2022/05/28 - 특정 채팅방의 채팅들 가져오기 - by 1-blue
router.get("/:RoomId", isLoggedIn, async (req, res, next) => {
  const RoomId = +req.params.RoomId;

  try {
    // >>> Promise 최적화
    const targetRoom = await Room.findByPk(RoomId);
    const me = await User.findByPk(req.user._id);

    // >>> 채팅방 주인들 가져오기
    const rooms = await me.getUserRoom({
      attributes: ["name"],
      include: [
        {
          model: User,
          as: "RoomUser",
          attributes: ["_id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
      through: {
        attributes: [],
      },
    });

    // >>> 상대방의 정보와 마지막 채팅을 넣어서 가져오기
    const chats = await targetRoom.getChats({
      include: [
        {
          model: User,
          attributes: ["_id", "name"],
          include: {
            model: Photo,
            attributes: ["_id", "name", "url"],
          },
        },
      ],
    });

    res.status(200).json({
      ok: true,
      message: `"${targetRoom.name}" 채팅방의 채팅들을 가져왔습니다.`,
      chats,
      roomInformation: {
        name: rooms[0].name,
        users: rooms[0].RoomUser.map(user => user),
      },
    });
  } catch (error) {
    console.error("POST api/room >> ", error);
    next(error);
  }
});

export default router;
