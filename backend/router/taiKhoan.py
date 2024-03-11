from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError
import models, schemas
import database

router = APIRouter(
    prefix="/taiKhoan",
    tags=['taiKhoan']
)


@router.post("/{ma_nhomQuyen}",status_code=status.HTTP_201_CREATED,response_model=schemas.TaiKhoan)
async def create(schema_object: schemas.TaiKhoanCreate,ma_nhomQuyen: str, db: Session = Depends(database.get_db)):
    # Validate the email field
    try:
        validate_email(schema_object.email)
    except EmailNotValidError:
        raise HTTPException(status_code=400, detail="Invalid email address")
    
    # Check duplicated email 
    db_object_check = db.query(models.TaiKhoan).filter(models.TaiKhoan.email == schema_object.email).first()
    if db_object_check:
        raise HTTPException(status_code=400, detail="Email is already exist")

    # check ma_nhomQuyen
    db_object_check = db.query(models.NhomQuyen).filter(models.NhomQuyen.ma_nhomQuyen == ma_nhomQuyen).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_nhomQuyen not found")
    
    db_object = models.TaiKhoan(**schema_object.dict(), ma_nhomQuyen=ma_nhomQuyen)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.TaiKhoan],status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.TaiKhoan).all()
    return db_object


@router.get("/{ma_taiKhoan}",status_code=status.HTTP_200_OK)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="TaiKhoan not found")
    return db_object


@router.get("/nhomQuyen/{ma_nhomQuyen}",response_model=list[schemas.TaiKhoan],status_code=status.HTTP_200_OK)
async def read(ma_nhomQuyen: str, db: Session = Depends(database.get_db)):
    nhomQuyen_exists = db.query(exists().where(models.NhomQuyen.ma_nhomQuyen == ma_nhomQuyen)).scalar()

    if not nhomQuyen_exists:
        raise HTTPException(status_code=404, detail=f"ma_nhomQuyen '{ma_nhomQuyen}' not found in NhomQuyen")

    db_object = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_nhomQuyen == ma_nhomQuyen).first()
    return db_object
"""     if db_object is None:
        raise HTTPException(status_code=400, detail="TaiKhoan not found") """
    