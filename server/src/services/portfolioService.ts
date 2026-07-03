import { prisma } from "../config/prisma";
import { redis } from "../config/redis";
import { AppError } from "../middleware/errorHandler";

const CACHE_TTL = 60 * 5; // 5 minutes

export const portfolioService = {
  async getAll(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [portfolios, total] = await Promise.all([
      prisma.portfolio.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          slug: true,
          isPublic: true,
          views: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.portfolio.count({ where: { userId } }),
    ]);

    return {
      portfolios,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  },

  async getBySlug(slug: string) {
    // Check cache first
    const cacheKey = `portfolio:${slug}`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log(`📦 Cache hit: ${cacheKey}`);
      // Still increment views but don't wait for it
      prisma.portfolio
        .update({
          where: { slug },
          data: { views: { increment: 1 } },
        })
        .catch(() => {});
      return JSON.parse(cached);
    }

    const portfolio = await prisma.portfolio.findUnique({ where: { slug } });
    if (!portfolio) throw new AppError("Portfolio not found", 404);

    // Cache it
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(portfolio));
    console.log(`📦 Cache set: ${cacheKey}`);

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

    // Invalidate cache on update
    await redis.del(`portfolio:${portfolio.slug}`);

    return prisma.portfolio.update({ where: { id }, data: { data } });
  },

  async delete(id: string, userId: string) {
    const portfolio = await prisma.portfolio.findUnique({ where: { id } });
    if (!portfolio) throw new AppError("Portfolio not found", 404);
    if (portfolio.userId !== userId) throw new AppError("Unauthorized", 403);

    await redis.del(`portfolio:${portfolio.slug}`);
    await prisma.portfolio.delete({ where: { id } });
  },
};
