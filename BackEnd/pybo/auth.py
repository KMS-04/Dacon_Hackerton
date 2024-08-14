# auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from .models import db, User

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email address already exists'}), 400

    if not validate_password(password):
        return jsonify({'error': 'Password must be 8-16 characters long and include both letters and numbers'}), 400

    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 200

def validate_password(password):
    import re
    if len(password) < 8 or len(password) > 16:
        return False
    if not re.search(r'[A-Za-z]', password) or not re.search(r'\d', password):
        return False
    return True
