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

// db에 테이블 등록
db.User = User(sequelize, Sequelize);

// associate
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;