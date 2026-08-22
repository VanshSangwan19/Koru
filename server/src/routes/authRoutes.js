import { Router } from "express";
import { body } from "express-validator";

import { login, logout, me } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post(
  "/login",
  authLimiter,
  validate([
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ]),
  login
);

router.post("/logout", logout);

router.get("/me", protect, me);

export default router;
