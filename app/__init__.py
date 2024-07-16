from flask import Flask, request, render_template

def create_app():
    app = Flask(__name__)

    # 블루 프린트 등록
    from .views import main_views
    app.register_blueprint(main_views.bp)
    
    return app

