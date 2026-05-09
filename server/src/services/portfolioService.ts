import { prisma } from "../config/prisma";
import { AppError } from "../middleware/errorHandler";

export const portfolioService = {
  async getAll(userId: string) {
    return prisma.portfolio.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        slug: true,
        isPublic: true,
        views: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async getBySlug(slug: string) {
    const portfolio = await prisma.portfolio.findUnique({ where: { slug } });
    if (!portfolio) throw new AppError("Portfolio not found", 404);

    // increment view count
    await prisma.portfolio.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    return portfolio;
  },

  async create(userId: string, slug: string, data: object) {
    const existing = await prisma.portfolio.findUnique({ where: { slug } });
    if (existing) throw new AppError("Slug already taken", 409);

    return prisma.portfolio.create({
      data: { userId, slug, data },
    });
  },

  async update(id: string, userId: string, data: object) {
    const portfolio = await prisma.portfolio.findUnique({ where: { id } });
    if (!portfolio) throw new AppError("Portfolio not found", 404);
    if (portfolio.userId !== userId) throw new AppError("Unauthorized", 403);

    return prisma.portfolio.update({
      where: { id },
      data: { data },
    });
  },

  async delete(id: string, userId: string) {
    const portfolio = await prisma.portfolio.findUnique({ where: { id } });
    if (!portfolio) throw new AppError("Portfolio not found", 404);
    if (portfolio.userId !== userId) throw new AppError("Unauthorized", 403);

    await prisma.portfolio.delete({ where: { id } });
  },
};
