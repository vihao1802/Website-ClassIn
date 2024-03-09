from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
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
    try:
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
    except Exception as e:
        print("An error occurred:", e)


@router.get("/",response_model=list[schemas.LopHoc]  ,status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.LopHoc).offset(0).limit(100).all()
    return db_object


@router.get("/{id}",status_code=status.HTTP_200_OK)
async def read(id: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.LopHoc).filter(models.LopHoc.ma_lopHoc == id).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="LopHoc not found")
    return db_object
