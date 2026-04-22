import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const getToken = (req: Request, res: Response) => {
  const secret = config.JWT_SECRET;

  if (!secret) {
    throw new Error("Missing JWT SECRET in the env");
  }

  const token = jwt.sign(
    {
      message: "You are eligible to send an email now :)",
    },
    secret,
    {
      expiresIn: "15m",
    },
  );

  const isProduction = config.NODE_ENV ? config.NODE_ENV === "production" : false;

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction ? true : false,
    sameSite: isProduction ? "none" : "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.json({ message: "Token has been issued!" });
};
