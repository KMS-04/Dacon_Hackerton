from openai import OpenAI
from dotenv import load_dotenv
import os

class GptAPI():
    def __init__(self, model, client):
        self.messages = []
        self.model = model
        self.client = client

    def get_message(self, prompt):
        self.messages.append({"role": "user", "content": prompt})

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
        
api_key = os.getenv("OPENAI_API_KEY")
model = "gpt-3.5-turbo"

client = OpenAI(api_key=api_key)
gpt = GptAPI(model, client)


# 사용자와 챗봇 간의 대화
while True:
    prompt = input("사용자: ")
    if prompt.lower() in ["exit", "quit", "종료"]:
        print("대화를 종료합니다.")
        break
    gpt.get_message(prompt)
    print()  