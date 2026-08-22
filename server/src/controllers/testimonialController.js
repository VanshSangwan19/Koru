import Testimonial from "../models/Testimonial.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSuccess } from "../utils/apiResponse.js";

export const getTestimonials = asyncHandler(async (req, res) => {
  const approvedOnly = req.query.public === "true";

  const filter = approvedOnly ? { approved: true } : {};
  const testimonials = await Testimonial.find(filter).sort({
    approved: -1,
    createdAt: -1,
  });

  createSuccess(res, testimonials);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  createSuccess(res, testimonial, 201);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  createSuccess(res, testimonial);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  createSuccess(res, { message: "Testimonial deleted", id: req.params.id });
});
