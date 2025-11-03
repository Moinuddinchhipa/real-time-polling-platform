// src/models/Vote.js
import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  optionIndex: Number,
  participantId: String, // could be IP or session cookie
}, { timestamps: true });

export default mongoose.model("Vote", voteSchema);
