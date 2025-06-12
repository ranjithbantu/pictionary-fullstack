from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

WORDS = [
    "car",
    "dog",
    "tree",
    "pizza",
    "boat",
    "butterfly",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/word")
def get_word():
    return {"word": random.choice(WORDS)} 