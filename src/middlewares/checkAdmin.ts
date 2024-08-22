import { NextFunction, Request, Response } from "express";

import { jwtService } from "../auth/jwt.service";
import userRepository from "../repositories/user.repository";
import { Prisma, User } from "@prisma/client";

export default async function checkAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    const payload: any = await jwtService.verify(token);
    const user = await userRepository.getUser({
      id: payload.id,
    } as Prisma.UserWhereUniqueInput);
    console.log(user);
    if (!user) return res.sendStatus(403);
    if (!user.isAdmin) return res.sendStatus(401);
    res.locals.user = user;
    return next();
  } catch (err) {
    next(err);
  }
}
