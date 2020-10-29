from time import time
from flask_api import FlaskAPI
from flask import request, jsonify
from response_handler import Chatbot

start = time()
app = FlaskAPI(__name__)

@app.route("/", methods=["POST"])
def response():
    text = Chatbot.generate(str(request.data.get('text', '')))
    end = time()

    return jsonify({
        "response_start": start,
        "response_end": end,
        "response_text": text
    })

if __name__ == "__main__":
    app.run()