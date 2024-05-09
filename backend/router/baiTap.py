import database
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/bai-tap", tags=["BaiTap"])


@router.post(
    "/{ma_chuong}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.BaiTap,
)
async def create_bai_tap(
    schema_object: schemas.BaiTapCreate,
    ma_chuong: str,
    db: Session = Depends(database.get_db),
):
    # Check ma_chuong exists
    db_object_check = (
        db.query(models.Chuong)
        .filter(models.Chuong.ma_chuong == ma_chuong)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")

    db_object = models.BaiTap(**schema_object.dict(), ma_chuong=ma_chuong)

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/{ma_bai_tap}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.BaiTap,
)
async def get_bai_tap_by_id(
    ma_bai_tap: str, db: Session = Depends(database.get_db)
):
    db_object = (
        db.query(models.BaiTap)
        .filter(models.BaiTap.ma_baiTap == ma_bai_tap)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=404, detail="ma_bai_tap not found")

    return db_object


@router.delete(
    "/{ma_bai_tap}",
    status_code=status.HTTP_200_OK,
)
async def delete_bai_tap_by_id(
    ma_bai_tap: str, db: Session = Depends(database.get_db)
):
    db_object = (
        db.query(models.BaiTap)
        .filter(models.BaiTap.ma_baiTap == ma_bai_tap)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="Ma bai tap not found")
    db.delete(db_object)
    db.commit()
    return {"Delete successfully"}
