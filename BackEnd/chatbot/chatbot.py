import mysql.connector
from openai import OpenAI
from dotenv import load_dotenv
import os


class GptAPI():
    def __init__(self, model, client, db_config):
        self.messages = []
        self.model = model
        self.client = client
        self.db_config = db_config

    def get_message(self, prompt):
        self.messages.append({"role": "user", "content": prompt})

        # 데이터베이스에서 응답 검색
        response = self.search_database(prompt)
        if response:
            print(response)
            self.messages.append({"role": "system", "content": response})
            return

        stream = self.client.chat.completions.create(
            model=self.model,
            messages=self.messages,
            stream=True,
        )

        result = ''
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                string = chunk.choices[0].delta.content
                print(string, end="")
                result = ''.join([result, string])

        self.messages.append({"role": "system", "content": result})

        # 응답을 데이터베이스에 저장
        self.save_to_database(prompt, result)

    def search_database(self, prompt):
        conn = mysql.connector.connect(**self.db_config)
        cursor = conn.cursor()
        query = "SELECT bot_response FROM conversations WHERE user_input = %s"
        cursor.execute(query, (prompt,))
        row = cursor.fetchone()
        conn.close()
        if row:
            return row[0]
        return None

    def save_to_database(self, user_input, bot_response):
        conn = mysql.connector.connect(**self.db_config)
        cursor = conn.cursor()
        query = "INSERT INTO conversations (user_input, bot_response) VALUES (%s, %s)"
        cursor.execute(query, (user_input, bot_response))
        conn.commit()
        conn.close()


# 환경 변수에서 API 키 로드
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
model = "gpt-3.5-turbo"

# MySQL 데이터베이스 설정
db_config = {
    'user': os.getenv("MYSQL_USER"),
    'password': os.getenv("MYSQL_PASSWORD"),
    'host': os.getenv("MYSQL_HOST"),
    'database': os.getenv("MYSQL_DATABASE"),
}

client = OpenAI(api_key=api_key)
gpt = GptAPI(model, client, db_config)

# 사용자와 챗봇 간의 대화
while True:
    prompt = input("사용자: ")
    if prompt.lower() in ["exit", "quit", "종료"]:
        print("대화를 종료합니다.")
        break
    gpt.get_message(prompt)
    print()

# mysql.connector.errors.ProgrammingError: 1146 (42S02): Table 'law.conversations' doesn't exist
# 오류 해결 필요