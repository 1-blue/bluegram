import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";
import configDB from "../config/config.js";

const db = {};
const env = process.env.NODE_ENV || "development";
const config = configDB[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 테이블 불러오기
import User from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";
import Hashtag from "./hashtag.js";
import Photo from "./photo.js";
import Room from "./room.js";
import Chat from "./chat.js";

// db에 테이블 등록
db.User = User(sequelize, Sequelize);
db.Post = Post(sequelize, Sequelize);
db.Comment = Comment(sequelize, Sequelize);
db.Hashtag = Hashtag(sequelize, Sequelize);
db.Photo = Photo(sequelize, Sequelize);
db.Room = Room(sequelize, Sequelize);
db.Chat = Chat(sequelize, Sequelize);

const RoomUsers = sequelize.define(
  "RoomUsers",
  {
    selfGranted: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      comment: "채팅방 나갔는지 판단 (null or 0: 둘 다 접근 가능, 유저id: 해당 유저만 접근 가능 )",
      defaultValue: 0,
    },
  },
  { timestamps: false },
);
db.RoomUsers = RoomUsers;

// associate
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
