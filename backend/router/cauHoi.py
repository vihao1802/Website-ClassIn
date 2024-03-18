import database
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/cauHoi", tags=["cauHoi"])


@router.post(
    "/{ma_taiKhoan}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.CauHoi,
)
async def create(
    schema_object: schemas.CauHoiCreate,
    ma_taiKhoan: str,
    db: Session = Depends(database.get_db),
):
    # check ma_taiKhoan exist
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")

    db_object = models.CauHoi(**schema_object.dict(), ma_taiKhoan=ma_taiKhoan)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/", response_model=list[schemas.CauHoi], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.CauHoi).all()
    return db_object


@router.get("/{ma_cauHoi}", status_code=status.HTTP_200_OK)
async def read(ma_cauHoi: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.CauHoi)
        .filter(models.CauHoi.ma_cauHoi == ma_cauHoi)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="CauHoi not found")
    return db_object


@router.get(
    "/taiKhoan/{ma_taiKhoan}",
    response_model=list[schemas.CauHoi],
    status_code=status.HTTP_200_OK,
)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    # check ma_chuong exist
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")

    db_object = (
        db.query(models.CauHoi)
        .filter(models.CauHoi.ma_taiKhoan == ma_taiKhoan)
        .all()
    )
    return db_object
