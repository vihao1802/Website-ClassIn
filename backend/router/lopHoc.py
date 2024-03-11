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

@router.post("/{ma_taiKhoan}",status_code=status.HTTP_201_CREATED,response_model=schemas.LopHoc)
async def create(schema_object: schemas.LopHocCreate,ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    # Validate the email field
    if schema_object.ten.strip() == "":    
        raise HTTPException(status_code=400, detail="Invalid ten")

    # check ma_giangVien
    db_object_check = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")
    
    db_object = models.LopHoc(**schema_object.dict(), ma_taiKhoan=ma_taiKhoan)
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
    taiKhoan_exists = db.query(exists().where(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)).scalar() # return a boolean result

    if not taiKhoan_exists:
        raise HTTPException(status_code=404, detail=f"ma_taiKhoan '{ma_taiKhoan}' not found in taiKhoan")
    
    db_object = db.query(models.LopHoc).filter(models.LopHoc.ma_taiKhoan == ma_taiKhoan).all()
    """ if not db_object:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found") """
    return db_object

@router.get("/lopHoc/{ma_lopHoc}",status_code=status.HTTP_200_OK)
async def read(ma_lopHoc: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.LopHoc).filter(models.LopHoc.ma_lopHoc == ma_lopHoc).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="LopHoc not found")
    return db_object
