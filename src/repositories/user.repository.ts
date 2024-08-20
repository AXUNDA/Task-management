import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createUser(dto: Prisma.UserCreateInput) {
    return await prisma.user.create({ data: dto });
  },

  async getUser(dto: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({ where: dto });
  },

  async updateUser(
    dto: Prisma.UserUpdateInput,
    where: Prisma.UserWhereUniqueInput,
  ) {
    return await prisma.user.update({ where: where, data: dto });
  },
};
