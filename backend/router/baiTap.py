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


@router.put(
    "/{ma_bai_tap}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.BaiTap,
)
async def update_bai_tap(
    ma_bai_tap: str,
    schema_object: schemas.BaiTapUpdate,
    db: Session = Depends(database.get_db),
):
    db_object = (
        db.query(models.BaiTap)
        .filter(models.BaiTap.ma_baiTap == ma_bai_tap)
        .first()
    )
    update_data = schema_object.dict(exclude_unset=True)

    if db_object is None:
        raise HTTPException(status_code=404, detail="ma_bai_tap not found")
    db.query(models.BaiTap).filter(
        models.BaiTap.ma_baiTap == ma_bai_tap
    ).update(schema_object.dict())
    db.commit()
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


@router.get(
    "/{ma_baiTap}/info",
    status_code=status.HTTP_200_OK,
)
async def read(ma_baiTap: str, db: Session = Depends(database.get_db)):
    query = (
        db.query(models.BaiTap, models.Chuong, models.LopHoc, models.TaiKhoan)
        .join(models.Chuong, models.Chuong.ma_chuong == models.BaiTap.ma_chuong)
        .join(models.LopHoc, models.LopHoc.ma_lopHoc == models.Chuong.ma_lopHoc)
        .join(
            models.TaiKhoan,
            models.TaiKhoan.ma_taiKhoan == models.LopHoc.ma_giangVien,
        )
        .filter(models.BaiTap.ma_baiTap == ma_baiTap)
    )
    if query is None:
        raise HTTPException(status_code=400, detail="BaiTap not found")

    for baitap, chuong, lop, giangvien in query:
        baitap.tenChuong = chuong.ten
        baitap.tenLop = lop.ten
        baitap.tenGV = giangvien.hoTen
        return baitap


@router.get(
    "/{ma_baiTap}/getSubmissionDetails",
    status_code=status.HTTP_200_OK,
)
async def read(ma_baiTap: str, db: Session = Depends(database.get_db)):
    query_submit = (
        db.query(models.BaiLamBaiTap, models.TaiKhoan)
        .join(
            models.TaiKhoan,
            models.BaiLamBaiTap.ma_taiKhoan == models.TaiKhoan.ma_taiKhoan,
        )
        .filter(models.BaiLamBaiTap.ma_baiTap == ma_baiTap)
        .all()
    )

    submit_id = [i.ma_taiKhoan for i, j in query_submit]

    user_submit = []
    for baiLamBaiTap, taiKhoan in query_submit:
        user_submit.append(
            {
                "ma_baiLamBaiTap": baiLamBaiTap.ma_baiLamBaiTap,
                "diem": baiLamBaiTap.diem,
                "nopTre": baiLamBaiTap.nopTre,
                "ma_taiKhoan": taiKhoan.ma_taiKhoan,
                "hoTen": taiKhoan.hoTen,
                "email": taiKhoan.email,
            }
        )

    class_id = (
        db.query(models.LopHoc)
        .join(models.Chuong, models.LopHoc.ma_lopHoc == models.Chuong.ma_lopHoc)
        .join(
            models.BaiTap,
            models.Chuong.ma_chuong == models.BaiTap.ma_chuong,
        )
        .filter(models.BaiTap.ma_baiTap == ma_baiTap)
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


@router.get("/chuong/{ma_chuong}", status_code=status.HTTP_200_OK)
async def get_bai_tap_by_chuong(
    ma_chuong: str, db: Session = Depends(database.get_db)
):
    db_object = (
        db.query(models.BaiTap)
        .filter(models.BaiTap.ma_chuong == ma_chuong)
        .all()
    )
    if db_object is None:
        raise HTTPException(status_code=404, detail="ma_chuong not found")

    return db_object
