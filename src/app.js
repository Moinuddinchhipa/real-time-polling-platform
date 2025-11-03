import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/votes", voteRoutes);

import Session from "./models/Session.js"; // make sure you have Session model
import Question from "./models/Question.js"; // for populating questions

// ✅ Get all questions for a given session
app.get("/api/session/:sessionId/questions", async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const session = await Session.findById(sessionId).populate("questions");
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ questions: session.questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get poll results (optional)
app.get("/api/session/:sessionId/results", async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const session = await Session.findById(sessionId).populate("questions");
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({
      sessionId: session._id,
      sessionName: session.name,
      questions: session.questions,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default app;
