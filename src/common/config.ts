import dotenv from "dotenv";
dotenv.config();

export default {
  JWT_KEY: process.env.JWT_KEY,

  PORT: process.env.PORT,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
};
