from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
import models, schemas
import database


router = APIRouter(
    prefix="/nhomChat",
    tags=['nhomChat']
)

@router.post("/{ma_lopHoc}",status_code=status.HTTP_201_CREATED,response_model=schemas.NhomChat)
async def create(schema_object: schemas.NhomChatCreate,ma_lopHoc: str, db: Session = Depends(database.get_db)):
    if schema_object.ten.strip() == "":    
        raise HTTPException(status_code=400, detail="Invalid ten")

    # check ma_lopHoc
    db_object_check = db.query(models.LopHoc).filter(models.LopHoc.ma_lopHoc == ma_lopHoc).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_lopHoc not found")
    
    db_object = models.NhomChat(**schema_object.dict(), ma_lopHoc=ma_lopHoc)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get("/",response_model=list[schemas.NhomChat],status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.NhomChat).all()
    return db_object


@router.get("/{ma_nhomChat}",status_code=status.HTTP_200_OK)
async def read(ma_nhomChat: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.NhomChat).filter(models.NhomChat.ma_nhomChat == ma_nhomChat).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="NhomChat not found")
    return db_object
