import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/chiTietBaiLamKiemTra", tags=["chiTietBaiLamKiemTra"]
)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.ChiTietBaiLamKiemTra,
)
async def create(
    schema_object: schemas.ChiTietBaiLamKiemTraCreate,
    db: Session = Depends(database.get_db),
):
    ma_baiLamKiemTra = str(schema_object.ma_baiLamKiemTra)
    ma_cauHoi = str(schema_object.ma_cauHoi)
    ma_dapAnChon = str(schema_object.ma_dapAnChon)
    # check ma_baiLamKiemTra
    db_object_check = (
        db.query(models.BaiLamKiemTra)
        .filter(models.BaiLamKiemTra.ma_baiLamKiemTra == ma_baiLamKiemTra)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(
            status_code=400, detail="ma_baiLamKiemTra not found"
        )

    # check ma_cauHoi
    db_object_check = (
        db.query(models.CauHoi)
        .filter(models.CauHoi.ma_cauHoi == ma_cauHoi)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_cauHoi not found")

    # check ma_cauTraLoi
    db_object_check = (
        db.query(models.CauTraLoi)
        .filter(models.CauTraLoi.ma_cauTraLoi == ma_dapAnChon)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_cauTraLoi not found")

    db_object = models.ChiTietBaiLamKiemTra(**schema_object.dict())
    db_object.ma_baiLamKiemTra = ma_baiLamKiemTra
    db_object.ma_cauHoi = ma_cauHoi
    db_object.ma_dapAnChon = ma_dapAnChon

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.ChiTietBaiLamKiemTra).all()
    return db_object


@router.get("/baiLamKiemTra/{ma_baiLamKiemTra}", status_code=status.HTTP_200_OK)
async def read(ma_baiLamKiemTra: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.ChiTietBaiLamKiemTra)
        .filter(
            models.ChiTietBaiLamKiemTra.ma_baiLamKiemTra == ma_baiLamKiemTra
        )
        .all()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="DeKiemTra not found")
    return db_object
