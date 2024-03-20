import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/nhomQuyen", tags=["nhomQuyen"])


@router.post(
    "/", status_code=status.HTTP_201_CREATED, response_model=schemas.NhomQuyen
)
def create(
    schema_object: schemas.NhomQuyenCreate,
    db: Session = Depends(database.get_db),
):
    db_object = models.NhomQuyen(
        **schema_object.dict()
    )  # convert schema to model
    db.add(db_object)  # add to database
    db.commit()  # s line commits the transaction to the database, making the changes permanent.
    db.refresh(
        db_object
    )  # This line refreshes the db_object with the most recent data from the database.
    return db_object


@router.put(
    "/{ma_nhomQuyen}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.NhomQuyen,
)
def update(
    schema_object: schemas.NhomQuyenCreate,
    ma_nhomQuyen: str,
    db: Session = Depends(database.get_db),
):
    db_object = (
        db.query(models.NhomQuyen)
        .filter(models.NhomQuyen.ma_nhomQuyen == ma_nhomQuyen)
        .first()
    )
    if db_object is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="NhomQuyen not found"
        )

    for field, value in schema_object.dict(exclude_unset=True).items():
        setattr(db_object, field, value)

    db.commit()
    db.refresh(db_object)
    return db_object


@router.get(
    "/", response_model=list[schemas.NhomQuyen], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.NhomQuyen).all()
    return db_object


@router.get("/{ma_nhomQuyen}", status_code=status.HTTP_200_OK)
async def read(ma_nhomQuyen: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.NhomQuyen)
        .filter(models.NhomQuyen.ma_nhomQuyen == ma_nhomQuyen)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="NhomQuyen not found")
    return db_object
