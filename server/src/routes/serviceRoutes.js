import { Router } from "express";
import { body } from "express-validator";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getServices);

router.use(protect);

router.post(
  "/",
  validate([
    body("title").trim().isLength({ min: 2, max: 80 }).withMessage("Title must be between 2 and 80 characters"),
    body("description").trim().isLength({ min: 5, max: 400 }).withMessage("Description must be between 5 and 400 characters"),
  ]),
  createService
);

router.put(
  "/:id",
  validate([
    body("title").optional().trim().isLength({ max: 80 }).withMessage("Title too long"),
    body("description").optional().trim().isLength({ max: 400 }).withMessage("Description too long"),
  ]),
  updateService
);

router.delete("/:id", deleteService);

export default router;
