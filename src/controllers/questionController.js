// src/controllers/questionController.js
import Question from "../models/Question.js";

export const addQuestion = async (req, res) => {
  try {
    const { sessionId, questionText, options } = req.body;
    const question = await Question.create({
      sessionId,
      questionText,
      options: options.map((text) => ({ text })),
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ sessionId: req.params.sessionId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
