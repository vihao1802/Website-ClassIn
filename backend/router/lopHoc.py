import database
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/lopHoc", tags=["lopHoc"])


@router.post(
    "/{ma_giangVien}",
    status_code=status.HTTP_201_CREATED,
)
async def create(
    schema_object: schemas.LopHocCreate,
    ma_giangVien: str,
    db: Session = Depends(database.get_db),
):
    # Validate the email field
    if schema_object.ten.strip() == "":
        raise HTTPException(status_code=400, detail="Invalid ten")

    # check ma_giangVien
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_giangVien)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_giangVien not found")

    db_object = models.LopHoc(**schema_object.dict(), ma_giangVien=ma_giangVien)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.put(
    "/{ma_lopHoc}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.LopHoc,
)
def update(
    schema_object: schemas.LopHocUpdate,
    ma_lopHoc: str,
    db: Session = Depends(database.get_db),
):
    # check ma_lopHoc
    db_object = (
        db.query(models.LopHoc)
        .filter(models.LopHoc.ma_lopHoc == ma_lopHoc)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="LopHoc not found")

    # check ma_giangVien
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == schema_object.ma_giangVien)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_giangVien not found")

    for field, value in schema_object.dict(
        exclude_unset=True
    ).items():  # exclude_unset=True: ignore None value
        setattr(
            db_object, field, value
        )  # set value to field from schema_object to db_object

    db.commit()
    db.refresh(
        db_object
    )  # This line will update the db_object data from the database.
    return db_object


@router.put("/{ma_lopHoc}/delete", status_code=status.HTTP_200_OK)
async def delete(
    ma_lopHoc: str,
    db: Session = Depends(database.get_db),
):
    db_object = db.query(models.LopHoc).filter(
        models.LopHoc.ma_lopHoc == ma_lopHoc
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="Lop Hoc not found")
    db_object.update({"anLopHoc": 1})
    db.commit()
    return db_object


@router.put("/{ma_lopHoc}/restore", status_code=status.HTTP_200_OK)
async def restore(
    ma_lopHoc: str,
    db: Session = Depends(database.get_db),
):
    db_object = db.query(models.LopHoc).filter(
        models.LopHoc.ma_lopHoc == ma_lopHoc
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="Lop Hoc not found")
    db_object.update({"anLopHoc": 0})
    db.commit()
    return db_object


@router.get(
    "/", response_model=list[schemas.LopHoc], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.LopHoc).all()
    return db_object


@router.get(
    "/taiKhoan/{ma_giangVien}",
    response_model=list[schemas.LopHoc],
    status_code=status.HTTP_200_OK,
)
async def read(ma_giangVien: str, db: Session = Depends(database.get_db)):
    # check ma_giangVien exists
    db_object = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_giangVien)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="ma_giangVien not found")

    db_object = (
        db.query(models.LopHoc)
        .filter(models.LopHoc.ma_giangVien == ma_giangVien)
        .all()
    )
    return db_object


@router.get("/lopHoc/{ma_lopHoc}", status_code=status.HTTP_200_OK)
async def read(ma_lopHoc: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.LopHoc)
        .filter(models.LopHoc.ma_lopHoc == ma_lopHoc)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="LopHoc not found")
    return db_object


@router.get("/{ma_taiKhoan}", status_code=status.HTTP_200_OK)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    query_1 = (
        db.query(models.LopHoc, models.NhomChat)
        .join(models.ThamGiaLopHoc)
        .join(models.NhomChat)
        .filter(models.ThamGiaLopHoc.ma_taiKhoan == ma_taiKhoan)
        .all()
    )
    query_2 = (
        db.query(models.LopHoc, models.NhomChat)
        .join(models.NhomChat)
        .filter(models.LopHoc.ma_giangVien == ma_taiKhoan)
        .all()
    )

    result = []
    for lopHoc, nhomChat in query_1:
        lopHoc.ma_nhomChat = nhomChat.ma_nhomChat
        result.append(lopHoc)

    for lopHoc, nhomChat in query_2:
        lopHoc.ma_nhomChat = nhomChat.ma_nhomChat
        result.append(lopHoc)

    return result


@router.get(
    "/{ma_lopHoc}/taiKhoan",
    status_code=status.HTTP_200_OK,
    response_model=list[schemas.TaiKhoan],
)
async def read(ma_lopHoc: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.TaiKhoan)
        .join(models.ThamGiaLopHoc)
        .filter(models.ThamGiaLopHoc.ma_lopHoc == ma_lopHoc)
        .all()
    )
    return db_object
