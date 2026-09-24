from pydantic import BaseModel

class InitializeRequest(BaseModel):
    username: str