import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/chiTietBaiKiemTra", tags=["chiTietBaiKiemTra"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.ChiTietBaiKiemTra,
)
async def create(
    schema_object: schemas.ChiTietBaiKiemTraCreate,
    db: Session = Depends(database.get_db),
):
    thuTu = schema_object.thuTu
    ma_deKiemTra = str(schema_object.ma_deKiemTra)
    ma_cauHoi = str(schema_object.ma_cauHoi)

    # check ma_deKiemTra
    db_object_check = (
        db.query(models.DeKiemTra)
        .filter(models.DeKiemTra.ma_deKiemTra == ma_deKiemTra)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_deKiemTra not found")

    # check ma_cauHoi
    db_object_check = (
        db.query(models.CauHoi)
        .filter(models.CauHoi.ma_cauHoi == ma_cauHoi)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_cauHoi not found")

    db_object = models.ChiTietBaiKiemTra(**schema_object.dict())
    db_object.thuTu = thuTu
    db_object.ma_cauHoi = ma_cauHoi
    db_object.ma_deKiemTra = ma_deKiemTra

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/",
    response_model=list[schemas.ChiTietBaiKiemTra],
    status_code=status.HTTP_200_OK,
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.ChiTietBaiKiemTra).all()
    return db_object


@router.get("/deKiemTra/{ma_deKiemTra}", status_code=status.HTTP_200_OK)
async def read(ma_deKiemTra: str, db: Session = Depends(database.get_db)):
    # check ma_deKiemTra
    db_object_check = (
        db.query(models.DeKiemTra)
        .filter(models.DeKiemTra.ma_deKiemTra == ma_deKiemTra)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_deKiemTra not found")

    db_object = (
        db.query(models.ChiTietBaiKiemTra)
        .filter(models.ChiTietBaiKiemTra.ma_deKiemTra == ma_deKiemTra)
        .all()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="DeKiemTra not found")
    return db_object
