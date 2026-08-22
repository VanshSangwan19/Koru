import { Router } from "express";
import { body } from "express-validator";

import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getTestimonials);

router.use(protect);

router.post(
  "/",
  validate([
    body("clientName").trim().isLength({ min: 2, max: 80 }).withMessage("Client name must be between 2 and 80 characters"),
    body("message").trim().isLength({ min: 5, max: 800 }).withMessage("Message must be between 5 and 800 characters"),
  ]),
  createTestimonial
);

router.put(
  "/:id",
  validate([
    body("clientName").optional().trim().isLength({ max: 80 }).withMessage("Client name too long"),
    body("message").optional().trim().isLength({ max: 800 }).withMessage("Message too long"),
  ]),
  updateTestimonial
);

router.delete("/:id", deleteTestimonial);

export default router;
