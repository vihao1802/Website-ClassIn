import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/tin-nhan-ban-be", tags=["TinNhanBanBe"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.TinNhanBanBe,
)
async def create(
    schema_object: schemas.TinNhanBanBeCreate,
    db: Session = Depends(database.get_db),
):
    noiDung = str(schema_object.noiDung)
    ma_nguoiGui = str(schema_object.ma_nguoiGui)
    ma_nguoiNhan = str(schema_object.ma_nguoiNhan)

    if noiDung.strip() == "":
        raise HTTPException(status_code=400, detail="noiDung empty")
    # check ma_nguoiNguoiGui exists
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_nguoiGui)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(
            status_code=400, detail="ma_nguoiNguoiGui not found"
        )
    # check ma_nguoiNguoiNhan exists
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_nguoiNhan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(
            status_code=400, detail="ma_nguoiNguoiNhan not found"
        )

    db_object = models.TinNhanBanBe(**schema_object.dict())
    db_object.noiDung = noiDung
    db_object.ma_nguoiGui = ma_nguoiGui
    db_object.ma_nguoiNhan = ma_nguoiNhan

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/",
    response_model=list[schemas.TinNhanBanBe],
    status_code=status.HTTP_200_OK,
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.TinNhanBanBe).all()
    return db_object


@router.get(
    "/tai-khoan/{ma_taiKhoanHienHanh}/tai-khoan/{ma_nguoiBan}",
    status_code=status.HTTP_200_OK,
)
async def read(
    ma_taiKhoanHienHanh: str,
    ma_nguoiBan: str,
    db: Session = Depends(database.get_db),
):
    # check exists
    taiKhoan_exists = db.query(
        exists().where(models.TaiKhoan.ma_taiKhoan == ma_taiKhoanHienHanh)
    ).scalar()
    if not taiKhoan_exists:
        raise HTTPException(
            status_code=404,
            detail=f"ma_taiKhoanHienHanh '{ma_taiKhoanHienHanh}' not found in taiKhoan",
        )
    taiKhoan_exists = db.query(
        exists().where(models.TaiKhoan.ma_taiKhoan == ma_nguoiBan)
    ).scalar()
    if not taiKhoan_exists:
        raise HTTPException(
            status_code=404,
            detail=f"ma_nguoiBan '{ma_nguoiBan}' not found in taiKhoan",
        )

    # get all tin nhan
    result = []
    db_nuoiGui = (
        db.query(models.TinNhanBanBe, models.TaiKhoan)
        .join(
            models.TaiKhoan,
            models.TinNhanBanBe.ma_nguoiGui == models.TaiKhoan.ma_taiKhoan,
        )
        .filter(
            models.TinNhanBanBe.ma_nguoiGui == ma_taiKhoanHienHanh,
            models.TinNhanBanBe.ma_nguoiNhan == ma_nguoiBan,
            models.TinNhanBanBe.daXoa == 0,
        )
    )
    db_nuoiNhan = (
        db.query(models.TinNhanBanBe, models.TaiKhoan)
        .join(
            models.TaiKhoan,
            models.TinNhanBanBe.ma_nguoiNhan == models.TaiKhoan.ma_taiKhoan,
        )
        .filter(
            models.TinNhanBanBe.ma_nguoiGui == ma_nguoiBan,
            models.TinNhanBanBe.ma_nguoiNhan == ma_taiKhoanHienHanh,
            models.TinNhanBanBe.daXoa == 0,
        )
    )
    for TinNhanBanBe, TaiKhoan in db_nuoiGui:
        TinNhanBanBe.ten_taiKhoan = TaiKhoan.hoTen
        TinNhanBanBe.email = TaiKhoan.email
        TinNhanBanBe.anhDaiDien = TaiKhoan.anhDaiDien

        if TinNhanBanBe.ma_nguoiGui == ma_taiKhoanHienHanh:
            TinNhanBanBe.position = "right"

        result.append(TinNhanBanBe)

    for TinNhanBanBe, TaiKhoan in db_nuoiNhan:
        TinNhanBanBe.ten_taiKhoan = TaiKhoan.hoTen
        TinNhanBanBe.email = TaiKhoan.email
        TinNhanBanBe.anhDaiDien = TaiKhoan.anhDaiDien

        if TinNhanBanBe.ma_nguoiGui == ma_nguoiBan:
            TinNhanBanBe.position = "left"

        result.append(TinNhanBanBe)

    # sort by thoiGianGui old to new
    result = sorted(result, key=lambda x: x.thoiGianGui)

    return result


@router.put(
    "/{ma_tinNhan}/delete-message",
    status_code=status.HTTP_200_OK,
)
async def update(
    ma_tinNhan: str,
    db: Session = Depends(database.get_db),
):
    db_object = (
        db.query(models.TinNhanBanBe)
        .filter(models.TinNhanBanBe.ma_tinNhan == ma_tinNhan)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=404, detail="TinNhanBanBe not found")

    db_object.daXoa = 1

    db.commit()
    db.refresh(db_object)
    return db_object
