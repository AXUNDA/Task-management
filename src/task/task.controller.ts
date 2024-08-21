import { Request, Response, NextFunction } from "express";
import taskService from "./task.service";

export default {
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await taskService.createTask(req.body);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },
  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await taskService.updateTask(req.body, { id });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals.user;
      const data = await taskService.getTasks({ userId: id });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await taskService.getTask({ id });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await taskService.deleteTask({ id });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await taskService.createComment({
        ...req.body,
        taskId: id,
      });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await taskService.deleteComment({
        id,
      });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await taskService.updateComment({ id }, req.body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
};
