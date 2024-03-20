import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists, or_
from sqlalchemy.orm import Session

router = APIRouter(prefix="/banBe", tags=["banBe"])


@router.post(
    "/", status_code=status.HTTP_201_CREATED, response_model=schemas.BanBe
)
async def create(
    schema_object: schemas.BanBeCreate, db: Session = Depends(database.get_db)
):
    ma_nguoiKetBan = str(schema_object.ma_nguoiKetBan)
    ma_nguoiDuocKetBan = str(schema_object.ma_nguoiDuocKetBan)

    # check ma_taiKhoan
    if ma_nguoiKetBan == ma_nguoiDuocKetBan:
        raise HTTPException(
            status_code=400,
            detail="ma_nguoiKetBan and ma_nguoiDuocKetBan must be different",
        )

    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_nguoiKetBan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_nguoiKetBan not found")

    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_nguoiDuocKetBan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(
            status_code=400, detail="ma_nguoiDuocKetBan not found"
        )

    db_object = models.BanBe(**schema_object.dict())
    db_object.ma_nguoiKetBan = ma_nguoiKetBan
    db_object.ma_nguoiDuocKetBan = ma_nguoiDuocKetBan

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/", response_model=list[schemas.BanBe], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.BanBe).all()
    return db_object


@router.get(
    "/taiKhoan/{ma_taiKhoanHienHanh}",
    response_model=list[schemas.BanBe],
    status_code=status.HTTP_200_OK,
)
async def read(
    ma_taiKhoanHienHanh: str, db: Session = Depends(database.get_db)
):
    db_object = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoanHienHanh)
        .first()
    )
    if db_object is None:
        raise HTTPException(
            status_code=400, detail="ma_taiKhoanHienHanh not found"
        )

    db_object = (
        db.query(models.BanBe)
        .filter(
            or_(
                models.BanBe.ma_nguoiKetBan == ma_taiKhoanHienHanh,
                models.BanBe.ma_nguoiDuocKetBan == ma_taiKhoanHienHanh,
            )
        )
        .all()
    )
    return db_object
