from typing import List, Union

import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/thamGiaLopHoc", tags=["thamGiaLopHoc"])


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=Union[schemas.ThamGiaLopHoc, List[schemas.ThamGiaLopHoc]],
)
async def create(
    schema_objects: Union[
        schemas.ThamGiaLopHocCreate, List[schemas.ThamGiaLopHocCreate]
    ],
    db: Session = Depends(database.get_db),
):
    if isinstance(schema_objects, list):
        db_objects = []
        for schema_object in schema_objects:
            db_object = create_db_object_thamGiaLopHoc(schema_object, db)
            db_objects.append(db_object)
        return db_objects
    else:
        db_object = create_db_object_thamGiaLopHoc(schema_objects, db)
        return db_object


def create_db_object_thamGiaLopHoc(schema_object, db):
    ma_lopHoc = str(schema_object.ma_lopHoc)
    ma_taiKhoan = str(schema_object.ma_taiKhoan)

    # check ma_lopHoc
    db_object_check = (
        db.query(models.LopHoc)
        .filter(models.LopHoc.ma_lopHoc == ma_lopHoc)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_lopHoc not found")

    # check ma_taiKhoan
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")

    db_object = models.ThamGiaLopHoc(**schema_object.dict())
    db_object.ma_lopHoc = ma_lopHoc
    db_object.ma_taiKhoan = ma_taiKhoan

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.put(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=schemas.ThamGiaLopHoc,
)
def update(
    schema_object: schemas.ThamGiaLopHocUpdate,
    db: Session = Depends(database.get_db),
):
    # check ma_lopHoc
    db_object = (
        db.query(models.LopHoc)
        .filter(models.LopHoc.ma_lopHoc == schema_object.ma_lopHoc)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="LopHoc not found")

    # check ma_taiKhoan
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.ma_taiKhoan == schema_object.ma_taiKhoan)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_taiKhoan not found")

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


@router.delete("/", status_code=status.HTTP_200_OK)
async def delete(re, db: Session = Depends(database.get_db)):
    print(ma_lopHoc, ma_taiKhoan)
    db_object = (
        db.query(models.ThamGiaLopHoc)
        .filter(models.ThamGiaLopHoc.ma_lopHoc == ma_lopHoc)
        .filter(models.ThamGiaLopHoc.ma_taiKhoan == ma_taiKhoan)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="ThamGiaLopHoc not found")
    db.delete(db_object)
    db.commit()
    return {"detail": "Delete successfully"}


@router.get(
    "/",
    response_model=list[schemas.ThamGiaLopHoc],
    status_code=status.HTTP_200_OK,
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.ThamGiaLopHoc).all()
    return db_object


@router.get(
    "/lopHoc/{ma_lopHoc}",
    response_model=list[schemas.ThamGiaLopHoc],
    status_code=status.HTTP_200_OK,
)
async def read(ma_lopHoc: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.ThamGiaLopHoc)
        .filter(models.ThamGiaLopHoc.ma_lopHoc == ma_lopHoc)
        .all()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="LopHoc not found")
    return db_object


@router.get(
    "/taiKhoan/{ma_taiKhoan}",
    response_model=list[schemas.ThamGiaLopHoc],
    status_code=status.HTTP_200_OK,
)
async def read(ma_taiKhoan: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.ThamGiaLopHoc)
        .filter(models.ThamGiaLopHoc.ma_taiKhoan == ma_taiKhoan)
        .all()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="TaiKhoan not found")
    return db_object
