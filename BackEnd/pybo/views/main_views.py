from flask import Blueprint, render_template, request, jsonify, send_from_directory
import openai
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

bp = Blueprint('main', __name__)


@bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@bp.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    openai.api_key = os.getenv('OPENAI_API_KEY')

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an AI assistant that provides legal advice based on labor laws."},
            {"role": "user", "content": user_input}
        ]
    )
    return jsonify(response['choices'][0]['message']['content'])


@bp.route('/manifest.json', methods=['GET'])
def manifest():
    return send_from_directory('frontend/build', 'manifest.json')


@bp.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    if path.startswith('static/'):
        return send_from_directory('frontend/build', path)
    return send_from_directory('frontend/build', 'index.html')
