"""
Simple test script to verify WebSocket connection.
Run this after starting the Flask server.
"""

import socketio
import time

# create socket client
sio = socketio.Client()

@sio.event
def connect():
    print('✅ Connected to server!')

@sio.event
def connection_response(data):
    print(f'📨 Server says: {data}')

@sio.event
def registered(data):
    print(f'✅ Registered with Node ID: {data["node_id"][:16]}...')

@sio.event
def error(data):
    print(f'❌ Error: {data["message"]}')

@sio.event
def disconnect():
    print('❌ Disconnected from server')

if __name__ == '__main__':
    try:
        # connect to server
        sio.connect('http://localhost:5000')
        
        # test registration
        test_node_id = '62ffb058fd9bb911519b623d75301dc9f691b840fad90d67149f08655abbfd0f'
        sio.emit('register', {'node_id': test_node_id})
        
        # wait a bit
        time.sleep(2)
        
        print('\n✅ WebSocket connection test passed!')
        
        # disconnect
        sio.disconnect()
        
    except Exception as e:
        print(f'❌ Test failed: {e}')

