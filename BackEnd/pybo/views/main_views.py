from flask import Blueprint, render_template, request, jsonify, send_from_directory
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

# my_chatbot 모듈 경로 추가
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../chatbot')))
from my_chatbot import gpt  # my_chatbot.py의 gpt 인스턴스를 사용

bp = Blueprint('main', __name__)

@bp.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@bp.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    response = gpt.get_message(user_input)
    return jsonify({"response": response})

@bp.route('/manifest.json', methods=['GET'])
def manifest():
    return send_from_directory('frontend/build', 'manifest.json')

@bp.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    if path.startswith('static/'):
        return send_from_directory('frontend/build', path)
    return send_from_directory('frontend/build', 'index.html')
