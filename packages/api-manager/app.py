from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import threading
from todos import app as todos_app
from conferences import app as conferences_app

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def run_todos_server():
    todos_app.run(port=5000)

def run_conferences_server():
    conferences_app.run(port=5001)

@app.route('/')
def index():
    return "Welcome to the main server!"

if __name__ == '__main__':
    todos_thread = threading.Thread(target=run_todos_server)
    conferences_thread = threading.Thread(target=run_conferences_server)

    todos_thread.start()
    conferences_thread.start()

    todos_thread.join()
    conferences_thread.join()
