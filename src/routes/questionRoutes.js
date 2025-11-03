// src/routes/questionRoutes.js
import express from "express";
import { addQuestion, getQuestions } from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/add", protect, addQuestion);
router.get("/:sessionId", getQuestions);

export default router;
