import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { portfolioService } from "../services/portfolioService";
import { sendSuccess } from "../utils/apiResponse";
import { AuthRequest } from "../types";

const createSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  data: z.record(z.string(), z.unknown()),
});

const updateSchema = z.object({
  data: z.record(z.string(), z.unknown()),
});

export const portfolioController = {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const portfolios = await portfolioService.getAll(req.userId!);
      return sendSuccess(res, portfolios);
    } catch (err) {
      next(err);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const portfolio = await portfolioService.getBySlug(req.params.slug as string);
      return sendSuccess(res, portfolio);
    } catch (err) {
      next(err);
    }
  },

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { slug, data } = createSchema.parse(req.body);
      const portfolio = await portfolioService.create(req.userId!, slug, data);
      return sendSuccess(res, portfolio, "Portfolio created", 201);
    } catch (err) {
      next(err);
    }
  },

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { data } = updateSchema.parse(req.body);
      const portfolio = await portfolioService.update(req.params.id as string, req.userId!, data);
      return sendSuccess(res, portfolio, "Portfolio updated");
    } catch (err) {
      next(err);
    }
  },

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await portfolioService.delete(req.params.id as string, req.userId!);
      return sendSuccess(res, null, "Portfolio deleted");
    } catch (err) {
      next(err);
    }
  },
};
