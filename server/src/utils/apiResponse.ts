import { Response } from "express";
import { ApiResponse } from "../types";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  status = 200,
) {
  const response: ApiResponse<T> = { success: true, data, message };
  return res.status(status).json(response);
}

export function sendError(
  res: Response,
  message: string,
  status = 400,
  errors?: string[],
) {
  const response: ApiResponse = { success: false, message, errors };
  return res.status(status).json(response);
}
