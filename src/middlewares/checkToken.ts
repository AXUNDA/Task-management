import { NextFunction, Request, Response } from "express";

import { jwtService } from "../auth/jwt.service";
import userRepository from "../repositories/user.repository";
import { Prisma } from "@prisma/client";

export default async function checkToken(
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

    if (!user) return res.sendStatus(403);
    res.locals.user = user;
    return next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}
