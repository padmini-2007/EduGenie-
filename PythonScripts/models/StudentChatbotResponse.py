from pydantic import BaseModel
from typing import Optional

class StudentChatbotResponse(BaseModel):
    response : Optional[str] = None
    error : Optional[str] = None
    message: Optional[str] = None