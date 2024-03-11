from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
import models, schemas
import database

router = APIRouter(
    prefix="/baiLamBaiTap",
    tags=['baiLamBaiTap']
)


@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.BaiLamBaiTap)
async def create(schema_object: schemas.BaiLamBaiTapCreate,db: Session = Depends(database.get_db)):
    ma_baiTap = str(schema_object.ma_baiTap)
    ma_taiKhoan = str(schema_object.ma_taiKhoan)
    # check ma_baiTap
    db_object_check = db.query(models.BaiTap).filter(models.BaiTap.ma_baiTap == ma_baiTap).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_baiTap not found")
   
    # check ma_taiKhoan
    db_object_check = db.query(models.TaiKhoan).filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")
    
    db_object = models.BaiLamBaiTap(**schema_object.dict())
    db_object.ma_baiTap = ma_baiTap
    db_object.ma_taiKhoan = ma_taiKhoan
    
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.BaiLamBaiTap]  ,status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.BaiLamBaiTap).all()
    return db_object


@router.get("/baiTap/{ma_baiTap}",response_model=list[schemas.BaiLamBaiTap],status_code=status.HTTP_200_OK)
async def read(ma_baiTap: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.BaiLamBaiTap).filter(models.BaiLamBaiTap.ma_baiTap == ma_baiTap).all()
    if not db_object:
        raise HTTPException(status_code=400, detail="ma_baiTap not found")
    return db_object

@router.get("/taiKhoan/{ma_taiKhoan}",response_model=list[schemas.BaiLamBaiTap],status_code=status.HTTP_200_OK)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.BaiLamBaiTap).filter(models.BaiLamBaiTap.ma_taiKhoan == ma_taiKhoan).all()
    if not db_object:
        raise HTTPException(status_code=400, detail="TaiKhoan not found")
    return db_object