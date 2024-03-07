from fastapi import FastAPI,APIRouter,Depends,status,HTTPException
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from router.router1 import router1
from router.router2 import router2
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

app.include_router(main_route,prefix="/api")
@app.get("/")
async def hello():
    return {"message": "Hello world"}

@app.post("/author/",status_code=status.HTTP_201_CREATED,response_model=schemas.Author)
def create_author(author: schemas.AuthorCreate, db: Session = Depends(get_db)):
    db_author = models.Author(**author.dict())
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author


@app.get("/author",response_model=list[schemas.Author]  ,status_code=status.HTTP_200_OK)
async def read_author( db: Session = Depends(get_db)):
    author = db.query(models.Author).offset(0).limit(100).all()
    return author


@app.get("/author/{author_id}",status_code=status.HTTP_200_OK)
async def read_author(author_id: str, db: Session = Depends(get_db)):
    author = db.query(models.Author).filter(models.Author.author_id == author_id).first()
    if author is None:
        raise HTTPException(status_code=400, detail="Author not found")
    return author

@app.post("/account/{author_id}/user/",status_code=status.HTTP_201_CREATED,response_model=schemas.Account)
async def create_author(account: schemas.AccountCreate,author_id: str, db: Session = Depends(get_db)):
    db_account = models.Account(**account.dict(), author_id=author_id)
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

print("Notice:\t Server is running at http://localhost:" + load_env_global.get_PORT() + "/docs")
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=load_env_global.get_PORT(), reload=True)
