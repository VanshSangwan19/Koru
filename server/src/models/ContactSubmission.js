import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      default: "",
      trim: true,
      maxlength: [30, "Phone cannot exceed 30 characters"],
    },
    company: {
      type: String,
      default: "",
      trim: true,
      maxlength: [120, "Company cannot exceed 120 characters"],
    },
    projectType: {
      type: String,
      default: "",
      trim: true,
      maxlength: [60, "Project type cannot exceed 60 characters"],
    },
    budget: {
      type: String,
      default: "",
      trim: true,
      maxlength: [60, "Budget cannot exceed 60 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

contactSchema.index({ status: 1, createdAt: -1 });

const ContactSubmission = mongoose.model(
  "ContactSubmission",
  contactSchema
);

export default ContactSubmission;
