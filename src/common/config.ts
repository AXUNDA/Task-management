import dotenv from "dotenv";
dotenv.config();

export default {
  JWT_KEY: process.env.JWT_KEY,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
};
