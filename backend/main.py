from fastapi import FastAPI,APIRouter,Depends,status,HTTPException
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from router import router1,router2,nhomQuyen,taiKhoan,lopHoc
from sqlalchemy.orm import Session
from database import engine, get_db
import schemas, models, uvicorn, load_env_global

models.Base.metadata.create_all(bind=engine)
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
main_route.include_router(nhomQuyen.router)
main_route.include_router(taiKhoan.router)
main_route.include_router(lopHoc.router)

app.include_router(main_route,prefix="/api")
@app.get("/")
async def hello():
    return {"message": "Hello world"}

print("Notice:\t Server is running at http://localhost:" + load_env_global.get_PORT() + "/docs")
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=load_env_global.get_PORT(), reload=True)
