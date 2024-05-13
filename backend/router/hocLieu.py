import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/hocLieu", tags=["hocLieu"])


@router.post(
    "/{ma_chuong}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.HocLieu,
)
async def create(
    schema_object: schemas.HocLieuCreate,
    ma_chuong: str,
    db: Session = Depends(database.get_db),
):
    if schema_object.tieuDe.strip() == "":
        raise HTTPException(status_code=400, detail="Invalid tieuDe")
    if schema_object.noiDung.strip() == "":
        raise HTTPException(status_code=400, detail="Invalid noiDung")
    # check ma_lopHoc
    db_object_check = (
        db.query(models.Chuong)
        .filter(models.Chuong.ma_chuong == ma_chuong)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")

    db_object = models.HocLieu(**schema_object.dict(), ma_chuong=ma_chuong)

    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/", response_model=list[schemas.HocLieu], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.HocLieu).all()
    return db_object


@router.get("/{ma_hocLieu}", status_code=status.HTTP_200_OK)
async def read(ma_hocLieu: str, db: Session = Depends(database.get_db)):
    try:
        db_object = (
            db.query(models.HocLieu)
            .filter(models.HocLieu.ma_hocLieu == ma_hocLieu)
            .first()
        )
    except Exception as e:
        print(e)
    if db_object is None:
        raise HTTPException(status_code=400, detail="HocLieu not found")
    return db_object


@router.get("/chuong/{ma_chuong}", status_code=status.HTTP_200_OK)
async def read(ma_chuong: str, db: Session = Depends(database.get_db)):
    # check ma_chuong exists
    db_object = (
        db.query(models.Chuong)
        .filter(models.Chuong.ma_chuong == ma_chuong)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="ma_chuong not found")
    try:
        db_object = (
            db.query(models.HocLieu)
            .filter(models.HocLieu.ma_chuong == ma_chuong)
            .all()
        )
    except Exception as e:
        print(e)
    if not db_object:
        raise HTTPException(status_code=400, detail="Chuong not found")
    return db_object


@router.put("/{ma_hocLieu}", status_code=status.HTTP_200_OK)
async def update(
    ma_hocLieu: str,
    schema_object: schemas.HocLieuCreate,
    db: Session = Depends(database.get_db),
):
    db_object = (
        db.query(models.HocLieu)
        .filter(models.HocLieu.ma_hocLieu == ma_hocLieu)
        .first()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="HocLieu not found")
    db.query(models.HocLieu).filter(models.HocLieu.ma_hocLieu == ma_hocLieu).update(
        schema_object.dict()
    )
    db.commit()
    return db_object