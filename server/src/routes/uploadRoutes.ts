import { Router, Response, NextFunction } from "express";
import path from "path";
import { authenticate } from "../middleware/auth";
import { upload } from "../middleware/upload";
import { sendSuccess, sendError } from "../utils/apiResponse";
import { AuthRequest } from "../types";

const router = Router();

router.post(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) return sendError(res, "No file uploaded", 400);

      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      return sendSuccess(res, { url: fileUrl }, "Avatar uploaded successfully");
    } catch (err) {
      next(err);
    }
  },
);

export default router;
