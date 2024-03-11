from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError
import models, schemas
import database

router = APIRouter(
    prefix="/deKiemTra",
    tags=['deKiemTra']
)


@router.post("/{ma_chuong}",status_code=status.HTTP_201_CREATED,response_model=schemas.DeKiemTra)
async def create(schema_object: schemas.DeKiemTraCreate,ma_chuong: str, db: Session = Depends(database.get_db)):
    # check ma_chuong exist
    db_object_check = db.query(models.Chuong).filter(models.Chuong.ma_chuong == ma_chuong).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")
    
    db_object = models.DeKiemTra(**schema_object.dict(), ma_chuong=ma_chuong)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.DeKiemTra],status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.DeKiemTra).all()
    return db_object


@router.get("/{ma_deKiemTra}",status_code=status.HTTP_200_OK)
async def read(ma_deKiemTra: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.DeKiemTra).filter(models.DeKiemTra.ma_deKiemTra == ma_deKiemTra).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="DeKiemTra not found")
    return db_object


@router.get("/chuong/{ma_chuong}",response_model=list[schemas.DeKiemTra],status_code=status.HTTP_200_OK)
async def read(ma_chuong: str, db: Session = Depends(database.get_db)):
    # check ma_chuong exist
    db_object_check = db.query(models.Chuong).filter(models.Chuong.ma_chuong == ma_chuong).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")
    
    db_object = db.query(models.DeKiemTra).filter(models.DeKiemTra.ma_chuong == ma_chuong).all()
    return db_object
    