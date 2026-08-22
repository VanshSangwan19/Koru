import Service from "../models/Service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSuccess } from "../utils/apiResponse.js";

export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ sortOrder: 1, createdAt: 1 });
  createSuccess(res, services);
});

export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  createSuccess(res, service, 201);
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  createSuccess(res, service);
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  createSuccess(res, { message: "Service deleted", id: req.params.id });
});
