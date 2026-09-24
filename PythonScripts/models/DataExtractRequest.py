from pydantic import BaseModel

class DataExtractRequest(BaseModel):
    pdf_path: str