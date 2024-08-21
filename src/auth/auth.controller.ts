import authService from "./auth.service";
import { Request, Response, NextFunction } from "express";

export default {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.signup(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.login(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },
  async setAsAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.setAsAdmin(req.body);
    } catch (error) {
      next(error);
    }
  },
};
