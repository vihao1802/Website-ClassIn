from fastapi import FastAPI,APIRouter
from collections import defaultdict
import os
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from dotenv import load_dotenv
from router.router1 import router1
from router.router2 import router2
import uvicorn

app = FastAPI()
main_route = APIRouter()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
main_route.include_router(router1,prefix="/api1")
main_route.include_router(router2,prefix="/api2")

app.include_router(main_route,prefix="/api")
@app.get("/")
async def hello():
    return {"message": "Hello world"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)