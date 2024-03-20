import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/chuong", tags=["chuong"])


@router.post(
    "/{ma_lopHoc}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.Chuong,
)
async def create(
    schema_object: schemas.ChuongCreate,
    ma_lopHoc: str,
    db: Session = Depends(database.get_db),
):
    if schema_object.ten.strip() == "":
        raise HTTPException(status_code=400, detail="Invalid ten")
    # check ma_lopHoc
    db_object_check = (
        db.query(models.LopHoc)
        .filter(models.LopHoc.ma_lopHoc == ma_lopHoc)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_lopHoc not found")

    db_object = models.Chuong(**schema_object.dict(), ma_lopHoc=ma_lopHoc)

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/", response_model=list[schemas.Chuong], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.Chuong).all()
    return db_object


@router.get("/{ma_chuong}", status_code=status.HTTP_200_OK)
async def read(ma_chuong: str, db: Session = Depends(database.get_db)):
    try:
        db_object = (
            db.query(models.Chuong)
            .filter(models.Chuong.ma_chuong == ma_chuong)
            .first()
        )
    except Exception as e:
        print(e)
    if not db_object:
        raise HTTPException(status_code=400, detail="Chuong not found")
    return db_object


@router.get(
    "/lopHoc/{ma_lopHoc}",
    response_model=list[schemas.Chuong],
    status_code=status.HTTP_200_OK,
)
async def read(ma_lopHoc: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.Chuong)
        .filter(models.Chuong.ma_lopHoc == ma_lopHoc)
        .all()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="ma_lopHoc not found")
    return db_object
