from fastapi import FastAPI, HTTPException

import google.generativeai as genai

from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

import fitz
import re
import os
import requests

from models.InitializeRequest import InitializeRequest
from models.DataExtractRequest import DataExtractRequest
from models.ChatRequest import ChatRequest


from models.ResultsResponse import ResultsResponse
from models.StudentChatbotResponse import StudentChatbotResponse

from core.config import settings



app = FastAPI()
sessions = requests.Session()

os.environ["GOOGLE_API_KEY"] = settings.gemini_api_key
genai.configure(api_key = settings.gemini_api_key)

student_data = {}
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
    input_key="query"
)

template = """
You are a friendly, helpful, and slightly casual student assistant. You can offer to set nicknames and engage in lighthearted conversation, while still being informative.
Use the following conversation and context to answer questions.

{chat_history}

Student's query: {query}
"""

settings.gemini_api_key

prompt = PromptTemplate(
    input_variables=["chat_history", "query"],
    template=template
)

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.5)
chain = LLMChain(llm=llm, prompt=prompt, memory=memory)


@app.post("/extract_data/{username}", response_model = ResultsResponse)
def extract_data_from_pdf(username: str, student: DataExtractRequest):
    pdf_path = student.pdf_path
    try:
        doc = fitz.open(pdf_path)
    except FileNotFoundError:
        raise HTTPException(
            status_code=404,
            detail="PDF file not found",
            headers={"X-Error": "FileNotFound"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to open PDF file: {str(e)}",
            headers={"X-Error": "PDFReadError"},
        )

    text = ""
    for page in doc:
        text += page.get_text()

    if username in text:
        match = re.search(r"Semester\s*:\s*(\d+)", text)
        if match:
            semester = match.group(1)

        pattern = re.compile(
            r'(?P<code>B\w{2,10})\n'
            r'(?P<name>(?:[A-Z][^\n]*\n?)+?)'
            r'(?P<internal>\d{1,3})\n'
            r'(?P<external>\d{1,3})\n'
            r'(?P<total>\d{1,3})\n'
            r'(?P<result>[PFWAX])',
            re.MULTILINE
        )

        results = []
        for match in pattern.finditer(text):
            subject_data = {
                'subject_code': match.group('code').strip(),
                'subject_name': match.group('name').replace('\n', ' ').strip(),
                'internal': int(match.group('internal')),
                'external': int(match.group('external')),
                'total': int(match.group('total')),
                'result': match.group('result')
            }
            results.append(subject_data)

        return {"semester": semester, "results": results}
    else:
        raise HTTPException(
            status_code=401,
            detail="Invalid Student Username",
            headers={"X-Error": "AuthorizationFailed"},
        )
    
@app.get("/config_key")
def config_key():
    genai.configure(api_key = settings.gemini_api_key)
    return settings.gemini_api_key
    

def get_student_data(username):
    data = requests.get(f"http://localhost:3000/api/PythonScripts/studentResultsById/{username}")
    student_data = data.json()['data']
    return student_data

@app.get("/initialize_chatbot/{username}")
def initialize_student_chatbot(username: str):
    student_data = get_student_data(username)
    if(len(student_data['overall_results']) == 0): return {"message":"Cannot Initialize Chatbot. Update your attendance and results first"}
    initial_context = f"""
    You are a friendly, helpful, and slightly casual student assistant.
    
    Student Information:
    - Name: {student_data['name']}
    - Overall Academic Result: {student_data['overall_results']}

    Academic Performance Calculation Guidelines:
    - SGPA (Semester Grade Point Average) is calculated on a semester-by-semester basis.
    - CGPA (Cumulative Grade Point Average) is calculated for all subjects across all semesters.
    - Grade Point for each subject is calculated as: (Total Marks for that subject / 10) and then floor the value + 1. However, if (Total Marks for that subject / 10) results in exactly 10, the Grade Point is 10.
    - Formula for SGPA: (Sum of (Credits for a Subject X Grade Points for that Subject)) / Total Credits for that Semester.
    - Formula for CGPA: (Sum of all semesters (SGPA for that Semester X Total Credits in that Semester)) / Overall Credits of all Semesters.

    General Knowledge & Current Affairs:
    I can also provide you with information on a wide range of topics, including current affairs from around the world. Feel free to ask me about recent events, general knowledge, or anything else you're curious about!
    """
    memory.clear()
    memory.chat_memory.add_user_message("Student data for chatbot context:")
    memory.chat_memory.add_ai_message(initial_context)

    return {"message":"Chatbot initialized successfully"}

@app.post("/student_chatbot", response_model = StudentChatbotResponse, response_model_exclude_none=True)
def student_chatbot(chat : ChatRequest):
    try:
        response = chain.run(chat.query)
        return {"response":response, "message":"Response Obtained Successfully"}
    except Exception as e:
        return {"error": str(e), "message": "Error Occured"}