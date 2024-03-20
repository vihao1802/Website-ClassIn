import database
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/cauTraLoi", tags=["cauTraLoi"])


@router.post(
    "/{ma_cauHoi}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.CauTraLoi,
)
async def create(
    schema_object: schemas.CauTraLoiCreate,
    ma_cauHoi: str,
    db: Session = Depends(database.get_db),
):
    # check ma_taiKhoan exist
    db_object_check = (
        db.query(models.CauHoi)
        .filter(models.CauHoi.ma_cauHoi == ma_cauHoi)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_cauHoi not found")

    db_object = models.CauTraLoi(**schema_object.dict(), ma_cauHoi=ma_cauHoi)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/", response_model=list[schemas.CauTraLoi], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.CauTraLoi).all()
    return db_object


@router.get("/{ma_cauTraLoi}", status_code=status.HTTP_200_OK)
async def read(ma_cauTraLoi: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.CauTraLoi)
        .filter(models.CauTraLoi.ma_cauTraLoi == ma_cauTraLoi)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="CauHoi not found")
    return db_object


@router.get(
    "/cauHoi/{ma_cauHoi}",
    response_model=list[schemas.CauTraLoi],
    status_code=status.HTTP_200_OK,
)
async def read(ma_cauHoi: str, db: Session = Depends(database.get_db)):
    # check ma_chuong exist
    db_object_check = (
        db.query(models.CauHoi)
        .filter(models.CauHoi.ma_cauHoi == ma_cauHoi)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_cauHoi not found")

    db_object = (
        db.query(models.CauTraLoi)
        .filter(models.CauTraLoi.ma_cauHoi == ma_cauHoi)
        .all()
    )
    return db_object
