// backend/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

/**
 * protect - Middleware to verify JSON Web Token (JWT) from cookies.
 *           If valid, attaches user object to req.user and calls next().
 */
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; // or req.headers.authorization, depending on your setup

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      console.error("JWT verification failed:", error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

/**
 * admin - Middleware to check if the authenticated user is admin.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
