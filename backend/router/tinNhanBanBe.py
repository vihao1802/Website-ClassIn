from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
import models, schemas
import database

router = APIRouter(
    prefix="/tinNhanBanBe",
    tags=['tinNhanBanBe']
)


@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.TinNhanBanBe)
async def create(schema_object: schemas.TinNhanBanBeCreate,db: Session = Depends(database.get_db)):
    ma_banBe = str(schema_object.ma_banBe)
    ma_nguoiGui = str(schema_object.ma_nguoiGui)
    ma_nguoiNhan = str(schema_object.ma_nguoiNhan)

    # check ma_banBe exists
    db_object_check = db.query(models.BanBe).filter(models.BanBe.ma_banBe == ma_banBe).first() 
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_banBe not found")
    # check ma_nguoiNguoiGui exists
    db_object_check = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_nguoiGui).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_nguoiNguoiGui not found")
    # check ma_nguoiNguoiNhan exists
    db_object_check = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_nguoiNhan).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_nguoiNguoiNhan not found")

    db_object = models.TinNhanBanBe(**schema_object.dict())
    db_object.ma_banBe = ma_banBe
    db_object.ma_nguoiGui = ma_nguoiGui
    db_object.ma_nguoiNhan = ma_nguoiNhan
    
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.TinNhanBanBe]  ,status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.TinNhanBanBe).all()
    return db_object


@router.get("/banBe/{ma_banBe}",response_model=list[schemas.TinNhanBanBe],status_code=status.HTTP_200_OK)
async def read(ma_banBe: str, db: Session = Depends(database.get_db)):
    # check ma_banBe exists
    db_object_check = db.query(models.BanBe).filter(models.BanBe.ma_banBe == ma_banBe).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_banBe not found")
    
    db_object = db.query(models.TinNhanBanBe).filter(models.TinNhanBanBe.ma_banBe == ma_banBe).all()
    return db_object
