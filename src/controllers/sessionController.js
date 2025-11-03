import Session from "../models/Session.js";
import Question from "../models/Question.js";
import { generateJoinCode } from "../utils/generateJoinCode.js";

// Create a new session
export const createSession = async (req, res) => {
  try {
    const { title } = req.body;
    const joinCode = generateJoinCode();
    const session = await Session.create({
      title,
      joinCode,
      organizerId: req.organizer.id,
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Start session
export const startSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.isActive = true;
    await session.save();
    res.json({ message: "Session started" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Stop session
export const stopSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.isActive = false;
    await session.save();
    res.json({ message: "Session stopped" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET all sessions for the logged-in organizer
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ organizerId: req.organizer.id }).select(
      "_id title joinCode isActive"
    );
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET session results (questions + votes) with session title
export const getSessionResults = async (req, res) => {
  try {
    const sessionId = req.params.id;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const questions = await Question.find({ sessionId });

    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for this session" });
    }

    res.status(200).json({
      sessionId,
      title: session.title,
      questions,
    });
  } catch (err) {
    console.error("Error fetching session results:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
