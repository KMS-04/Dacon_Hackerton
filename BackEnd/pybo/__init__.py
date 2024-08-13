from flask import Flask
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
    app = Flask(__name__, static_folder='frontend/build', template_folder='frontend/build')
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from .views import main_views
    app.register_blueprint(main_views.bp)

    @app.route('/')
    def index():
        return app.send_static_file('image.html')

    return app  
