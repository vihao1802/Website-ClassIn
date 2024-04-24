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


@router.put("/{ma_cauHoi}", status_code=status.HTTP_200_OK)
async def update(
    ma_cauHoi: str,
    schema_object: schemas.CauHoiCreate,
    db: Session = Depends(database.get_db),
):
    db_object = db.query(models.CauHoi).filter(
        models.CauHoi.ma_cauHoi == ma_cauHoi
    )
    if db_object.first() is None:
        raise HTTPException(status_code=400, detail="CauHoi not found")

    query_exist_in_test = db.query(models.ChiTietBaiKiemTra.ma_cauHoi).all()
    for q in query_exist_in_test:
        if q.ma_cauHoi == ma_cauHoi:
            db.query(models.CauHoi).filter(
                models.CauHoi.ma_cauHoi == ma_cauHoi
            ).update({"daXoa": 1})
            db.commit()
            raise HTTPException(
                status_code=202,
                detail={"status": 202, "message": "CauHoi is in BaiKiemTra"},
            )

    db_object.update(schema_object.dict())
    db.commit()
    return db_object.first()


@router.put("/{ma_cauHoi}/delete", status_code=status.HTTP_200_OK)
async def update(
    ma_cauHoi: str,
    db: Session = Depends(database.get_db),
):
    db_object = db.query(models.CauHoi).filter(
        models.CauHoi.ma_cauHoi == ma_cauHoi
    )
    if db_object.first() is None:
        raise HTTPException(status_code=400, detail="CauHoi not found")
    db_object.update({"daXoa": 1})
    db.commit()
    return db_object.first()


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
        .filter(models.CauHoi.daXoa == 0)
        .all()
    )
    return db_object


@router.get(
    "/taiKhoan/{ma_taiKhoan}/chiTiet",
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
    db_object = []
    cauHoi = (
        db.query(models.CauHoi)
        .filter(models.CauHoi.ma_taiKhoan == ma_taiKhoan)
        .all()
    )
    for ch in cauHoi:
        cauTraLoi = (
            db.query(models.CauTraLoi)
            .filter(models.CauTraLoi.ma_cauHoi == ch.ma_cauHoi)
            .all()
        )
        db_object.append(
            {
                "cauHoi": ch,
                "cauTraLoi": cauTraLoi,
            }
        )
    return db_object


@router.get("/{ma_cauHoi}/chiTiet", status_code=status.HTTP_200_OK)
async def read(ma_cauHoi: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.CauHoi)
        .filter(models.CauHoi.ma_cauHoi == ma_cauHoi)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="CauHoi not found")
    cauTraLoi = (
        db.query(models.CauTraLoi)
        .filter(models.CauTraLoi.ma_cauHoi == ma_cauHoi)
        .all()
    )
    return {
        "cauHoi": db_object,
        "cauTraLoi": cauTraLoi,
    }
