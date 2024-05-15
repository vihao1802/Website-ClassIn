import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/fileHocLieu", tags=["fileHocLieu"])


@router.post(
    "/{ma_hocLieu}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.FileHocLieu,
)
async def create(
    schema_object: schemas.FileHocLieuCreate,
    ma_hocLieu: str,
    db: Session = Depends(database.get_db),
):
    if schema_object.tenFile.strip() == "":
        raise HTTPException(status_code=400, detail="Invalid link")
    # check ma_lopHoc
    db_object_check = (
        db.query(models.HocLieu)
        .filter(models.HocLieu.ma_hocLieu == ma_hocLieu)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_hocLieu not found")

    db_object = models.FileHocLieu(
        **schema_object.dict(), ma_hocLieu=ma_hocLieu
    )

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.FileHocLieu).all()
    return db_object


@router.get("/{ma_hocLieu}", status_code=status.HTTP_200_OK)
async def read(ma_hocLieu: str, db: Session = Depends(database.get_db)):
    # check ma_hocLieu exists
    db_object = (
        db.query(models.HocLieu)
        .filter(models.HocLieu.ma_hocLieu == ma_hocLieu)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="ma_hocLieu not found")
    try:
        db_object = (
            db.query(models.FileHocLieu)
            .filter(models.FileHocLieu.ma_hocLieu == ma_hocLieu)
            .all()
        )
    except Exception as e:
        print(e)
    if db_object is None:
        raise HTTPException(status_code=400, detail="FileHocLieu not found")
    return db_object

@router.delete("/{ma_hocLieu}/{ma_file}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(ma_hocLieu: str, ma_file: str, db: Session = Depends(database.get_db)):
    # check ma_hocLieu exists
    db_object = (
        db.query(models.HocLieu)
        .filter(models.HocLieu.ma_hocLieu == ma_hocLieu)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="ma_hocLieu not found")
    # check ma_file exists
    db_file = (
        db.query(models.FileHocLieu)
        .filter(models.FileHocLieu.ma_file == ma_file)
        .first()
    )
    if db_file is None:
        raise HTTPException(status_code=400, detail="FileHocLieu not found")
    db.delete(db_file)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
