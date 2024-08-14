import sys
import os
from flask import Blueprint, render_template, request, jsonify, send_from_directory, make_response, current_app
from flask_cors import CORS
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# my_chatbot 모듈 경로 추가
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../chatbot')))
from my_chatbot import gpt  # my_chatbot.py에서 gpt를 가져옴

bp = Blueprint('main', __name__)
CORS(bp)

@bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@bp.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        current_app.logger.error('No input provided')
        return make_response(jsonify({"error": "No input provided"}), 400)

    try:
        response = gpt.get_message(user_input)
        current_app.logger.info(f'Received response: {response}')
        return make_response(jsonify({"response": response}), 200)
    except Exception as e:
        current_app.logger.error(f'Error in /api/chat: {str(e)}')
        return make_response(jsonify({"error": str(e)}), 500)

@bp.route('/manifest.json', methods=['GET'])
def manifest():
    return send_from_directory('frontend/build', 'manifest.json')

@bp.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    if path.startswith('static/'):
        return send_from_directory('frontend/build', path)
    return send_from_directory('frontend/build', 'index.html')
