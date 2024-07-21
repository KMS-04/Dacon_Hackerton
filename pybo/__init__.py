from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__, static_folder='../build/static', template_folder='../build')
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    from pybo.views import main_views
    app.register_blueprint(main_views.bp)

    return app
