import mongoose from "mongoose";

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: "", trim: true },
    priceLabel: { type: String, default: "Let's discuss", trim: true },
    features: [{ type: String }],
  },
  { _id: false }
);

const siteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      default: "site",
    },
    site: {
      name: { type: String, default: "KORU" },
      tagline: { type: String, default: "" },
      footerTagline: { type: String, default: "" },
      availability: {
        type: String,
        default: "Available for freelance projects",
      },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      socials: {
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        instagram: { type: String, default: "" },
      },
    },
    pricing: {
      note: {
        type: String,
        default: "Every project is different. Contact me for a custom quote.",
      },
      plans: {
        type: [pricingPlanSchema],
        default: [
          {
            name: "Starter",
            tagline: "For simple business websites.",
            priceLabel: "Starting from ₹15,000",
            features: [
              "Up to 5 pages",
              "Responsive design",
              "Basic SEO setup",
              "Contact form",
            ],
          },
          {
            name: "Growth",
            tagline: "For businesses that need a stronger online presence.",
            priceLabel: "Starting from ₹35,000",
            features: [
              "Up to 10 pages",
              "Custom design",
              "Content management",
              "Advanced SEO",
            ],
          },
          {
            name: "Custom",
            tagline: "For advanced websites and web applications.",
            priceLabel: "Let's discuss",
            features: [
              "Tailored to your needs",
              "Web applications",
              "E-commerce",
              "Ongoing support",
            ],
          },
        ],
      },
    },
  },
  { timestamps: true }
);

const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);

export default SiteSetting;
