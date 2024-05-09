import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/bai-lam-bai-tap", tags=["BaiLamBaiTap"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.BaiLamBaiTap,
)
async def create(
    schema_object: schemas.BaiLamBaiTapCreate,
    db: Session = Depends(database.get_db),
):
    ma_baiTap = str(schema_object.ma_baiTap)
    ma_taiKhoan = str(schema_object.ma_taiKhoan)
    # check ma_baiTap
    db_object_check = (
        db.query(models.BaiTap)
        .filter(models.BaiTap.ma_baiTap == ma_baiTap)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_baiTap not found")

    # check ma_taiKhoan
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")

    db_object = models.BaiLamBaiTap(**schema_object.dict())
    db_object.ma_baiTap = ma_baiTap
    db_object.ma_taiKhoan = ma_taiKhoan

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/",
    response_model=list[schemas.BaiLamBaiTap],
    status_code=status.HTTP_200_OK,
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.BaiLamBaiTap).all()
    return db_object


@router.get(
    "/bai-tap/{ma_baiTap}",
    status_code=status.HTTP_200_OK,
)
async def read(ma_baiTap: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.BaiLamBaiTap)
        .filter(models.BaiLamBaiTap.ma_baiTap == ma_baiTap)
        .first()
    )
    if not db_object:
        raise HTTPException(status_code=404, detail="BaiLamBaiTap not found")
    return db_object


@router.get(
    "/taiKhoan/{ma_taiKhoan}",
    response_model=list[schemas.BaiLamBaiTap],
    status_code=status.HTTP_200_OK,
)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.BaiLamBaiTap)
        .filter(models.BaiLamBaiTap.ma_taiKhoan == ma_taiKhoan)
        .all()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="TaiKhoan not found")
    return db_object


@router.get(
    "/tai-khoan/{ma_taiKhoan}/bai-tap/{ma_baiTap}",
    response_model=list[schemas.BaiLamBaiTap],
    status_code=status.HTTP_200_OK,
)
async def read(
    ma_taiKhoan: str, ma_baiTap: str, db: Session = Depends(database.get_db)
):
    db_object = (
        db.query(models.BaiLamBaiTap)
        .filter(
            models.BaiLamBaiTap.ma_taiKhoan == ma_taiKhoan
            and models.BaiLamBaiTap.ma_baiTap == ma_baiTap
        )
        .all()
    )
    return db_object


@router.delete("/{ma_baiLamBaiTap}", status_code=status.HTTP_200_OK)
async def delete(ma_baiLamBaiTap: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.BaiLamBaiTap)
        .filter(models.BaiLamBaiTap.ma_baiLamBaiTap == ma_baiLamBaiTap)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=404, detail="BaiLamBaiTap not found")
    db.delete(db_object)
    db.commit()
    return Response(status_code=status.HTTP_200_OK)
