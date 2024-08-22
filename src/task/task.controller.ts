import { Request, Response, NextFunction, query } from "express";
import taskService from "./task.service";

export default {
  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user;
      const data = await taskService.createTask(req.body, user);
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },
  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = res.locals.user;
      const data = await taskService.updateTask(
        req.body,
        {
          id,
          userId: user.id,
        },
        user,
      );
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.query);
      if (req.query.dueDate)
        req.query.dueDate = new Date(req.query.dueDate as any).toISOString();

      const { page, ...queryWithoutPage } = req.query;

      const data = await taskService.getTasks(
        {
          ...queryWithoutPage,
        },

        Number(req.query.page) || 1,
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
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
      const user = res.locals.user;
      const data = await taskService.createComment({
        ...req.body,
        taskId: id,
        userId: user.id,
      });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = res.locals.user;

      await taskService.deleteComment(
        {
          id,
          userId: user.id,
        },
        user,
      );
      return res
        .status(200)
        .json({ message: "resource deleted", success: true });
    } catch (error) {
      next(error);
    }
  },
  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = res.locals.user;
      const data = await taskService.updateComment(
        { id, userId: user.id },
        req.body,
      );
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
};
