import type { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const emailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: "Too many emails sent! Please try again later.",
      retryAfter: "5 minutes",
    });
  },
});

export const tokenLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  handler: (_req: Request, res: Response) => {
    res.status(429).json({
      error: "Too request! Please try again later.",
      retryAfter: "5 minutes",
    });
  },
});
