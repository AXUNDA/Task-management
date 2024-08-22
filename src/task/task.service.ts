import { Prisma, User } from "@prisma/client";
import taskRepository from "../repositories/task.repository";
import { createTask } from "../common/interfaces";
import userRepository from "../repositories/user.repository";
import CustomError from "../common/customError";
import mail from "../common/mailer";

export default {
  async createTask(dto: createTask, user: User) {
    try {
      let recipientUser;
      let email;

      if (dto.email != null && dto.email != undefined) {
        recipientUser = await userRepository.getUser({ email: dto.email });
        if (!recipientUser) {
          return Promise.reject(new CustomError("User not found", 404));
        }
        dto.userId = recipientUser.id;
        email = dto.email;
      } else {
        dto.userId = user.id;
        email = user.email;
      }

      const task = await taskRepository.createTask({
        title: dto.title,
        description: dto.description,
        tag: dto.tag,
        userId: dto.userId,
        dueDate: new Date(dto.dueDate).toISOString(),
      });

      await mail(
        email,
        "New Task",
        `Hello, the ${dto.title} task has been assigned to you. It is due on ${dto.dueDate},check your dashboard for details`,
      );

      return task;
    } catch (error) {
      console.log(error);
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
        return await taskRepository.updateTask(dto, { id: where.id });
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
  async getTasks(where: Prisma.TaskWhereInput, page: number = 1) {
    try {
      return await taskRepository.getTasks(where, page);
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
      await taskRepository.deleteTask(where);
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
