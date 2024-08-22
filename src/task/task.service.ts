import { Prisma, User } from "@prisma/client";
import taskRepository from "../repositories/task.repository";
import { createTask } from "../common/interfaces";
import userRepository from "../repositories/user.repository";
import CustomError from "../common/customError";

export default {
  async createTask(dto: createTask, user: string) {
    try {
      if (dto.email != null && dto.email != undefined) {
        const user = await userRepository.getUser({ email: dto.email });
        if (!user) {
          return Promise.reject(new CustomError("User not found", 404));
        }
        // send email to user to notfiy
        dto.userId = user.id;
        delete dto.email;
        const task = await taskRepository.createTask({
          title: dto.title,
          description: dto.description,
          tag: dto.tag,
          userId: dto.userId,
        });

        return task;
        // dto.userId = user.id;
      }
      return await taskRepository.createTask({
        title: dto.title,
        description: dto.description,
        tag: dto.tag,
        userId: user,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateTask(
    dto: Prisma.TaskUpdateInput,
    where: Prisma.TaskWhereUniqueInput,
    user: User,
  ) {
    try {
      if (user.isAdmin) {
        return await taskRepository.updateTask(dto, where);
      }
      return await taskRepository.updateTask(dto, where);
    } catch (error: any) {
      console.log(error.code);
      if ((error.code = "P2025"))
        return Promise.reject(
          new CustomError("Task to update not found,please check", 404),
        );
      return Promise.reject(error);
    }
  },
  async getTasks(where: Prisma.TaskWhereInput, user: User) {
    try {
      if (user.isAdmin) {
        return await taskRepository.getTasks({});
      }
      return await taskRepository.getTasks(where);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getTask(where: Prisma.TaskWhereUniqueInput) {
    try {
      return await taskRepository.getTask(where);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteTask(where: Prisma.TaskWhereUniqueInput) {
    try {
      const deleted = await taskRepository.deleteTask(where);
      console.log(deleted);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async createComment(dto: Prisma.CommentUncheckedCreateInput) {
    try {
      return await taskRepository.createComment(dto);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateComment(
    where: Prisma.CommentWhereUniqueInput,
    dto: Prisma.CommentUpdateInput,
  ) {
    try {
      return await taskRepository.updateComment(where, dto);
    } catch (error: any) {
      if ((error.code = "P2025"))
        return Promise.reject(
          new CustomError("comment to update not found", 404),
        );
      return Promise.reject(error);
    }
  },
  async deleteComment(where: Prisma.CommentWhereUniqueInput, user: User) {
    try {
      if (user.isAdmin) {
        return await taskRepository.deleteComment({ id: where.id });
      }
      return await taskRepository.deleteComment(where);
    } catch (error: any) {
      console.log(error);
      if ((error.code = "P2025"))
        return Promise.reject(
          new CustomError("comment to delete not found", 404),
        );
      return Promise.reject(error);
    }
  },
};
