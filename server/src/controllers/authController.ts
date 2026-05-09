import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { authService } from "../services/authService";
import { sendSuccess } from "../utils/apiResponse";
import { AuthRequest } from "../types";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name } = signupSchema.parse(req.body);
      const result = await authService.signup(email, password, name);
      return sendSuccess(res, result, "Account created successfully", 201);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const result = await authService.login(email, password);
      return sendSuccess(res, result, "Login successful");
    } catch (err) {
      next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken)
        return res
          .status(400)
          .json({ success: false, message: "Refresh token required" });
      const result = await authService.refresh(refreshToken);
      return sendSuccess(res, result);
    } catch (err) {
      next(err);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (refreshToken) await authService.logout(refreshToken);
      return sendSuccess(res, null, "Logged out successfully");
    } catch (err) {
      next(err);
    }
  },

  async me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await authService.getMe(req.userId!);
      return sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  },
};
