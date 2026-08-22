import bcrypt from "bcryptjs";

import { config } from "../config/index.js";
import { connectDB, disconnectDB } from "../config/db.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Service from "../models/Service.js";
import Testimonial from "../models/Testimonial.js";
import ContactSubmission from "../models/ContactSubmission.js";
import SiteSetting from "../models/SiteSetting.js";
import { projects, services } from "./seedData.js";

const clear = async () => {
  await Promise.all([
    User.deleteMany({}),
    Project.deleteMany({}),
    Service.deleteMany({}),
    Testimonial.deleteMany({}),
    ContactSubmission.deleteMany({}),
    SiteSetting.deleteMany({}),
  ]);
};

const seedAdmin = async () => {
  const passwordHash = await bcrypt.hash(config.adminPassword, 12);
  const admin = await User.findOneAndUpdate(
    { email: config.adminEmail.toLowerCase() },
    {
      name: "Koru Admin",
      email: config.adminEmail.toLowerCase(),
      passwordHash,
      role: "admin",
    },
    { upsert: true, new: true }
  );
  console.log(`[seed] admin ready: ${admin.email}`);
};

const seedSiteSetting = async () => {
  await SiteSetting.findOneAndUpdate(
    { key: "site" },
    {
      site: {
        name: "KORU",
        tagline: "Websites that make businesses look better, work smarter, and grow.",
        footerTagline: "Digital experiences built for ambitious businesses.",
        availability: "Available for freelance projects",
        email: config.adminEmail,
        phone: "",
        socials: { github: "", linkedin: "", instagram: "" },
      },
    },
    { upsert: true, new: true }
  );
  console.log("[seed] site settings ready");
};

const seedServices = async () => {
  await Service.insertMany(services);
  console.log(`[seed] services created: ${services.length}`);
};

const seedProjects = async () => {
  await Project.insertMany(projects);
  console.log(`[seed] projects created: ${projects.length}`);
};

const run = async () => {
  try {
    await connectDB();
    await clear();
    await seedAdmin();
    await seedSiteSetting();
    await seedServices();
    await seedProjects();

    console.log("[seed] done. No fake testimonials were created.");
    console.log("      Add real testimonials later via the admin dashboard.");
  } catch (err) {
    console.error("[seed] failed:", err);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
};

run();