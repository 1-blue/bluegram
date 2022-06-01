import express from "express";
import { Op } from "sequelize";
const router = express.Router();

import { isLoggedIn } from "../middleware/index.js";
import db from "../models/index.js";

const { User, Room, Photo } = db;

// 2022/05/28 - 특정 채팅방의 채팅들 가져오기 - by 1-blue
router.get("/:RoomId", isLoggedIn, async (req, res, next) => {
  const RoomId = +req.params.RoomId;
  const lastId = +req.query.lastId || -1;
  const limit = +req.query.limit || 15;

  try {
    const targetRoomPromise = await Room.findByPk(RoomId);
    const mePromise = await User.findByPk(req.user._id);

    const [{ value: targetRoom }, { value: me }] = await Promise.allSettled([targetRoomPromise, mePromise]);

    const where = {
      _id: lastId === -1 ? { [Op.gt]: lastId } : { [Op.lt]: lastId },
    };

    const roomsPromise = me.getUserRoom({
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
    const chatsPromise = targetRoom.getChats({
      where,
      limit,
      order: [["createdAt", "DESC"]],
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

    const [{ value: rooms }, { value: chats }] = await Promise.allSettled([roomsPromise, chatsPromise]);

    res.status(200).json({
      ok: true,
      message: `"${targetRoom.name}" 채팅방의 채팅들을 가져왔습니다.`,
      chats: chats.reverse(),
      roomInformation: {
        _id: RoomId,
        name: rooms[0].name,
        users: rooms[0].RoomUser.map(user => user),
      },
      limit,
    });
  } catch (error) {
    console.error("POST api/room >> ", error);
    next(error);
  }
});

export default router;
