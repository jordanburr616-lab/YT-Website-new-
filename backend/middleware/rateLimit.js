import rateLimit from "express-rate-limit";

export const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,

  message: {
    error: "Too many chat requests. Please wait a moment and try again.",
  },
});