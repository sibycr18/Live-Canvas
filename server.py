from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

# List to store the drawing actions
canvas_data = []

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('draw')
def handle_draw(data):
    # Store the draw event data
    canvas_data.append(data)
    emit('draw', data, broadcast=True)

@socketio.on('clearCanvas')
def handle_clear_canvas():
    global canvas_data
    # Clear the stored canvas data
    canvas_data = []
    emit('clearCanvas', broadcast=True)

@socketio.on('connect')
def handle_connect():
    # Send the existing canvas data to the newly connected client
    for data in canvas_data:
        emit('draw', data)

if __name__ == '__main__':
    socketio.run(app, port=8001, debug=True)
