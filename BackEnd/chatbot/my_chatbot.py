import mysql.connector
import openai
from dotenv import load_dotenv
import os

class GptAPI():
    def __init__(self, model, api_key, db_config):
        self.messages = [{"role": "system", "content": "You are an AI assistant that provides legal advice based on labor laws."}]
        self.model = model
        self.api_key = api_key
        self.db_config = db_config

    def get_message(self, prompt):
        self.messages.append({"role": "user", "content": prompt})

        # 데이터베이스에서 응답 검색
        response = self.search_database(prompt)
        if response:
            self.messages.append({"role": "system", "content": response})
            return response

        openai.api_key = self.api_key
        response = openai.ChatCompletion.create
        stream = self.client.chat.completions.create(
            model=self.model,
            messages=self.messages
        )

        result = response.choices[0].message['content']
        self.messages.append({"role": "assistant", "content": result})

        # 응답을 데이터베이스에 저장
        self.save_to_database(prompt, result)
        return result

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

gpt = GptAPI(model, api_key, db_config)
