import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      maxlength: [80, "Client name cannot exceed 80 characters"],
    },
    company: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Company cannot exceed 100 characters"],
    },
    role: {
      type: String,
      default: "",
      trim: true,
      maxlength: [80, "Role cannot exceed 80 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [800, "Message cannot exceed 800 characters"],
    },
    image: { type: String, default: "" },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

testimonialSchema.index({ approved: 1, createdAt: -1 });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
