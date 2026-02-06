# Simple Messenger

A lightweight real-time messaging app using WebSockets. Send text and emojis to other users via their Node ID.

## Project Structure

```
simple-messenger/
├── frontend/          # Next.js + React app
└── backend/           # Flask + SocketIO server
```

## Tech Stack

**Frontend:**
- Next.js 14.2
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- React Hook Form + Zod

**Backend:**
- Flask
- Flask-SocketIO
- Python 3.x

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
python run.py
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:3000`

## How It Works

1. Enter a receiver's Node ID (64-character hex string)
2. Type your message (text + emojis supported)
3. Hit send - message goes through WebSocket to the backend
4. Backend routes the message to the receiver
5. Receiver sees the message in real-time

**Message Colors:**
- Your messages: Blue/purple
- Received messages: Gray

## Node ID Format

Example: `62ffb058fd9bb911519b623d75301dc9f691b840fad90d67149f08655abbfd0f`

Must be exactly 64 hexadecimal characters.

## Development Notes

- No user auth or message persistence
- Messages only work if both users are connected
- Each user needs their own Node ID to receive messages

## Testing Locally

Open two browser tabs:
- Tab 1: User with Node ID A
- Tab 2: User with Node ID B
- Send messages back and forth

---

Built with | by blockneural

