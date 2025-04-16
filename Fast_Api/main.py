from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Load API key from environment variable
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
MODEL_NAME = "gemini-2.0-flash"

class URLRequest(BaseModel):
    url: str

def extract_text_from_url(url: str) -> str:
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        return soup.get_text(separator=" ", strip=True)[:10000]  
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching URL: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Server Running", "status": "200"}

@app.post("/summarize")
async def summarize(req: URLRequest):
    website_text = extract_text_from_url(req.url)

    try:
        model = genai.GenerativeModel(model_name=MODEL_NAME)
        response = model.generate_content(
            f"Summarize the following webpage text:\n\n{website_text}"
        )
        return {"summary": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")
