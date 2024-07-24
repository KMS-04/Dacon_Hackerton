import pymysql
import pandas as pd
from dotenv import load_dotenv
import os

# CSV 파일 경로
file_path = './헌법.csv'

load_dotenv()

# MySQL 연결 정보
host = os.getenv('MYSQL_HOST')
user = os.getenv('MYSQL_USER')
password = os.getenv('MYSQL_PASSWORD')
database = os.getenv('MYSQL_DATABASE')

# 데이터베이스 연결
conn = pymysql.connect(host=host, user=user, password=password, database=database)
cursor = conn.cursor()

# 테이블 생성 쿼리
create_table_query = '''
CREATE TABLE IF NOT EXISTS constitution (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clause_number VARCHAR(255),
    clause_content TEXT
)
'''
cursor.execute(create_table_query)

# CSV 파일을 DataFrame으로 읽기
data = pd.read_csv(file_path, delimiter='/')

# 데이터 삽입
insert_query = '''
INSERT INTO constitution (clause_number, clause_content)
VALUES (%s, %s)
'''

for index, row in data.iterrows():
    cursor.execute(insert_query, (row['조항 번호'], row['조항 내용']))

# 변경 사항 커밋
conn.commit()

# 연결 종료
cursor.close()
conn.close()
