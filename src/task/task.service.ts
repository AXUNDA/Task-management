import { Prisma } from "@prisma/client";
import taskRepository from "../repositories/task.repository";

export default {
  async createTask(dto: Prisma.TaskCreateInput) {
    try {
      const task = await taskRepository.createTask(dto);
      return task;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateTask(
    dto: Prisma.TaskUpdateInput,
    where: Prisma.TaskWhereUniqueInput,
  ) {
    try {
      return await taskRepository.updateTask(dto, where);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getTasks(where: Prisma.TaskWhereInput) {
    try {
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
      return await taskRepository.deleteTask(where);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async createComment(dto: Prisma.CommentCreateInput) {
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
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteComment(where: Prisma.CommentWhereUniqueInput) {
    try {
      return await taskRepository.deleteComment(where);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
