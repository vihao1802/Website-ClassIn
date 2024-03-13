from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError
import models, schemas
import database


router = APIRouter(
    prefix="/lopHoc",
    tags=['lopHoc']
)

@router.post("/{ma_giangVien}",status_code=status.HTTP_201_CREATED,response_model=schemas.LopHoc)
async def create(schema_object: schemas.LopHocCreate,ma_giangVien: str, db: Session = Depends(database.get_db)):
    # Validate the email field
    if schema_object.ten.strip() == "":    
        raise HTTPException(status_code=400, detail="Invalid ten")

    # check ma_giangVien
    db_object_check = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_giangVien).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_giangVien not found")
    
    db_object = models.LopHoc(**schema_object.dict(), ma_taiKhoan=ma_giangVien)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get("/",response_model=list[schemas.LopHoc]  ,status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.LopHoc).all()
    return db_object

@router.get("/taiKhoan/{ma_taiKhoan}",response_model=list[schemas.LopHoc],status_code=status.HTTP_200_OK)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    # check ma_taiKhoan exists
    db_object = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")
    
    db_object = db.query(models.LopHoc).filter(models.LopHoc.ma_taiKhoan == ma_taiKhoan).all()
    return db_object

@router.get("/lopHoc/{ma_lopHoc}",status_code=status.HTTP_200_OK)
async def read(ma_lopHoc: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.LopHoc).filter(models.LopHoc.ma_lopHoc == ma_lopHoc).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="LopHoc not found")
    return db_object
