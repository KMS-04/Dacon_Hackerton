import mysql.connector
import openai
from dotenv import load_dotenv
import os
import requests
import xml.etree.ElementTree as ET

class GptAPI:
    def __init__(self, model, api_key, db_config, legal_api_key):
        self.messages = [{"role": "system", "content": "You are an AI assistant that provides legal advice based on labor laws."}]
        self.model = model
        self.api_key = api_key
        self.db_config = db_config
        self.legal_api_key = legal_api_key
        openai.api_key = self.api_key  # API 키를 초기화에서 설정

    def get_message(self, prompt):
        response = openai.ChatCompletion.create(
            model=self.model,
            messages=self.messages + [{"role": "user", "content": prompt}]
        )
        return response['choices'][0]['message']['content']

    def get_law_info(self, keyword):
        params = {
            'OC': self.legal_api_key,
            'target': 'law',
            'query': keyword,
            'type': 'xml'
        }
        response = requests.get(legal_url, params=params)
        if response.status_code == 200:
            try:
                content = response.content.decode('utf-8')
                print(content)
                root = ET.fromstring(content)
                law_names = []

                for law in root.findall(".//키워드"):
                    law_names.append(law.text)

                if law_names:
                    return law_names[0]
            except ET.ParseError as e:
                print(f"XML 파싱 에러: {e}")
                return None
        else:
            return None

    def chatbot_response(self, prompt):
        gpt_response = self.get_message(prompt)

        # 추후 수정 가능
        keyword = "근로기준법"

        law_name = self.get_law_info(keyword)

        if law_name:
            return f"{gpt_response}\n\n관련 법률: {law_name}"

        return f"{gpt_response}\n\n관련 법률 정보를 찾을 수 없습니다."

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

legal_api_key = os.getenv("LEGAL_API_KEY")
legal_url = 'http://www.law.go.kr/DRF/lawService.do'

# MySQL 데이터베이스 설정
db_config = {
    'user': os.getenv("MYSQL_USER"),
    'password': os.getenv("MYSQL_PASSWORD"),
    'host': os.getenv("MYSQL_HOST"),
    'database': os.getenv("MYSQL_DATABASE"),
}

gpt = GptAPI(model, api_key, db_config, legal_api_key)

if __name__ == "__main__":
    while True:
        prompt = input("사용자: ")
        if prompt.lower() == "exit":
            print("챗봇을 종료합니다.")
            break

        response = gpt.chatbot_response(prompt)
        print(f"챗봇: {response}")
