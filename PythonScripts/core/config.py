import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    def __init__(self):
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")

settings = Settings()