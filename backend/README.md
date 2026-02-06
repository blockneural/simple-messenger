# Backend

Flask server with WebSocket support for real-time messaging.

## Setup

```bash
cd backend
pip install -r requirements.txt
python run.py
```

Server runs on http://localhost:5000

## Configuration

Create `.env` file:
```
FLASK_ENV=development
PORT=5000
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3000
```

## WebSocket Events

**From client:**
- `register` - Register Node ID
- `send_message` - Send message to another user

**To client:**
- `connection_response` - Connection confirmed
- `registered` - Registration successful
- `receive_message` - Incoming message
- `message_status` - Delivery status
- `error` - Error notification

## Structure

```
backend/
├── app/
│   ├── __init__.py       Flask app setup
│   ├── socket_events.py  WebSocket handlers
│   └── utils.py          Validation functions
├── config.py             Configuration loader
├── run.py               Server entry point
└── requirements.txt     Python dependencies
```
