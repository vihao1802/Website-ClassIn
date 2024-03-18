import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy import exists
from sqlalchemy.orm import Session

router = APIRouter(prefix="/tinNhan", tags=["tinNhan"])


@router.post(
    "/", status_code=status.HTTP_201_CREATED, response_model=schemas.TinNhan
)
async def create(
    schema_object: schemas.TinNhanCreate, db: Session = Depends(database.get_db)
):
    ma_nhomChat = str(schema_object.ma_nhomChat)
    ma_taiKhoan = str(schema_object.ma_taiKhoan)
    # check ma_lopHoc
    db_object_check = (
        db.query(models.NhomChat)
        .filter(models.NhomChat.ma_nhomChat == ma_nhomChat)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_nhomChat not found")

    # check ma_taiKhoan
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")

    db_object = models.TinNhan(**schema_object.dict())
    db_object.ma_nhomChat = ma_nhomChat
    db_object.ma_taiKhoan = ma_taiKhoan

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/", response_model=list[schemas.TinNhan], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.TinNhan).all()
    return db_object


@router.get(
    "/nhomChat/{ma_nhomChat}",
    response_model=list[schemas.TinNhan],
    status_code=status.HTTP_200_OK,
)
async def read(ma_nhomChat: str, db: Session = Depends(database.get_db)):
    try:
        db_object = (
            db.query(models.TinNhan)
            .filter(models.TinNhan.ma_nhomChat == ma_nhomChat)
            .all()
        )
    except Exception as e:
        print(e)
    if not db_object:
        raise HTTPException(status_code=400, detail="nhomChat not found")
    return db_object


@router.get(
    "/taiKhoan/{ma_taiKhoan}",
    response_model=list[schemas.TinNhan],
    status_code=status.HTTP_200_OK,
)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    taiKhoan_exists = db.query(
        exists().where(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
    ).scalar()

    if not taiKhoan_exists:
        raise HTTPException(
            status_code=404,
            detail=f"ma_taiKhoan '{ma_taiKhoan}' not found in taiKhoan",
        )

    db_object = (
        db.query(models.TinNhan)
        .filter(models.TinNhan.ma_taiKhoan == ma_taiKhoan)
        .all()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="TaiKhoan not found")
    return db_object
