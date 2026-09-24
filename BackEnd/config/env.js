const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const ENV = {
  SERV_PORT: process.env.SERV_PORT,
  DB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = ENV;
