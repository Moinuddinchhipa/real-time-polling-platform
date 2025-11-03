// src/models/Organizer.js
import mongoose from "mongoose";

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("Organizer", organizerSchema);
