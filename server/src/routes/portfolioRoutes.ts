import { Router } from "express";
import { portfolioController } from "../controllers/portfolioController";
import { authenticate } from "../middleware/auth";
import { apiLimiter } from "../middleware/rateLimiter";

const router = Router();

// Public
router.get("/public/:slug", portfolioController.getBySlug);

// Protected
router.use(authenticate);
router.use(apiLimiter);
router.get("/", portfolioController.getAll);
router.post("/", portfolioController.create);
router.put("/:id", portfolioController.update);
router.delete("/:id", portfolioController.delete);

export default router;
