import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { config } from "../config/index.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSuccess } from "../utils/apiResponse.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select(
    "+passwordHash"
  );

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = signToken(user);
  const userSafe = { id: user._id, name: user.name, email: user.email, role: user.role };

  const isProduction = config.nodeEnv === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  createSuccess(res, { user: userSafe, token }, 200);
});

export const logout = asyncHandler(async (req, res) => {
  const isProduction = config.nodeEnv === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  createSuccess(res, { message: "Logged out successfully" });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-passwordHash");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  createSuccess(res, { user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
