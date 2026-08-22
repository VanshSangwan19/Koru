import { Router } from "express";
import { body } from "express-validator";

import {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post(
  "/",
  contactLimiter,
  validate([
    body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Please enter your name"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("phone").optional({ values: "falsy" }).trim().isLength({ max: 30 }).withMessage("Phone number too long"),
    body("company").optional({ values: "falsy" }).trim().isLength({ max: 120 }).withMessage("Company name too long"),
    body("projectType").optional({ values: "falsy" }).trim().isLength({ max: 60 }),
    body("budget").optional({ values: "falsy" }).trim().isLength({ max: 60 }),
    body("message").trim().isLength({ min: 5, max: 3000 }).withMessage("Please write a short message (5+ characters)"),
  ]),
  createContact
);

router.use(protect);

router.get("/", getContacts);
router.put("/:id/status", updateContactStatus);
router.delete("/:id", deleteContact);

export default router;
