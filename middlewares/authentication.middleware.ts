import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.cookies.token;
  const secret = config.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT SECRET in the env");
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized!" });
  }

  try {
    jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
