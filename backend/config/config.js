import dotenv from "dotenv";
dotenv.config();

const configDB = {
  development: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
    freezeTableName: true,
  },
  test: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
    freezeTableName: true,
  },
  production: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
    freezeTableName: true,
  },
};

export default configDB;
