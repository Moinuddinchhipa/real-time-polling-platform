# Real-Time Polling Platform

## Overview
A real-time polling application where organizers can create live polls, and participants can vote without accounts. Results are updated instantly using Socket.IO.

## Tech Stack
- Backend: Node.js + Express.js
- Database: MongoDB
- Real-time: Socket.IO
- Client demo: client.html (uses Chart.js)

## Setup Instructions
1. Clone repository:
git clone https://github.com/Moinuddinchhipa/real-time-polling-platform.git
2. Install dependencies:
npm install
3. Start server:
npm run dev
4. Open `client.html` in browser for live demo.

## Architecture
- `server.js` initializes Express and Socket.IO.
- Routes organized as:
- `/api/auth` → authentication
- `/api/sessions` → create, start, stop, fetch sessions
- `/api/votes` → submit votes
- `controllers/` handle business logic.
- `models/` define MongoDB schemas.
- Socket.IO pushes live vote updates.

## Database Schema
- **Session**: title, joinCode, organizerId, isActive
- **Question**: sessionId, questionText, options [{text, votes}]
- **Vote**: sessionId, questionId, optionIndex, participantId

## Duplicate-Vote Prevention
- Each vote is recorded with participantId in `Vote` collection.
- Before incrementing a vote, the backend checks if participant has already voted for the question.
- Trade-off: extra memory and database writes but prevents multiple votes from same user.

## APIs
| Method | Endpoint | Description |
|--------|---------|------------|
| POST   | /auth/register | Register organizer |
| POST   | /auth/login | Login organizer, get token |
| POST   | /sessions/create | Create a new session (organizer only) |
| PUT    | /sessions/:id/start | Start a session |
| PUT    | /sessions/:id/stop | Stop a session |
| GET    | /sessions/ | Get all sessions (organizer token) |
| GET    | /sessions/:id | Get all questions & votes for a session |
| POST   | /votes/ | Submit a vote |

## Postman Collection
Import the included `Real-Time-Polling.postman_collection.json` to test APIs.

## Optional
- `client.html` demonstrates live updates using charts.

## Screenshots
![4](https://github.com/user-attachments/assets/02c60a72-0d4e-4fc6-a0e8-c3bd3e67665c)
![4](https://github.com/user-attachments/assets/9b60903b-7adf-4f73-a20b-3487dc2730c4)
![5](https://github.com/user-attachments/assets/941763e5-13e0-47c5-9052-4e007083651c)
![6](h![Uploading 2.jpg…]()
ttps://github.com/user-attachments/assets/1dbb2e0a-ee24-48eb-9a3e-cc496d4208b7)
![1](https://github.com/user-attachments/assets/465fb595-8f41-4cc9-a780-71a52a0d6e5c)

