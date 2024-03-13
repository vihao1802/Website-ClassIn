from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError
import models, schemas
import database

router = APIRouter(
    prefix="/luuVetBaiLamKiemTra",
    tags=['luuVetBaiLamKiemTra']
)


@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.LuuVetBaiLamKiemTra)
async def create(schema_object: schemas.LuuVetBaiLamKiemTraCreate, db: Session = Depends(database.get_db)):
    ma_deKiemTra = str(schema_object.ma_deKiemTra)
    ma_cauHoi = str(schema_object.ma_cauHoi)
    ma_dapAnChon = str(schema_object.ma_dapAnChon)

    # Validate the email field
    try:
        validate_email(schema_object.email)
    except EmailNotValidError:
        raise HTTPException(status_code=400, detail="Invalid email address")

    # check ma_caHoi exists
    db_object_check = db.query(models.CauHoi).filter(models.CauHoi.ma_cauHoi == ma_cauHoi).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_cauHoi not found")
    
    # check ma_dapAnChon exists
    db_object_check = db.query(models.CauTraLoi).filter(models.CauTraLoi.ma_cauTraLoi == ma_dapAnChon).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_dapAnChon not found")

    # check ma_deKiemTra exists
    db_object_check = db.query(models.DeKiemTra).filter(models.DeKiemTra.ma_deKiemTra == ma_deKiemTra).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_deKiemTra not found")
  
    db_object = models.BaiLamKiemTra(**schema_object.dict())
    db_object.ma_deKiemTra = ma_deKiemTra
    db_object.ma_cauHoi = ma_cauHoi
    db_object.ma_dapAnChon = ma_dapAnChon
    db_object.email = schema_object.email

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.LuuVetBaiLamKiemTra],status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.LuuVetBaiLamKiemTra).all()
    return db_object


@router.get("/{ma_luuVetBaiLamKiemTra}",status_code=status.HTTP_200_OK)
async def read(ma_luuVetBaiLamKiemTra: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.LuuVetBaiLamKiemTra).filter(models.LuuVetBaiLamKiemTra.ma_luuVetBaiLamKiemTra == ma_luuVetBaiLamKiemTra).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="LuuVetBaiLamKiemTra not found")
    return db_object


@router.get("/taiKhoan/{ma_taiKhoan}",response_model=list[schemas.BaiLamKiemTra],status_code=status.HTTP_200_OK)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    # check ma_taiKhoan exist
    db_object_check = db.query(models.BaiLamKiemTra).filter(models.BaiLamKiemTra.ma_taiKhoan == ma_taiKhoan).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")
    
    db_object = db.query(models.BaiLamKiemTra).filter(models.BaiLamKiemTra.ma_taiKhoan == ma_taiKhoan).all()
    return db_object
    