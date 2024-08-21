import CustomError from "../common/customError";
import userRepository from "../repositories/user.repository";
import { jwtService } from "./jwt.service";
import { Prisma } from "@prisma/client";
import * as argon2 from "argon2";

export default {
  async signup(dto: Prisma.UserCreateInput) {
    try {
      dto.password = await argon2.hash(dto.password);
      const data = await userRepository.createUser(dto);
      await jwtService.sign({
        id: data.id,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async login(dto: Prisma.UserWhereUniqueInput) {
    try {
      const user = await userRepository.getUser({
        email: dto.email,
      });
      if (
        !user &&
        (await argon2.verify(user!.password, dto.password as string))
      )
        throw new CustomError("invalid credentials", 401);
      const token = await jwtService.sign({
        id: user!.id,
      });
      return { access_token: token };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async setAsAdmin(dto: Prisma.UserWhereUniqueInput) {
    await userRepository.updateUser({ isAdmin: true }, dto);
    try {
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
