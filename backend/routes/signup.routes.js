import express from "express";
import { handleSignup } from "../controllers/signup.controller.js";

const router = express.Router();

router.post("/", handleSignup);

export default router;