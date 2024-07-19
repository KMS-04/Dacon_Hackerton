from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

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
        
model = "gpt-4-turbo"

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

gpt = GptAPI(model, client)