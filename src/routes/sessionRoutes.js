import express from "express";
import {
  createSession,
  startSession,
  stopSession,
  getSessionResults,
  getAllSessions,
} from "../controllers/sessionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 CREATE a new session
router.post("/create", protect, createSession);

// 🟡 START a session
router.put("/:id/start", protect, startSession);

// 🔴 STOP a session
router.put("/:id/stop", protect, stopSession);

// 🔹 GET all sessions
router.get("/", protect, getAllSessions);

// 🔹 GET session questions + votes
router.get("/:id", getSessionResults);

export default router;
