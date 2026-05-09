import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { sendError } from "../utils/apiResponse";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(`[Error] ${err.name}: ${err.message}`);

  // Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.issues.map((e) => `${e.path.join(".")}: ${e.message}`);
    return sendError(res, "Validation failed", 422, errors);
  }

  // App errors (known)
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return sendError(res, "Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    return sendError(res, "Token expired", 401);
  }

  // Unknown errors
  return sendError(res, "Internal server error", 500);
}

export function notFoundHandler(req: Request, res: Response) {
  return sendError(res, `Route ${req.method} ${req.path} not found`, 404);
}
