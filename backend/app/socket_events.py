from flask_socketio import emit, disconnect
from app import socketio
from app.utils import validate_node_id, validate_message

# store active connections: node_id -> session_id
active_connections = {}

@socketio.on('connect')
def handle_connect():
    print('✅ Client connected')
    emit('connection_response', {'status': 'connected'})

@socketio.on('disconnect')
def handle_disconnect():
    # remove from active connections
    from flask import request
    disconnected_node = None
    
    for node_id, sid in list(active_connections.items()):
        if sid == request.sid:
            disconnected_node = node_id
            del active_connections[node_id]
            break
    
    if disconnected_node:
        print(f'❌ Client disconnected: {disconnected_node[:16]}...')
    else:
        print('❌ Client disconnected')

@socketio.on('register')
def handle_register(data):
    """
    Register a user's Node ID with their socket session.
    """
    node_id = data.get('node_id')
    
    if not validate_node_id(node_id):
        emit('error', {'message': 'Invalid Node ID format'})
        return
    
    # store the connection
    from flask import request
    active_connections[node_id] = request.sid
    
    print(f'📝 Registered: {node_id[:16]}...')
    emit('registered', {'node_id': node_id})

@socketio.on('send_message')
def handle_send_message(data):
    """
    Receive a message from client and route to receiver.
    """
    receiver_id = data.get('receiver')
    message_text = data.get('message')
    sender_id = data.get('sender')
    
    # validate inputs
    if not validate_node_id(receiver_id):
        emit('error', {'message': 'Invalid receiver Node ID'})
        return
    
    if not validate_message(message_text):
        emit('error', {'message': 'Message cannot be empty'})
        return
    
    if not validate_node_id(sender_id):
        emit('error', {'message': 'Invalid sender Node ID'})
        return
    
    # check if receiver is online
    if receiver_id not in active_connections:
        emit('message_status', {
            'status': 'failed',
            'reason': 'Receiver is offline'
        })
        return
    
    # send message to receiver
    receiver_sid = active_connections[receiver_id]
    
    message_payload = {
        'sender': sender_id,
        'message': message_text,
        'timestamp': data.get('timestamp')
    }
    
    socketio.emit('receive_message', message_payload, room=receiver_sid)
    
    # confirm to sender
    emit('message_status', {'status': 'sent'})
    
    print(f'📨 Message: {sender_id[:8]}... → {receiver_id[:8]}...')

