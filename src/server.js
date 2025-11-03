// server.js
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import Question from "./models/Question.js";
import Session from "./models/Session.js";
import Vote from "./models/Vote.js";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Socket.io connection
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // 1️⃣ Join a session room
  socket.on("joinSession", (sessionId) => {
    socket.join(sessionId);
    console.log(`${socket.id} joined session ${sessionId}`);
  });

  // 2️⃣ Voting event from participant
  socket.on("vote", async (data) => {
    const { sessionId, questionId, optionIndex, participantId } = data;

    try {
      // Check if participant already voted
      const existingVote = await Vote.findOne({ sessionId, questionId, participantId });
      if (existingVote) {
        console.log("Duplicate vote prevented:", participantId);
        return;
      }

      // Record vote
      await Vote.create({ sessionId, questionId, optionIndex, participantId });

      // Atomic increment of votes
      await Question.updateOne(
        { _id: questionId },
        { $inc: { [`options.${optionIndex}.votes`]: 1 } }
      );

      // Emit updated question
      const updatedQuestion = await Question.findById(questionId);
      io.to(sessionId).emit("voteUpdate", updatedQuestion);

      // Emit full session snapshot
      const session = await Session.findById(sessionId).populate("questions");
      if (session) io.to(sessionId).emit("sessionResults", session);

    } catch (err) {
      console.error("Vote error:", err.message);
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
