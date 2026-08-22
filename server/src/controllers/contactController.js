import ContactSubmission from "../models/ContactSubmission.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSuccess, createPaginated } from "../utils/apiResponse.js";
import { sendContactNotification } from "../utils/mailer.js";

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, company, projectType, budget, message } = req.body;

  const submission = await ContactSubmission.create({
    name,
    email,
    phone: phone || "",
    company: company || "",
    projectType: projectType || "",
    budget: budget || "",
    message,
  });

  sendContactNotification(submission).catch(() => {});

  createSuccess(res, { message: "Your project request has been received." }, 201);
});

export const getContacts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 50);
  const status = req.query.status;

  const filter = status && status !== "all" ? { status } : {};

  const [total, docs] = await Promise.all([
    ContactSubmission.countDocuments(filter),
    ContactSubmission.find(filter).sort({ createdAt: -1 }),
  ]);

  createPaginated(res, { docs, total, page, limit, pages: Math.ceil(total / limit) });
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["new", "read", "replied", "archived"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  const submission = await ContactSubmission.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!submission) {
    res.status(404);
    throw new Error("Contact submission not found");
  }

  createSuccess(res, submission);
});

export const deleteContact = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.findByIdAndDelete(req.params.id);

  if (!submission) {
    res.status(404);
    throw new Error("Contact submission not found");
  }

  createSuccess(res, { message: "Contact submission deleted", id: req.params.id });
});
