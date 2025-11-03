// src/controllers/authController.js
import Organizer from "../models/Organizer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerOrganizer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Organizer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const organizer = await Organizer.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "Organizer registered", organizer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginOrganizer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const organizer = await Organizer.findOne({ email });
    if (!organizer) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, organizer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: organizer._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, organizer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
