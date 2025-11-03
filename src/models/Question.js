// src/models/Question.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const questionSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
  questionText: { type: String, required: true },
  options: [optionSchema],
});

export default mongoose.model("Question", questionSchema);
