from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError
import models, schemas
import database

router = APIRouter(
    prefix="/dapAnBaiTap",
    tags=['dapAnBaiTap']
)


@router.post("/{ma_baiTap}",status_code=status.HTTP_201_CREATED,response_model=schemas.DapAnBaiTap)
async def create(schema_object: schemas.DapAnBaiTapCreate,ma_baiTap: str, db: Session = Depends(database.get_db)):
    # Check ma_baiTap exists
    db_object_check = db.query(models.BaiTap).filter(models.BaiTap.ma_baiTap == ma_baiTap).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_baiTap not found")
    
    db_object = models.DapAnBaiTap(**schema_object.dict(), ma_baiTap=ma_baiTap)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.DapAnBaiTap],status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.DapAnBaiTap).all()
    return db_object


@router.get("/{ma_baiTap}",status_code=status.HTTP_200_OK)
async def read(ma_baiTap: str, db: Session = Depends(database.get_db)):
    # Check ma_baiTap exists
    db_object_check = db.query(models.BaiTap).filter(models.BaiTap.ma_baiTap == ma_baiTap).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_baiTap not found")
    
    db_object = db.query(models.DapAnBaiTap).filter(models.DapAnBaiTap.ma_baiTap == ma_baiTap).all()

    return db_object
