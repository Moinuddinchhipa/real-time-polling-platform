// src/models/Session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  joinCode: { type: String, unique: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
  isActive: { type: Boolean, default: false },
});

export default mongoose.model("Session", sessionSchema);
