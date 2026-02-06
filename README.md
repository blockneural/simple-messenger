# Simple Messenger

A lightweight real-time messaging app using WebSockets. Send text and emojis to other users via their Node ID.

![Status](https://img.shields.io/badge/status-ready-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- ⚡ **Real-time messaging** via WebSockets
- 💬 **Text + Emoji support**
- 🎨 **Visual distinction**: Blue bubbles for sent, Gray for received
- 🔐 **Node ID based** - No authentication needed
- 🌓 **Dark mode** support
- 📱 **Responsive design**
- ✅ **Input validation** with real-time feedback
- 🔄 **Auto-reconnection** on connection loss
- 📋 **Copy Node ID** with one click

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

**1. Backend (Flask + SocketIO)**
```bash
cd backend
pip install -r requirements.txt
python run.py
```
Server runs on `http://localhost:5000`

**2. Frontend (Next.js + React)**
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:3000`

### Configuration

**Backend** - Create `backend/.env`:
```env
FLASK_ENV=development
PORT=5000
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3000
```

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Usage

1. Open `http://localhost:3000`
2. Your unique Node ID is auto-generated
3. Copy your Node ID and share it
4. Enter receiver's Node ID
5. Start messaging!

**Testing with two users:**
- Open two browser tabs/windows
- Each gets a unique Node ID
- Exchange Node IDs and message each other

## Tech Stack

### Frontend
- **Next.js 14.2** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4** - Styling
- **Radix UI** - Component primitives
- **Lucide Icons** - Icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Socket.io Client** - WebSocket connection

### Backend
- **Flask** - Python web framework
- **Flask-SocketIO** - WebSocket support
- **Flask-CORS** - Cross-origin support
- **Python-SocketIO** - Socket.io server

## Project Structure

```
simple-messenger/
├── frontend/          # Next.js + React app
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utilities and configs
│   └── types/        # TypeScript types
│
├── backend/          # Flask + SocketIO server
│   ├── app/          # Application code
│   ├── config.py     # Configuration
│   └── run.py        # Entry point
│
├── QUICKSTART.md     # Detailed setup guide
├── TESTING.md        # Testing instructions
└── README.md         # This file
```

## How It Works

1. **User connects** → Frontend establishes WebSocket connection
2. **Node ID registration** → Backend maps Node ID to socket session
3. **Send message** → Frontend validates and sends via WebSocket
4. **Backend routes** → Finds receiver by Node ID and forwards message
5. **Receive message** → Frontend displays in real-time
6. **Visual feedback** → Sent (blue) vs Received (gray) bubbles

## Screenshots

### Main Interface
- Connection status indicator (green = connected)
- Your Node ID with copy button
- Receiver Node ID input with validation
- Message list with auto-scroll
- Message input with emoji support

### Message Colors
- **Your messages**: Blue gradient bubbles (right-aligned)
- **Received messages**: Gray bubbles (left-aligned)

## Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Complete setup and usage guide
- **[TESTING.md](TESTING.md)** - Testing scenarios and troubleshooting
- **Backend README** - `backend/README.md`
- **Frontend README** - `frontend/README.md`

## Development

### Run Backend
```bash
cd backend
python run.py
```
Watch logs for:
```
✅ Client connected
📝 Registered: abc123...
📨 Message: abc123... → def456...
```

### Run Frontend
```bash
cd frontend
npm run dev
```
Open browser DevTools (F12) to see WebSocket logs

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - New line
- **Win + .** (Windows) - Emoji picker
- **Cmd + Ctrl + Space** (Mac) - Emoji picker

## Requirements Met

✅ Text and emoji messaging  
✅ Chat input field  
✅ Receiver field with Node ID validation  
✅ Send and receive messages  
✅ Socket-based real-time communication  
✅ Visual distinction by color (blue vs gray)  
✅ Attractive, modern UI  
✅ Frontend implementation with Flask API integration  
✅ All specified technologies used  

## Troubleshooting

**Connection issues?**
- Ensure backend is running on port 5000
- Check `.env.local` has correct socket URL

**Messages not sending?**
- Both users must be connected (green dot)
- Receiver Node ID must be valid (64 hex chars)

**See detailed troubleshooting in [QUICKSTART.md](QUICKSTART.md)**

## License

MIT License - feel free to use for any purpose

---

Built with ⚡ for real-time communication
