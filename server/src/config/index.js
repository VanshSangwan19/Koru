import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri:
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/koru",
  jwtSecret: process.env.JWT_SECRET || "dev-only-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminEmail: process.env.ADMIN_EMAIL || "admin@koru.dev",
  adminPassword: process.env.ADMIN_PASSWORD || "ChangeMe123!",
  clientUrl:
    process.env.CLIENT_URL?.split(",")
      .map((o) => o.trim().replace(/\/+$/, ""))
      .filter(Boolean)
      .join(",") || "http://localhost:5173",
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    notifyEmail: process.env.CONTACT_NOTIFY_EMAIL,
  },
};
