import database
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/fileBaiTap", tags=["fileBaiTap"])


@router.post(
    "/{ma_baiTap}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.FileBaiTap,
)
async def create(
    schema_object: schemas.FileBaiTapCreate,
    ma_baiTap: str,
    db: Session = Depends(database.get_db),
):
    # Check ma_baiTap exists
    db_object_check = (
        db.query(models.BaiTap)
        .filter(models.BaiTap.ma_baiTap == ma_baiTap)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_baiTap not found")

    db_object = models.FileBaiTap(**schema_object.dict(), ma_baiTap=ma_baiTap)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get("/", status_code=status.HTTP_200_OK)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.FileBaiTap).all()
    return db_object


@router.get("/{ma_baiTap}", status_code=status.HTTP_200_OK)
async def read(ma_baiTap: str, db: Session = Depends(database.get_db)):
    # Check ma_baiTap exists
    db_object_check = (
        db.query(models.BaiTap)
        .filter(models.BaiTap.ma_baiTap == ma_baiTap)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_baiTap not found")

    db_object = (
        db.query(models.FileBaiTap)
        .filter(models.FileBaiTap.ma_baiTap == ma_baiTap)
        .all()
    )
    return db_object


@router.delete("/{ma_baiTap}", status_code=status.HTTP_200_OK)
async def delete_file_by_homework_id(
    ma_baiTap: str, db: Session = Depends(database.get_db)
):
    db_object_list = (
        db.query(models.FileBaiTap)
        .filter(models.FileBaiTap.ma_baiTap == ma_baiTap)
        .all()
    )
    if db_object_list is None:
        raise HTTPException(status_code=400, detail="Ma bailambaitap not found")
    for db_object in db_object_list:
        db.delete(db_object)
    db.commit()
    return {"detail": "Delete successfully"}
