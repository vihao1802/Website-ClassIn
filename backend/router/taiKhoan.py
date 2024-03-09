from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
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

    # check ma_nhomQuyen
    db_object_check = db.query(models.NhomQuyen).filter(models.NhomQuyen.ma_nhomQuyen == ma_nhomQuyen).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_nhomQuyen not found")
    
    db_object = models.TaiKhoan(**schema_object.dict(), ma_nhomQuyen=ma_nhomQuyen)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.TaiKhoan]  ,status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.TaiKhoan).offset(0).limit(100).all()
    return db_object


@router.get("/{id}",status_code=status.HTTP_200_OK)
async def read(id: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == id).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="TaiKhoan not found")
    return db_object