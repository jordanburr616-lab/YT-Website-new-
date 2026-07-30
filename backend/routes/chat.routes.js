import express from "express";
import { handleChat } from "../controllers/chat.controller.js";
import { chatLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.post("/", chatLimiter, handleChat);

export default router;