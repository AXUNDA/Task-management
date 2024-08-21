import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createTask(dto: Prisma.TaskCreateInput) {
    return await prisma.task.create({ data: dto });
  },
  async updateTask(
    dto: Prisma.TaskUpdateInput,
    where: Prisma.TaskWhereUniqueInput,
  ) {
    return await prisma.task.update({ where: where, data: dto });
  },

  async getTasks(where: Prisma.TaskWhereInput) {
    return await prisma.task.findMany({ where: where });
  },

  async getTask(where: Prisma.TaskWhereUniqueInput) {
    return await prisma.task.findUnique({ where: where });
  },
  async deleteTask(where: Prisma.TaskWhereUniqueInput) {
    return await prisma.task.delete({ where: where });
  },

  async createComment(dto: Prisma.CommentCreateInput) {
    return await prisma.comment.create({ data: dto });
  },
  async updateComment(
    where: Prisma.CommentWhereUniqueInput,
    dto: Prisma.CommentUpdateInput,
  ) {
    return await prisma.comment.update({ where: where, data: dto });
  },
  async deleteComment(where: Prisma.CommentWhereUniqueInput) {
    return await prisma.comment.delete({ where: where });
  },
};
