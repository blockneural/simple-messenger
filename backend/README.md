# Backend - Flask SocketIO Server

Real-time messaging server using Flask and SocketIO.

## Setup

1. **Create virtual environment** (recommended)
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Mac/Linux
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure environment**

Create a `.env` file in the backend directory:
```
FLASK_ENV=development
PORT=5000
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3000
```

4. **Run the server**
```bash
python run.py
```

Server will start on `http://localhost:5000`

## Project Structure

```
backend/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── socket_events.py     # WebSocket event handlers
│   └── utils.py             # Helper functions
├── config.py                # Configuration
├── run.py                   # Entry point
└── requirements.txt         # Dependencies
```

## Testing

You can test WebSocket connection using any socket.io client or browser console.

