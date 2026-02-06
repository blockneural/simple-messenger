# Testing Guide

## How to Test the Messenger

### Option 1: Two Browser Tabs (Same Computer)

1. **Start the backend:**
```bash
cd backend
python run.py
```

2. **Start the frontend:**
```bash
cd frontend
npm run dev
```

3. **Open two tabs:**
   - Tab 1: http://localhost:3000
   - Tab 2: http://localhost:3000 (incognito mode or different browser)

4. **Exchange messages:**
   - Each tab will have its own auto-generated Node ID
   - Copy Node ID from Tab 1
   - Paste it in the "Receiver Node ID" field in Tab 2
   - Type a message in Tab 2 and send
   - Tab 1 should receive the message (gray bubble)
   - Reply from Tab 1 (use Tab 2's Node ID as receiver)
   - Tab 2 should receive it (gray bubble)
   - Your sent messages appear as blue bubbles

### Option 2: Two Different Computers

1. **On Computer A:**
   - Run backend and frontend
   - Share your Node ID with Computer B

2. **On Computer B:**
   - Configure frontend to connect to Computer A's backend:
     - Edit `.env.local`: `NEXT_PUBLIC_SOCKET_URL=http://COMPUTER_A_IP:5000`
   - Run frontend only
   - Enter Computer A's Node ID as receiver

### Example Node IDs

These are generated automatically, but for manual testing:

```
User A: a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd
User B: 62ffb058fd9bb911519b623d75301dc9f691b840fad90d67149f08655abbfd0f
```

## Expected Behavior

✅ **Connection:**
- Green pulsing dot when connected
- Red dot when disconnected
- Auto-reconnects on connection loss

✅ **Sending Messages:**
- Enter valid receiver Node ID (64 hex chars)
- Type message (text + emojis work)
- Press Enter or click Send button
- Message appears as blue bubble on right
- Message sent to receiver via WebSocket

✅ **Receiving Messages:**
- Incoming messages appear as gray bubbles on left
- Sender's Node ID shown (truncated)
- Timestamp displayed
- Auto-scroll to new messages

✅ **Validation:**
- Receiver input validates 64 hex characters
- Green checkmark when valid
- Red X when invalid
- Send button disabled until valid

✅ **Errors:**
- Shows error message if receiver offline
- Shows error for invalid input
- Connection status always visible

## Common Issues

**Backend not starting?**
```bash
cd backend
pip install -r requirements.txt
python run.py
```

**Frontend not starting?**
```bash
cd frontend
npm install
npm run dev
```

**Can't connect?**
- Check backend is running on port 5000
- Check `.env.local` has correct URL
- Check firewall settings

**Messages not sending?**
- Verify both users are connected (green dot)
- Verify receiver Node ID is correct
- Check browser console for errors

## Backend Logs

Watch backend terminal for real-time activity:
```
✅ Client connected
📝 Registered: a1b2c3d4...
📨 Message: a1b2c3d4... → 62ffb058...
❌ Client disconnected: a1b2c3d4...
```

## Browser Console

Open DevTools (F12) to see frontend logs:
```
✅ Connected to server
✅ Registered with Node ID: a1b2c3d4...
📨 New message: {...}
📊 Message status: {status: "sent"}
```
