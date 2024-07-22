import pandas as pd

# CSV 파일 읽기
csv_file_path = 'chatbot\헌법.csv'
df = pd.read_csv(csv_file_path)

# 첫 몇 줄을 출력하여 구조 확인
df.head()
