from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from config import Config

socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # enable CORS
    CORS(app, resources={r"/*": {"origins": app.config['CORS_ORIGINS']}})
    
    # initialize socketio
    socketio.init_app(app, cors_allowed_origins=app.config['CORS_ORIGINS'])
    
    # register socket events
    from app import socket_events
    
    return app

