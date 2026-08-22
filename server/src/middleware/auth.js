import jwt from "jsonwebtoken";

import { config } from "../config/index.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token invalid or expired");
  }

  const user = await User.findById(decoded.id).select("-passwordHash");
  if (!user) {
    res.status(401);
    throw new Error("Not authorized, user no longer exists");
  }

  if (user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized, admin only");
  }

  req.user = user;
  next();
});
