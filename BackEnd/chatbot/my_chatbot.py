import mysql.connector
import openai
from dotenv import load_dotenv
import os
import requests
import xml.etree.ElementTree as ET

class GptAPI():
    def __init__(self, model, api_key, db_config, legal_api_key):
        self.messages = [{"role": "system", "content": "You are an AI assistant that provides legal advice based on labor laws."}]
        self.model = model
        self.api_key = api_key
        self.db_config = db_config
        self.legal_api_key = legal_api_key

    def get_message(self, prompt):
        self.messages.append({"role": "user", "content": prompt})

        # prompt에서 분류 필요(헌법, 노동법, 판례 등)
        category = self.classify_prompt(prompt)

        # 분류 후 국가 법령정보 API 호출
        if category:
            response = self.search_legal_info(category, prompt)
            if response:
                self.messages.append({"role" : "system", "content" : response})
                return response

        # 데이터베이스에서 응답 검색
        response = self.search_database(prompt)
        if response:
            self.messages.append({"role": "system", "content": response})
            return response

        openai.api_key = self.api_key
        response = openai.chat.completions.create(
            model=self.model,
            messages=self.messages
        )
        #stream = self.client.chat.completions.create(
        #    model=self.model,
        #    messages=self.messages
        #)

        result = response.choices[0].message.content    # 오류 수정 완
        self.messages.append({"role": "assistant", "content": result})

        # 응답을 데이터베이스에 저장
        self.save_to_database(prompt, result)
        return result

    def classify_prompt(self, prompt):
        # 분류 로직 구현(구체화 필요)
        if "헌법" in prompt:
            return "law"
        elif "노동법" in prompt or "근로기준법" in prompt:
            return "노동법"
        elif "판례" in prompt:
            return "prec"
        else:
            return None

    # 법령정보 호출 API
    def search_legal_info(self, category, prompt):
        url = "http://www.law.go.kr/DRF/lawService.do"
        params = {
            "OC" : self.legal_api_key,
            "target" : category,
            "query" : prompt,
            "type" : "xml"
        }
        response = requests.get(url, params=params)
        # 서버 응답 상태 코드 확인
        if response.status_code == 200:
            try:
                data = ET.fromstring(response.content)

                # API 응답 데이터에서 적절한 정보를 추출하여 반환
                # 구체화 필요( 수정 )
                if data and "result" in data:
                    return data["result"][0].get("법령명한글", "관련 정보를 찾을 수 없습니다.")
                else:
                    return "관련 정보를 찾을 수 없습니다."
            except ET.ParseError:
                return "서버로부터 유효한 JSON 응답을 받지 못했습니다."
        else:
            return f"API 요청이 실패했습니다. 상태 코드: {response.status_code}"

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

        response = gpt.get_message(prompt)
        print(f"챗봇: {response}")