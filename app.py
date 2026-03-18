from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
socketio = SocketIO(app, cors_allowed_origins="*")

# Chat message history (optional)
messages = []

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(msg):
    messages.append(msg)
    send(msg, broadcast=True)  # Send to all connected clients

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
