import mysql.connector
from dotenv import load_dotenv
import os

# 환경 변수에서 MySQL 설정 로드
load_dotenv()

# MySQL 연결 설정
connection = mysql.connector.connect(
    host=os.getenv('MYSQL_HOST'),
    user=os.getenv('MYSQL_USER'),
    password=os.getenv('MYSQL_PASSWORD'),
    database=os.getenv('MYSQL_DATABASE')
)

cursor = connection.cursor()

# conversations 테이블 생성
cursor.execute("""
CREATE TABLE IF NOT EXISTS conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_input TEXT,
    bot_response TEXT
)
""")

connection.commit()

# 연결 종료
cursor.close()
connection.close()

print("conversations 테이블이 성공적으로 생성되었습니다.")
