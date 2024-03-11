from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError
import models, schemas
import database

router = APIRouter(
    prefix="/baiTap",
    tags=['baiTap']
)


@router.post("/{ma_chuong}",status_code=status.HTTP_201_CREATED,response_model=schemas.BaiTap)
async def create(schema_object: schemas.BaiTapCreate,ma_chuong: str, db: Session = Depends(database.get_db)):
    # Check ma_chuong exists
    db_object_check = db.query(models.Chuong).filter(models.Chuong.ma_chuong == ma_chuong).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")

    db_object = models.BaiTap(**schema_object.dict(), ma_chuong=ma_chuong)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.BaiTap],status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.BaiTap).all()
    return db_object


@router.get("/{ma_chuong}",status_code=status.HTTP_200_OK)
async def read(ma_chuong: str, db: Session = Depends(database.get_db)):
    # Check ma_chuong exists
    db_object_check = db.query(models.Chuong).filter(models.Chuong.ma_chuong == ma_chuong).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")

    db_object = db.query(models.BaiTap).filter(models.BaiTap.ma_chuong == ma_chuong).all()

    return db_object
