from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError
import models, schemas
import database

router = APIRouter(
    prefix="/baiLamKiemTra",
    tags=['baiLamKiemTra']
)


@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.BaiLamKiemTra)
async def create(schema_object: schemas.BaiLamKiemTraCreate, db: Session = Depends(database.get_db)):
    ma_deKiemTra = str(schema_object.ma_deKiemTra)
    ma_taiKhoan = str(schema_object.ma_taiKhoan)

    # check ma_deKiemTra exists
    db_object_check = db.query(models.DeKiemTra).filter(models.DeKiemTra.ma_deKiemTra == ma_deKiemTra).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_deKiemTra not found")
    # check ma_taiKhoan exist
    db_object_check = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")
    
    db_object = models.BaiLamKiemTra(**schema_object.dict())
    db_object.ma_deKiemTra = ma_deKiemTra
    db_object.ma_taiKhoan = ma_taiKhoan

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.BaiLamKiemTra],status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.BaiLamKiemTra).all()
    return db_object


@router.get("/{ma_baiLamKiemTra}",status_code=status.HTTP_200_OK)
async def read(ma_baiLamKiemTra: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.BaiLamKiemTra).filter(models.BaiLamKiemTra.ma_baiLamKiemTra == ma_baiLamKiemTra).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="BaiLamKiemTra not found")
    return db_object


@router.get("/taiKhoan/{ma_taiKhoan}",response_model=list[schemas.BaiLamKiemTra],status_code=status.HTTP_200_OK)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    # check ma_taiKhoan exist
    db_object_check = db.query(models.BaiLamKiemTra).filter(models.BaiLamKiemTra.ma_taiKhoan == ma_taiKhoan).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")
    
    db_object = db.query(models.BaiLamKiemTra).filter(models.BaiLamKiemTra.ma_taiKhoan == ma_taiKhoan).all()
    return db_object
    