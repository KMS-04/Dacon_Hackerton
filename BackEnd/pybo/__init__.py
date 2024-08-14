from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from dotenv import load_dotenv
import os

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

    return app
