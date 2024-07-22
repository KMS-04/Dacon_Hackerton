from flask import Blueprint, render_template, request, jsonify, send_from_directory
import openai
import os

bp = Blueprint('main', __name__)

@bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@bp.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an AI assistant that provides legal advice based on labor laws."},
            {"role": "user", "content": user_input}
        ],
        api_key=os.getenv('OPENAI_API_KEY')
    )
    return jsonify(response['choices'][0]['message']['content'])

@bp.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory('frontend/build', path)
