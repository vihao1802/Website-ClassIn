import database
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import (
    APIRouter,
    Depends,
    FastAPI,
    File,
    HTTPException,
    Response,
    UploadFile,
    status,
)
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/fileBaiLamBaiTap", tags=["fileBaiLamBaiTap"])


@router.post(
    "/{ma_baiLamBaiTap}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.FileBaiLamBaiTap,
)
async def create(
    schema_object: schemas.FileBaiLamBaiTapCreate,
    ma_baiLamBaiTap: str,
    db: Session = Depends(database.get_db),
):
    # Check ma_baiLamBaiTap exists
    db_object_check = (
        db.query(models.BaiLamBaiTap)
        .filter(models.BaiLamBaiTap.ma_baiLamBaiTap == ma_baiLamBaiTap)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_baiLamBaiTap not found")

    db_object = models.FileBaiLamBaiTap(
        **schema_object.dict(), ma_baiLamBaiTap=ma_baiLamBaiTap
    )
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=list[schemas.FileBaiLamBaiTap],
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.FileBaiLamBaiTap).all()
    return db_object


@router.get(
    "/{ma_baiLamBaiTap}",
    response_model=list[schemas.FileBaiLamBaiTap],
    status_code=status.HTTP_200_OK,
)
async def read(ma_baiLamBaiTap: str, db: Session = Depends(database.get_db)):
    # Check ma_baiLamBaiTap exists
    db_object_check = (
        db.query(models.BaiLamBaiTap)
        .filter(models.BaiLamBaiTap.ma_baiLamBaiTap == ma_baiLamBaiTap)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_baiLamBaiTap not found")

    db_object = (
        db.query(models.FileBaiLamBaiTap)
        .filter(models.FileBaiLamBaiTap.ma_baiLamBaiTap == ma_baiLamBaiTap)
        .all()
    )

    return db_object


@router.delete("/{ma_Bailambaitap}", status_code=status.HTTP_200_OK)
async def delete(ma_Bailambaitap: str, db: Session = Depends(database.get_db)):
    db_object_list = (
        db.query(models.FileBaiLamBaiTap)
        .filter(models.FileBaiLamBaiTap.ma_baiLamBaiTap == ma_Bailambaitap)
        .all()
    )
    if db_object_list is None:
        raise HTTPException(status_code=400, detail="Ma bailambaitap not found")
    for db_object in db_object_list:
        db.delete(db_object)
    db.commit()
    return {"detail": "Delete successfully"}
