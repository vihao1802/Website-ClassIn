from datetime import date, datetime

import database
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/deKiemTra", tags=["deKiemTra"])


@router.post(
    "/{ma_chuong}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.DeKiemTra,
)
async def create(
    schema_object: schemas.DeKiemTraCreate,
    ma_chuong: str,
    db: Session = Depends(database.get_db),
):
    # check ma_chuong exist
    db_object_check = (
        db.query(models.Chuong)
        .filter(models.Chuong.ma_chuong == ma_chuong)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")

    db_object = models.DeKiemTra(**schema_object.dict(), ma_chuong=ma_chuong)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/", response_model=list[schemas.DeKiemTra], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.DeKiemTra).all()
    return db_object


@router.get("/{ma_deKiemTra}", status_code=status.HTTP_200_OK)
async def read(ma_deKiemTra: str, db: Session = Depends(database.get_db)):
    query = (
        db.query(
            models.DeKiemTra, models.Chuong, models.LopHoc, models.TaiKhoan
        )
        .join(
            models.Chuong, models.Chuong.ma_chuong == models.DeKiemTra.ma_chuong
        )
        .join(models.LopHoc, models.LopHoc.ma_lopHoc == models.Chuong.ma_lopHoc)
        .join(
            models.TaiKhoan,
            models.TaiKhoan.ma_taiKhoan == models.LopHoc.ma_giangVien,
        )
        .filter(models.DeKiemTra.ma_deKiemTra == ma_deKiemTra)
    )
    if query is None:
        raise HTTPException(status_code=400, detail="DeKiemTra not found")

    for dekiemtra, chuong, lop, giangvien in query:
        dekiemtra.tenChuong = chuong.ten
        dekiemtra.tenLop = lop.ten
        dekiemtra.tenGV = giangvien.hoTen
        return dekiemtra


@router.get(
    "/chuong/{ma_chuong}",
    response_model=list[schemas.DeKiemTra],
    status_code=status.HTTP_200_OK,
)
async def read(ma_chuong: str, db: Session = Depends(database.get_db)):
    # check ma_chuong exist
    db_object_check = (
        db.query(models.Chuong)
        .filter(models.Chuong.ma_chuong == ma_chuong)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")

    db_object = (
        db.query(models.DeKiemTra)
        .filter(models.DeKiemTra.ma_chuong == ma_chuong)
        .all()
    )
    return db_object


@router.get(
    "/{ma_deKiemTra}/chiTiet",
    status_code=status.HTTP_200_OK,
)
async def read(ma_deKiemTra: str, db: Session = Depends(database.get_db)):
    cauHoi = (
        db.query(models.CauHoi)
        .join(models.ChiTietBaiKiemTra)
        .filter(models.ChiTietBaiKiemTra.ma_deKiemTra == ma_deKiemTra)
        .all()
    )
    db_object = []
    for ch in cauHoi:
        cauTraLoi = (
            db.query(models.CauTraLoi)
            .filter(models.CauTraLoi.ma_cauHoi == ch.ma_cauHoi)
            .all()
        )
        db_object.append({"cauHoi": ch, "cauTraLoi": cauTraLoi})
    if db_object is None:
        raise HTTPException(status_code=400, detail="DeKiemTra not found")
    return db_object


@router.get(
    "/{ma_deKiemTra}/getSubmissionDetails",
    status_code=status.HTTP_200_OK,
)
async def read(ma_deKiemTra: str, db: Session = Depends(database.get_db)):
    query_submit = (
        db.query(models.BaiLamKiemTra, models.TaiKhoan)
        .join(
            models.TaiKhoan,
            models.BaiLamKiemTra.ma_taiKhoan == models.TaiKhoan.ma_taiKhoan,
        )
        .filter(models.BaiLamKiemTra.ma_deKiemTra == ma_deKiemTra)
        .all()
    )

    submit_id = [i.ma_taiKhoan for i, j in query_submit]

    user_submit = []
    for baiLamKiemTra, taiKhoan in query_submit:
        user_submit.append(
            {
                "ma_baiLamKiemTra": baiLamKiemTra.ma_baiLamKiemTra,
                "khoangThoiGianLamBai": str(baiLamKiemTra.thoiGianBatDauLam)
                + " - "
                + str(baiLamKiemTra.thoiGianNop.time()),
                "thoiGianLamBai": (
                    baiLamKiemTra.thoiGianNop - baiLamKiemTra.thoiGianBatDauLam
                ).total_seconds()
                / 60,
                "diem": baiLamKiemTra.diem,
                "nopTre": baiLamKiemTra.nopTre,
                "soCauDung": baiLamKiemTra.soCauDung,
                "ma_taiKhoan": taiKhoan.ma_taiKhoan,
                "hoTen": taiKhoan.hoTen,
                "email": taiKhoan.email,
            }
        )

    class_id = (
        db.query(models.LopHoc)
        .join(models.Chuong, models.LopHoc.ma_lopHoc == models.Chuong.ma_lopHoc)
        .join(
            models.DeKiemTra,
            models.Chuong.ma_chuong == models.DeKiemTra.ma_chuong,
        )
        .filter(models.DeKiemTra.ma_deKiemTra == ma_deKiemTra)
        .first()
        .ma_lopHoc
    )

    query_unsubmit = (
        db.query(models.TaiKhoan)
        .join(
            models.ThamGiaLopHoc,
            models.TaiKhoan.ma_taiKhoan == models.ThamGiaLopHoc.ma_taiKhoan,
        )
        .filter(models.ThamGiaLopHoc.ma_lopHoc == class_id)
        .all()
    )

    user_unsubmit = [
        i for i in query_unsubmit if i.ma_taiKhoan not in submit_id
    ]

    return {
        "users_submit": user_submit,
        "users_unsubmit": user_unsubmit,
    }
