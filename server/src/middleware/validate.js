import { validationResult } from "express-validator";

export const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const messages = errors.array().map((e) => e.msg);
  return res.status(400).json({
    success: false,
    message: messages[0],
    errors: messages,
  });
};

export const sanitizeString = (value) => {
  if (typeof value !== "string") return value;
  return value.trim().replace(/\s{2,}/g, " ");
};
