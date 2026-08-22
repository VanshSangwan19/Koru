import { Router } from "express";
import { body } from "express-validator";

import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { sanitizeString } from "../middleware/validate.js";

const router = Router();

router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

router.use(protect);

router.post(
  "/",
  validate([
    body("title")
      .trim()
      .isLength({ min: 2, max: 120 })
      .withMessage("Title must be between 2 and 120 characters")
      .customSanitizer(sanitizeString),
    body("category")
      .trim()
      .isLength({ min: 2, max: 80 })
      .withMessage("Category must be between 2 and 80 characters"),
    body("description")
      .trim()
      .isLength({ min: 5, max: 300 })
      .withMessage("Description must be between 5 and 300 characters"),
  ]),
  createProject
);

router.put(
  "/:id",
  validate([
    body("title").optional().trim().isLength({ max: 120 }).withMessage("Title too long"),
    body("category").optional().trim().isLength({ max: 80 }).withMessage("Category too long"),
    body("description").optional().trim().isLength({ max: 300 }).withMessage("Description too long"),
  ]),
  updateProject
);

router.delete("/:id", deleteProject);

export default router;
