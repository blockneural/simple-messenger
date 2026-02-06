# Simple Messenger

Real-time messaging app with WebSockets. Users send text and emojis to each other using Node IDs.

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm

## Setup

### Backend

1. Navigate to backend folder:
```bash
cd backend
```

2. Create `.env` file with this content:
```
FLASK_ENV=development
PORT=5000
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3000
```

3. Install dependencies and run:
```bash
pip install -r requirements.txt
python run.py
```

Server runs on http://localhost:5000

### Frontend

1. Navigate to frontend folder (open new terminal):
```bash
cd frontend
```

2. Create `.env.local` file with this content:
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

3. Install dependencies and run:
```bash
npm install
npm run dev
```

App runs on http://localhost:3000

Open your browser at http://localhost:3000 to use the messenger.

## How it works

Each user gets a unique Node ID (64 hex characters). Share your Node ID with others so they can message you.

1. Open http://localhost:3000
2. Copy your Node ID
3. Enter receiver's Node ID
4. Type message and send
5. Messages appear in real-time

**Your messages:** Blue bubbles (right side)  
**Received messages:** Gray bubbles (left side)

## Tech Stack

**Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Socket.io-client  
**Backend:** Flask, Flask-SocketIO, Python 3

## Testing locally

Open two browser windows:
- Regular tab at localhost:3000
- Incognito tab at localhost:3000

Each will have a different Node ID. Paste Node IDs between windows and send messages.

## Network testing

To test between two computers:

1. Find Computer A's IP: run `ipconfig` and look for IPv4 Address (e.g. 192.168.1.100)
2. On Computer A: run backend and frontend normally
3. On Computer B: edit `frontend/.env.local` to point to Computer A's IP:
   ```
   NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:5000
   ```
4. On Computer B: run frontend only (`npm run dev`)
5. Exchange Node IDs and start messaging

Make sure port 5000 is allowed through Computer A's firewall.

## Features

- Real-time messaging via WebSocket
- Text and emoji support
- Node ID validation (64 hexadecimal characters)
- Connection status indicator
- Auto-generated persistent Node IDs
- No authentication or message history

## Project structure

```
simple-messenger/
├── backend/          Flask + SocketIO server
│   ├── app/
│   ├── config.py
│   └── run.py
└── frontend/         Next.js + React app
    ├── app/
    ├── components/
    ├── hooks/
    ├── lib/
    └── types/
```

## Troubleshooting

**Can't connect?**
- Check backend is running on port 5000
- Verify `.env.local` has correct URL
- Check firewall settings

**Messages not sending?**
- Both users must be connected (green dot)
- Receiver Node ID must be exactly 64 hex characters

**Need fresh Node ID?**
- Open browser console (F12)
- Type: `localStorage.clear()`
- Refresh page
