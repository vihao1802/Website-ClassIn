from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List, Optional

import models, schemas
import database

router = APIRouter(
    prefix="/nhomQuyen",
    tags=['nhomQuyen']
)

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=schemas.NhomQuyen)
def create(schema_object: schemas.NhomQuyenCreate, db: Session = Depends(database.get_db)):
    db_object = models.NhomQuyen(**schema_object.dict())
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get("/",response_model=list[schemas.NhomQuyen]  ,status_code=status.HTTP_200_OK)
async def read( db: Session = Depends(database.get_db)):
    db_object = db.query(models.NhomQuyen).offset(0).limit(100).all()
    return db_object


@router.get("/{id}",status_code=status.HTTP_200_OK)
async def read(id: str, db: Session = Depends(database.get_db)):
    db_object = db.query(models.NhomQuyen).filter(models.NhomQuyen.ma_nhomQuyen == id).first()
    if db_object is None:
        raise HTTPException(status_code=400, detail="NhomQuyen not found")
    return db_object
