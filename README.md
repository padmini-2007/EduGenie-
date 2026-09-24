# 🧠 EduGenie - AI-Powered Educational Assistant

EduGenie is a modular system designed to provide personalized academic support for students by integrating a React frontend, Node.js backend, LangChain-based Python scripts, and Google Gemini LLM.

---

## 📁 Project Structure

├── BackEnd   
├── FrontEnd  
├── LangChain  
└── PythonScripts   

#### Node.js backend to connect frontend with APIs and Python scripts.
#### Frontend (React-based, not detailed here).  
#### Jupyter notebooks to test Python scripts (LangChain + Gemini).  
#### Finalized Python scripts hosted via FastAPI. 

## Create .env file under each folder
1. Add MONGODB_URL, SERV_PORT, JWT_SECRET in .env file under BackEnd folder
2. Add GEMINI_API_KEY in .env file under LangChain folder
3. Add GEMINI_API_KEY in .env file under PythonScripts folder

---

## ⚙️ Backend Setup (Node.js)
Developed using **Node.js**, **Express.js**, and **MongoDB** for a RESTful API structure.  
Implements secure authentication and scalable database integration.

1. Navigate to the `BackEnd` folder:

```bash
cd BackEnd
```

2. Install the required dependencies:
```bash
npm install
```

3. Setup nodemon:
```bash
npm install -g nodemon
```

4. Launch Node.js BackEnd:
```bash
nodemon index.js
```

## 🖥️ Frontend Setup (React.js)
Built using **React.js** with **Tailwind CSS** for styling and **Vite** as the build tool.

1. Navigate to the `FrontEnd` folder:
```bash
cd FrontEnd
```

2. Install the required dependencies:
```bash
npm install
```

3. Lauch React.js FrontEnd:
```bash
npm run dev
```

## 🔬 LangChain + Jupyter Lab Environment Setup

This setup allows you to develop and test LangChain-based Python scripts using Gemini.

1. Navigate to the LangChain folder:
```bash
cd LangChain
```

2. Create a new Conda environment:
```bash
conda create --prefix ./EduGenie.env python=3.10
```

3. Activate the environment:
```bash
conda activate ./EduGenie.env
```

4. Install JupyterLab:
```bash
conda install jupyterlab
```

5. Install required Python packages:
```bash
pip install PyMuPDF langchain langchain-google-genai google-generativeai langchain-community python-dotenv
```

6. Launch JupyterLab:
```bash
jupyter lab
```

## 🚀 PythonScripts (FastAPI Backend)

The PythonScripts folder contains finalized Python APIs.
These are designed to be hosted using FastAPI for production usage.

1. Navigate to PythonScripts folder:
 ```bash
cd PythonScripts
```

2. Create virtual environment:
 ```bash
python -m venv env
```

4. Activate the environment:
 ```bash
./env/Scripts/activate
```

5. Install required Python packages:
```bash
pip install uvicorn fastapi PyMuPDF langchain langchain-google-genai google-generativeai langchain-community python-dotenv
```

6. Lauch FastAPI Backend:
```bash
uvicorn main:app --reload
```
