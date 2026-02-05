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

## WebSocket Events

**Client → Server:**
- `register` - Register your Node ID with the server
  ```json
  { "node_id": "64-char-hex-string" }
  ```

- `send_message` - Send a message to another user
  ```json
  {
    "sender": "your-node-id",
    "receiver": "receiver-node-id",
    "message": "Hello!",
    "timestamp": 1234567890
  }
  ```

**Server → Client:**
- `connection_response` - Connection confirmed
- `registered` - Registration successful
- `receive_message` - Incoming message from another user
- `message_status` - Message delivery status
- `error` - Error notification

## Testing

Run the test script (make sure server is running first):
```bash
python test_socket.py
```

Or use any socket.io client to connect to `http://localhost:5000`

