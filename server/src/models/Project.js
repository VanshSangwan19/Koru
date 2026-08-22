import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [80, "Category cannot exceed 80 characters"],
    },
    description: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters"],
    },
    longDescription: {
      type: String,
      default: "",
    },
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    features: [{ type: String }],
    technologies: [{ type: String }],
    image: { type: String, default: "" },
    gallery: [{ type: String }],
    designDecisions: [{ type: String }],
    results: [{ type: String }],
    concept: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
  },
  { timestamps: true }
);

projectSchema.index({ featured: 1, createdAt: -1 });

const Project = mongoose.model("Project", projectSchema);

export default Project;
