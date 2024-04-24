import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import and_, exists, or_
from sqlalchemy.orm import Session

router = APIRouter(prefix="/ban-be", tags=["BanBe"])


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
    "/tai-khoan/{ma_taiKhoanHienHanh}",
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

    db_query1 = (
        db.query(models.BanBe, models.TaiKhoan)
        .join(
            models.TaiKhoan,
            models.TaiKhoan.ma_taiKhoan == models.BanBe.ma_nguoiDuocKetBan,
        )
        .filter(models.BanBe.ma_nguoiKetBan == ma_taiKhoanHienHanh)
        .filter(or_(models.BanBe.daKetBan == 1, models.BanBe.daKetBan == 2))
        .all()
    )
    db_query2 = (
        db.query(models.BanBe, models.TaiKhoan)
        .join(
            models.TaiKhoan,
            models.TaiKhoan.ma_taiKhoan == models.BanBe.ma_nguoiKetBan,
        )
        .filter(models.BanBe.ma_nguoiDuocKetBan == ma_taiKhoanHienHanh)
        .filter(or_(models.BanBe.daKetBan == 1, models.BanBe.daKetBan == 2))
        .all()
    )

    result = []
    for banBe, taiKhoan in db_query1:
        banBe.ma_taiKhoan = taiKhoan.ma_taiKhoan
        banBe.hoTen = taiKhoan.hoTen
        banBe.email = taiKhoan.email
        # get latest message
        db_query = (
            db.query(models.TinNhanBanBe)
            .filter(
                or_(
                    models.TinNhanBanBe.ma_nguoiGui == banBe.ma_nguoiKetBan,
                    models.TinNhanBanBe.ma_nguoiGui == banBe.ma_nguoiDuocKetBan,
                ),
                or_(
                    models.TinNhanBanBe.ma_nguoiNhan == banBe.ma_nguoiKetBan,
                    models.TinNhanBanBe.ma_nguoiNhan
                    == banBe.ma_nguoiDuocKetBan,
                ),
            )
            .filter(models.TinNhanBanBe.daXoa == 0)
            .order_by(models.TinNhanBanBe.thoiGianGui.desc())
            .first()
        )
        if db_query is not None:
            if db_query.daXoa == 0:
                if db_query.ma_nguoiGui == ma_taiKhoanHienHanh:
                    banBe.noiDung = "You: " + db_query.noiDung
                else:
                    banBe.noiDung = db_query.noiDung
        result.append(banBe)

    for banBe, taiKhoan in db_query2:
        banBe.ma_taiKhoan = taiKhoan.ma_taiKhoan
        banBe.hoTen = taiKhoan.hoTen
        banBe.email = taiKhoan.email
        # get latest message
        db_query = (
            db.query(models.TinNhanBanBe)
            .filter(
                or_(
                    models.TinNhanBanBe.ma_nguoiGui == banBe.ma_nguoiKetBan,
                    models.TinNhanBanBe.ma_nguoiGui == banBe.ma_nguoiDuocKetBan,
                ),
                or_(
                    models.TinNhanBanBe.ma_nguoiNhan == banBe.ma_nguoiKetBan,
                    models.TinNhanBanBe.ma_nguoiNhan
                    == banBe.ma_nguoiDuocKetBan,
                ),
            )
            .filter(models.TinNhanBanBe.daXoa == 0)
            .order_by(models.TinNhanBanBe.thoiGianGui.desc())
            .first()
        )
        if db_query is not None:
            if db_query.daXoa == 0:
                if db_query.ma_nguoiGui == ma_taiKhoanHienHanh:
                    banBe.noiDung = "You: " + db_query.noiDung
                else:
                    banBe.noiDung = db_query.noiDung
        result.append(banBe)

    return result


@router.put(
    "/tai-khoan/{ma_taiKhoanHienHanh}/tai-khoan/{ma_taiKhoanBan}/change-status-friend",
    status_code=status.HTTP_200_OK,
)
async def update(
    ma_taiKhoanHienHanh: str,
    ma_taiKhoanBan: str,
    status: int,
    db: Session = Depends(database.get_db),
):
    # check ma_taiKhoan
    if ma_taiKhoanHienHanh == ma_taiKhoanBan:
        raise HTTPException(
            status_code=400,
            detail="ma_taiKhoanHienHanh and ma_taiKhoanBan must be different",
        )

    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoanHienHanh)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(
            status_code=400, detail="ma_taiKhoanHienHanh not found"
        )

    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoanBan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoanBan not found")

    db_object = (
        db.query(models.BanBe)
        .filter(
            or_(
                and_(
                    models.BanBe.ma_nguoiKetBan == ma_taiKhoanHienHanh,
                    models.BanBe.ma_nguoiDuocKetBan == ma_taiKhoanBan,
                ),
                and_(
                    models.BanBe.ma_nguoiKetBan == ma_taiKhoanBan,
                    models.BanBe.ma_nguoiDuocKetBan == ma_taiKhoanHienHanh,
                ),
            )
        )
        .first()
    )
    if db_object:
        db_object.daKetBan = status
    else:
        schema_object = schemas.BanBeCreate(
            ma_nguoiKetBan=ma_taiKhoanHienHanh,
            ma_nguoiDuocKetBan=ma_taiKhoanBan,
        )
        db_object = models.BanBe(**schema_object.dict())
        db_object.ma_nguoiKetBan = str(ma_taiKhoanHienHanh)
        db_object.ma_nguoiDuocKetBan = str(ma_taiKhoanBan)
        db.add(db_object)

    db.commit()
    db.refresh(db_object)
    return db_object
