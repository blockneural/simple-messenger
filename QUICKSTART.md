# Simple Messenger - Quick Start Guide

## Prerequisites

- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **npm** or **yarn**

## Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run the server
python run.py
```

Backend will start on `http://localhost:5000`

You should see:
```
🚀 Starting Flask-SocketIO server on port 5000...
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on `http://localhost:3000`

### 3. Environment Configuration

**Backend** (`backend/.env`):
```
FLASK_ENV=development
PORT=5000
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

## Using the Messenger

### First Time Use

1. **Open the app** at `http://localhost:3000`
2. You'll automatically get a unique **Node ID** (saved in browser)
3. **Copy your Node ID** by clicking the copy button
4. **Share it** with someone you want to chat with

### Sending Messages

1. **Get the receiver's Node ID** from them
2. **Paste it** in the "Receiver Node ID" field
3. Wait for green checkmark (validates 64 hex characters)
4. **Type your message** (text and emojis supported)
5. **Press Enter** or click Send button
6. Your message appears as a **blue bubble** on the right

### Receiving Messages

1. **Share your Node ID** with others
2. When they send you a message:
   - You'll see it as a **gray bubble** on the left
   - Sender's Node ID shown (truncated)
   - Timestamp displayed
   - Auto-scrolls to new messages

### Testing Locally (Two Users)

**Option 1: Two Browser Tabs**
1. Open `http://localhost:3000` in Tab 1
2. Open `http://localhost:3000` in Tab 2 (or incognito)
3. Copy Node ID from Tab 1
4. Paste in Tab 2's receiver field
5. Send message from Tab 2
6. See it appear in Tab 1 as gray bubble
7. Copy Node ID from Tab 2
8. Reply from Tab 1

**Option 2: Two Browsers**
- Same as above but use Chrome + Firefox (or any two browsers)
- Each gets its own Node ID

## Features

✅ **Real-time messaging** via WebSockets
✅ **Text + Emoji support** (use Win + . or Cmd + Ctrl + Space)
✅ **Visual distinction**: Blue for sent, Gray for received
✅ **Auto-generated Node IDs** (persists across refreshes)
✅ **Connection status** indicator
✅ **Input validation** with real-time feedback
✅ **Error handling** with user-friendly messages
✅ **Auto-scroll** to new messages
✅ **Copy Node ID** with one click
✅ **Dark mode** support
✅ **Responsive design**

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - New line in message
- **Win + .** (Windows) - Emoji picker
- **Cmd + Ctrl + Space** (Mac) - Emoji picker

## Troubleshooting

### Connection Issues

**Red dot showing (disconnected)?**
- Make sure backend is running on port 5000
- Check `.env.local` has correct socket URL
- Check browser console for errors

**Messages not sending?**
- Verify both users have green dot (connected)
- Verify receiver Node ID is exactly 64 hex characters
- Check that receiver is actually online

### Backend Issues

**Import errors?**
```bash
cd backend
pip install -r requirements.txt
```

**Port already in use?**
Change port in `backend/.env`:
```
PORT=5001
```
And update frontend `.env.local`:
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:5001
```

### Frontend Issues

**Can't start dev server?**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Module not found errors?**
```bash
npm install
```

## Project Structure

```
simple-messenger/
├── backend/              # Flask + SocketIO server
│   ├── app/
│   │   ├── __init__.py
│   │   ├── socket_events.py
│   │   └── utils.py
│   ├── config.py
│   ├── run.py
│   └── requirements.txt
│
├── frontend/             # Next.js + React app
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   ├── MessageList.tsx
│   │   └── ReceiverInput.tsx
│   ├── hooks/
│   │   └── useWebSocket.ts
│   ├── lib/
│   │   ├── socket.ts
│   │   ├── utils.ts
│   │   └── validation.ts
│   ├── types/
│   │   └── message.ts
│   └── package.json
│
└── README.md
```

## Tech Stack

**Frontend:**
- Next.js 14.2
- React 18
- TypeScript 5
- Tailwind CSS 4
- Radix UI
- Lucide Icons
- React Hook Form
- Zod Validation
- Socket.io Client

**Backend:**
- Python 3.x
- Flask
- Flask-SocketIO
- Flask-CORS

## Support

If you encounter issues:
1. Check this guide
2. See `TESTING.md` for detailed testing scenarios
3. Check backend terminal for error logs
4. Check browser console (F12) for frontend errors

## Building for Production

### Backend
```bash
cd backend
# Use production WSGI server like gunicorn
pip install gunicorn
gunicorn --worker-class eventlet -w 1 run:app
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

---

Happy messaging! 💬
