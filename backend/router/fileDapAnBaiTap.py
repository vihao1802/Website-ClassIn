from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy import exists
from sqlalchemy.orm import Session
from email_validator import validate_email, EmailNotValidError
import models, schemas
import database

router = APIRouter(
    prefix="/fileDapAnBaiTap",
    tags=['fileDapAnBaiTap']
)


@router.post("/{ma_dapAnBaiTap}",status_code=status.HTTP_201_CREATED,response_model=schemas.FileDapAnBaiTap)
async def create(schema_object: schemas.FileDapAnBaiTapCreate,ma_dapAnBaiTap: str, db: Session = Depends(database.get_db)):
    # Check ma_dapAnBaiTap exists
    db_object_check = db.query(models.DapAnBaiTap).filter(models.DapAnBaiTap.ma_dapAnBaiTap == ma_dapAnBaiTap).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_dapAnBaiTap not found")
    
    db_object = models.FileDapAnBaiTap(**schema_object.dict(), ma_dapAnBaiTap=ma_dapAnBaiTap)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object

@router.get("/",response_model=list[schemas.FileDapAnBaiTap],status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.FileDapAnBaiTap).all()
    return db_object


@router.get("/{ma_dapAnBaiTap}",status_code=status.HTTP_200_OK)
async def read(ma_dapAnBaiTap: str, db: Session = Depends(database.get_db)):
    # Check ma_dapAnBaiTap exists
    db_object_check = db.query(models.DapAnBaiTap).filter(models.DapAnBaiTap.ma_dapAnBaiTap == ma_dapAnBaiTap).first()
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_dapAnBaiTap not found")
    
    db_object = db.query(models.FileDapAnBaiTap).filter(models.FileDapAnBaiTap.ma_dapAnBaiTap == ma_dapAnBaiTap).all()

    return db_object
