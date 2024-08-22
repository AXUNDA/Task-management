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
      const token = await jwtService.sign({
        id: data.id,
      });
      return { access_token: token };
    } catch (error: any) {
      console.log(error.code);
      if ((error.code = "P2002"))
        return Promise.reject(new CustomError("email already taken", 409));
      return Promise.reject(error);
    }
  },
  async login(dto: Prisma.UserWhereUniqueInput) {
    try {
      const user = await userRepository.getUser({
        email: dto.email,
      });
      console.log(user);
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
    try {
      await userRepository.updateUser({ isAdmin: true }, dto);
    } catch (error: any) {
      console.log(error);
      if ((error.code = "P2025"))
        return Promise.reject(new CustomError("user not found", 404));
      return Promise.reject(error);
    }
  },
};
