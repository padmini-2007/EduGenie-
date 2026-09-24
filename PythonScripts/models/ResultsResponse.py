from pydantic import BaseModel

class ResultsResponse(BaseModel):
    semester : str
    results: list