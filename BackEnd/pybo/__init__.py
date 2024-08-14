from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from dotenv import load_dotenv
import os
import logging
from logging.handlers import RotatingFileHandler

# .env 파일 로드
load_dotenv(dotenv_path='C:/projects/myproject/BackEnd/.env')

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__,
                static_folder=os.path.abspath('../FrontEnd/build/static'),  # 정적 파일 경로
                template_folder=os.path.abspath('../FrontEnd/build'))  # 템플릿 파일 경로
    
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from .views import main_views
    app.register_blueprint(main_views.bp)

    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    @app.route('/static/<path:filename>')
    def serve_static_files(filename):
        return send_from_directory(app.static_folder, filename)

    # 로그 설정
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/pybo.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('Pybo startup')

    return app
