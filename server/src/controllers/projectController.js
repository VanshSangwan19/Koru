import Project from "../models/Project.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";
import { createSuccess, createPaginated } from "../utils/apiResponse.js";

const publicFilter = { status: "published" };

export const getProjects = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 9, 1), 50);
  const featured = req.query.featured === "true";

  const filter = featured ? { ...publicFilter, featured: true } : publicFilter;

  const [total, docs] = await Promise.all([
    Project.countDocuments(filter),
    Project.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
  ]);

  createPaginated(res, { docs, total, page, limit, pages: Math.ceil(total / limit) });
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    slug: req.params.slug,
    ...publicFilter,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  createSuccess(res, project);
});

export const createProject = asyncHandler(async (req, res) => {
  const body = req.body;
  if (body.slug) {
    body.slug = slugify(body.slug);
  } else {
    body.slug = slugify(body.title);
  }

  const project = await Project.create(body);
  createSuccess(res, project, 201);
});

export const updateProject = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (body.slug) body.slug = slugify(body.slug);

  const project = await Project.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  createSuccess(res, project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  createSuccess(res, { message: "Project deleted", id: req.params.id });
});
