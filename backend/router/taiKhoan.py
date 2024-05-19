import database
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from router.auth import hash_password, verify_password
from sqlalchemy import and_, exists, or_
from sqlalchemy.orm import Session

router = APIRouter(prefix="/tai-khoan", tags=["TaiKhoan"])

@router.post(
    "/{ma_nhomQuyen}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.TaiKhoan,
)
async def create(
    schema_object: schemas.TaiKhoanCreate,
    ma_nhomQuyen: str,
    db: Session = Depends(database.get_db),
):
    # Validate the email field
    try:
        validate_email(schema_object.email)
    except EmailNotValidError:
        raise HTTPException(status_code=400, detail="Invalid email address")

    # Check duplicated email
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.email == schema_object.email)
        .first()
    )
    if db_object_check:
        raise HTTPException(status_code=400, detail="Email is already exist")

    # check ma_nhomQuyen
    db_object_check = (
        db.query(models.NhomQuyen)
        .filter(models.NhomQuyen.ma_nhomQuyen == ma_nhomQuyen)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_nhomQuyen not found")

    db_object = models.TaiKhoan(
        **schema_object.dict(), ma_nhomQuyen=ma_nhomQuyen
    )
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.put(
    "/{ma_taiKhoan}/update-info",
    status_code=status.HTTP_200_OK,
    response_model=schemas.TaiKhoan,
)
def update(
    schema_object: schemas.TaiKhoanUpdateInfo,
    ma_taiKhoan: str,
    db: Session = Depends(database.get_db),
):
    # check ma_taiKhoan
    db_object = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="TaiKhoan not found"
        )

    for field, value in schema_object.dict(
        exclude_unset=True
    ).items():  # exclude_unset=True: ignore None value and iterate through the rest of the fields
        setattr(
            db_object, field, value
        )  # set value to field from schema_object to db_object

    db.commit()
    db.refresh(
        db_object
    )  # This line will update the db_object with the most recent data from the database.
    return db_object


@router.put(
    "/{ma_taiKhoan}/update-password",
    status_code=status.HTTP_200_OK,
    response_model=schemas.TaiKhoan,
)
def update(
    schema_object: schemas.TaiKhoanUpdatePassword,
    ma_taiKhoan: str,
    db: Session = Depends(database.get_db),
):
    # check ma_taiKhoan
    db_object = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="TaiKhoan not found"
        )

    result = verify_password(schema_object.currentPassword, db_object.matKhau)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )

    result = verify_password(schema_object.newPassword, db_object.matKhau)
    if result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be different from the current password",
        )

    hashed_password = hash_password(schema_object.newPassword)
    db_object.matKhau = hashed_password

    db.commit()
    db.refresh(
        db_object
    )  # This line will update the db_object with the most recent data from the database.
    return db_object


@router.get(
    "/", response_model=list[schemas.TaiKhoan], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.TaiKhoan).all()
    return db_object


@router.get("/{ma_taiKhoan}", status_code=status.HTTP_200_OK)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="TaiKhoan not found")
    return db_object


@router.get(
    "/nhomQuyen/{ma_nhomQuyen}",
    response_model=list[schemas.TaiKhoan],
    status_code=status.HTTP_200_OK,
)
async def read(ma_nhomQuyen: str, db: Session = Depends(database.get_db)):
    nhomQuyen_exists = db.query(
        exists().where(models.NhomQuyen.ma_nhomQuyen == ma_nhomQuyen)
    ).scalar()

    if not nhomQuyen_exists:
        raise HTTPException(
            status_code=404,
            detail=f"ma_nhomQuyen '{ma_nhomQuyen}' not found in NhomQuyen",
        )

    db_object = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_nhomQuyen == ma_nhomQuyen)
        .first()
    )
    return db_object


@router.get(
    "/{ma_lopHoc}/unregistered",
    status_code=status.HTTP_200_OK,
)
async def read(ma_lopHoc: str, db: Session = Depends(database.get_db)):
    all_user = (
        db.query(models.TaiKhoan)
        .filter(
            models.TaiKhoan.ma_nhomQuyen
            != "3fa85f64-5717-4562-b3fc-2c963f66afa6"
        )
        .all()
    )
    registered_user = (
        db.query(models.ThamGiaLopHoc)
        .filter(models.ThamGiaLopHoc.ma_lopHoc == ma_lopHoc)
        .all()
    )
    instructor_user_id = (
        db.query(models.LopHoc.ma_giangVien)
        .filter(models.LopHoc.ma_lopHoc == ma_lopHoc)
        .first()
    )
    registered_user_id = [user.ma_taiKhoan for user in registered_user]
    unregistered_user = [
        {"ma_taiKhoan": user.ma_taiKhoan, "email": user.email}
        for user in all_user
        if user.ma_taiKhoan not in registered_user_id
        and user.ma_taiKhoan != instructor_user_id[0]
    ]
    return unregistered_user


@router.get(
    "/{ma_taiKhoan}/bai-tap/de-kiem-tra/filter", status_code=status.HTTP_200_OK
)
async def read(
    ma_taiKhoan: str,
    selectedClass: str = None,
    selectedCategory: str = None,
    db: Session = Depends(database.get_db),
):
    # Check ma_taiKhoan exists
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")

    result = []
    db_baiTap = (
        db.query(models.BaiTap, models.LopHoc)
        .join(models.Chuong, models.BaiTap.ma_chuong == models.Chuong.ma_chuong)
        .join(models.LopHoc, models.Chuong.ma_lopHoc == models.LopHoc.ma_lopHoc)
        .join(
            models.ThamGiaLopHoc,
            models.LopHoc.ma_lopHoc == models.ThamGiaLopHoc.ma_lopHoc,
        )
        .filter(models.ThamGiaLopHoc.ma_taiKhoan == ma_taiKhoan)
        .all()
    )
    for baiTap, lopHoc in db_baiTap:
        baiTap.ten_lopHoc = lopHoc.ten
        db_object = (
            db.query(models.BaiLamBaiTap)
            .filter(models.BaiLamBaiTap.ma_baiTap == baiTap.ma_baiTap)
            .filter(models.BaiLamBaiTap.ma_taiKhoan == ma_taiKhoan)
            .first()
        )
        if db_object:
            baiTap.ma_baiLamBaiTap = db_object.ma_baiLamBaiTap
            baiTap.da_lam = 1
        else:
            baiTap.da_lam = 0
        result.append(baiTap)

    db_deKiemTra = (
        db.query(models.DeKiemTra, models.LopHoc)
        .join(
            models.Chuong, models.DeKiemTra.ma_chuong == models.Chuong.ma_chuong
        )
        .join(models.LopHoc, models.Chuong.ma_lopHoc == models.LopHoc.ma_lopHoc)
        .join(
            models.ThamGiaLopHoc,
            models.LopHoc.ma_lopHoc == models.ThamGiaLopHoc.ma_lopHoc,
        )
        .filter(models.ThamGiaLopHoc.ma_taiKhoan == ma_taiKhoan)
        .all()
    )
    for deKiemTra, lopHoc in db_deKiemTra:
        deKiemTra.ten_lopHoc = lopHoc.ten
        db_object = (
            db.query(models.BaiLamKiemTra)
            .filter(models.BaiLamKiemTra.ma_deKiemTra == deKiemTra.ma_deKiemTra)
            .filter(models.BaiLamKiemTra.ma_taiKhoan == ma_taiKhoan)
            .first()
        )
        if db_object:
            deKiemTra.ma_baiLamKiemTra = db_object.ma_baiLamKiemTra
            deKiemTra.da_lam = 1
        else:
            deKiemTra.da_lam = 0
        result.append(deKiemTra)

    # sort by thoiGianKetThuc newest to oldest
    result = sorted(result, key=lambda x: x.thoiGianKetThuc, reverse=True)

    # filter by selectedClass
    if selectedClass != "0":
        result = [x for x in result if x.ten_lopHoc == selectedClass]

    # filter by selectedCategory
    if selectedCategory == "1":  # Exercise
        result = [x for x in result if hasattr(x, "ma_baiTap")]
    elif selectedCategory == "2":  # Test
        result = [x for x in result if hasattr(x, "ma_deKiemTra")]

    return result


@router.get(
    "/{ma_taiKhoanHienHanh}/get-all-user-with-status-friend",
    status_code=status.HTTP_200_OK,
)
async def read(
    ma_taiKhoanHienHanh: str, db: Session = Depends(database.get_db)
):
    # get all user without ma_taiKhoanHienHanh
    db_object = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan != ma_taiKhoanHienHanh)
        .all()
    )

    result = []
    for user in db_object:
        db_check = (
            db.query(models.BanBe)
            .filter(
                or_(
                    and_(
                        models.BanBe.ma_nguoiKetBan == ma_taiKhoanHienHanh,
                        models.BanBe.ma_nguoiDuocKetBan == user.ma_taiKhoan,
                    ),
                    and_(
                        models.BanBe.ma_nguoiKetBan == user.ma_taiKhoan,
                        models.BanBe.ma_nguoiDuocKetBan == ma_taiKhoanHienHanh,
                    ),
                )
            )
            .first()
        )

        if db_check is None:
            user.daKetBan = 0
        else:
            user.ma_nguoiKetBan = db_check.ma_nguoiKetBan
            user.daKetBan = db_check.daKetBan
        result.append(user)

    return result
