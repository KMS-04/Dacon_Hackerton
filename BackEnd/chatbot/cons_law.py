import mysql.connector
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()

# CSV 파일 읽기
file_path = './헌법.csv'

# 파일 읽기, delimiter가 '/'인 경우 지정
data = pd.read_csv(file_path, delimiter='/', encoding='utf-8')

# 데이터 열 이름 변경
data.columns = ['조항 번호', '조항 내용']

# MySQL 연결 설정
connection = mysql.connector.connect(
    host = os.getenv('MYSQL_HOST'),
    user = os.getenv('MYSQL_USER'),
    password = os.getenv('MYSQL_PASSWORD'),
    database = os.getenv('MYSQL_DATABASE')
)

cursor = connection.cursor()

# 테이블 생성
cursor.execute("""
CREATE TABLE IF NOT EXISTS 헌법 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    조항_번호 VARCHAR(50),
    조항_내용 TEXT
)
""")

# CSV 파일 데이터를 MySQL 테이블에 삽입
for index, row in data.iterrows():
    sql = "INSERT INTO 헌법 (조항_번호, 조항_내용) VALUES (%s, %s)"
    cursor.execute(sql, (row['조항 번호'], row['조항 내용']))

connection.commit()

# 연결 종료
cursor.close()
connection.close()
