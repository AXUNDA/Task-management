import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createTask(dto: Prisma.TaskUncheckedCreateInput) {
    const task = await prisma.task.create({
      data: dto,
      include: {
        assignedTo: {
          select: {
            email: true,
          },
        },
      },
    });

    const { userId, ...taskWithoutUserId } = task;

    return taskWithoutUserId;
  },
  async updateTask(
    dto: Prisma.TaskUpdateInput,
    where: Prisma.TaskWhereUniqueInput,
  ) {
    return await prisma.task.update({ where: where, data: dto });
  },

  async getTasks(where: Prisma.TaskWhereInput) {
    const task = await prisma.task.findMany({
      where: where,
      include: {
        assignedTo: {
          select: {
            email: true,
          },
        },
        comments: {
          select: {
            comment: true,
            id: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });
    const taskWithoutUserIds = task.map((task) => {
      const { userId, ...taskWithoutUserId } = task;
      return taskWithoutUserId;
    });
    return taskWithoutUserIds;
  },

  async getTask(where: Prisma.TaskWhereUniqueInput) {
    const task = await prisma.task.findUnique({ where: where });
    if (!task) {
      return null;
    }
    const { userId, ...taskWithoutUserId } = task;
    return taskWithoutUserId;
  },
  async deleteTask(where: Prisma.TaskWhereUniqueInput) {
    return await prisma.task.delete({ where: where });
  },

  async createComment(dto: Prisma.CommentUncheckedCreateInput) {
    const comment = await prisma.comment.create({ data: dto });
    const { userId, ...commentWithoutUserId } = comment;
    return commentWithoutUserId;
  },
  async updateComment(
    where: Prisma.CommentWhereUniqueInput,
    dto: Prisma.CommentUpdateInput,
  ) {
    const comment = await prisma.comment.update({ where: where, data: dto });
    const { userId, ...commentWithoutUserId } = comment;
    return commentWithoutUserId;
  },
  async deleteComment(where: Prisma.CommentWhereUniqueInput) {
    const deleted = await prisma.comment.delete({ where: where });
    console.log(deleted);
  },
};
