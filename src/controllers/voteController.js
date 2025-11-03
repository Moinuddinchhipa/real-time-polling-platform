// src/controllers/voteController.js
import Vote from "../models/Vote.js";
import Question from "../models/Question.js";

export const submitVote = async (req, res) => {
  try {
    const { sessionId, questionId, optionIndex, participantId } = req.body;

    const existingVote = await Vote.findOne({ sessionId, questionId, participantId });
    if (existingVote) return res.status(400).json({ message: "Already voted" });

    await Vote.create({ sessionId, questionId, optionIndex, participantId });

    // Increment votes asynchronously
    setImmediate(async () => {
      const question = await Question.findById(questionId);
      question.options[optionIndex].votes += 1;
      await question.save();
    });

    res.status(202).json({ message: "Vote accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
