from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
import models, schemas
import database

router = APIRouter(
    prefix="/thamGiaLopHoc",
    tags=['thamGiaLopHoc']
)


@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.ThamGiaLopHoc)
async def create(schema_object: schemas.ThamGiaLopHocCreate,db: Session = Depends(database.get_db)):
    ma_lopHoc = str(schema_object.ma_lopHoc)
    ma_taiKhoan = str(schema_object.ma_taiKhoan)
    # check ma_lopHoc
    db_object_check = db.query(models.LopHoc).filter(models.LopHoc.ma_lopHoc == ma_lopHoc).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_lopHoc not found")
    
    # check ma_taiKhoan
    db_object_check = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")
    
    db_object = models.ThamGiaLopHoc(**schema_object.dict())
    db_object.ma_lopHoc = ma_lopHoc
    db_object.ma_taiKhoan = ma_taiKhoan
    
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.ThamGiaLopHoc]  ,status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.ThamGiaLopHoc).all()
    return db_object


@router.get("/lopHoc/{ma_lopHoc}",response_model=list[schemas.ThamGiaLopHoc],status_code=status.HTTP_200_OK)
async def read(ma_lopHoc: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.ThamGiaLopHoc).filter(models.ThamGiaLopHoc.ma_lopHoc == ma_lopHoc).all()
    if not db_object:
        raise HTTPException(status_code=400, detail="LopHoc not found")
    return db_object

@router.get("/taiKhoan/{ma_taiKhoan}",response_model=list[schemas.ThamGiaLopHoc],status_code=status.HTTP_200_OK)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.ThamGiaLopHoc).filter(models.ThamGiaLopHoc.ma_taiKhoan == ma_taiKhoan).all()
    if not db_object:
        raise HTTPException(status_code=400, detail="TaiKhoan not found")
    return db_object