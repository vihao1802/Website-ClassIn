import database
import models
import schemas
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/nhomChat", tags=["nhomChat"])


@router.post(
    "/{ma_lopHoc}",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.NhomChat,
)
async def create(
    schema_object: schemas.NhomChatCreate,
    ma_lopHoc: str,
    db: Session = Depends(database.get_db),
):
    # check ten
    if schema_object.ten.strip() == "":
        raise HTTPException(status_code=400, detail="Invalid ten")
    if len(schema_object.ten) > 50:
        raise HTTPException(
            status_code=400, detail="ten must be less than 50 characters"
        )

    # check ma_lopHoc
    db_object_check = (
        db.query(models.LopHoc)
        .filter(models.LopHoc.ma_lopHoc == ma_lopHoc)
        .first()
    )
    if db_object_check is None:
        raise HTTPException(status_code=400, detail="ma_lopHoc not found")

    db_object = models.NhomChat(**schema_object.dict(), ma_lopHoc=ma_lopHoc)
    db.add(db_object)
    db.commit()
    db.refresh(db_object)
    return db_object


@router.put(
    "/{ma_nhomChat}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.NhomChat,
)
def update(
    schema_object: schemas.NhomChatCreate,
    ma_nhomChat: str,
    db: Session = Depends(database.get_db),
):
    # check tens
    if schema_object.ten.strip() == "":
        raise HTTPException(status_code=400, detail="Invalid ten")
    if len(schema_object.ten) > 50:
        raise HTTPException(
            status_code=400, detail="ten must be less than 50 characters"
        )

    # check ma_nhomChat
    db_object = (
        db.query(models.NhomChat)
        .filter(models.NhomChat.ma_nhomChat == ma_nhomChat)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="NhomChat not found")

    for field, value in schema_object.dict(
        exclude_unset=True
    ).items():  # exclude_unset=True: ignore None value
        setattr(
            db_object, field, value
        )  # set value to field from schema_object to db_object

    db.commit()
    db.refresh(db_object)  # update the db_object data from the database.
    return db_object


@router.get(
    "/", response_model=list[schemas.NhomChat], status_code=status.HTTP_200_OK
)
async def read(db: Session = Depends(database.get_db)):
    db_object = db.query(models.NhomChat).all()
    return db_object


@router.get("/{ma_nhomChat}", status_code=status.HTTP_200_OK)
async def read(ma_nhomChat: str, db: Session = Depends(database.get_db)):
    db_object = (
        db.query(models.NhomChat)
        .filter(models.NhomChat.ma_nhomChat == ma_nhomChat)
        .first()
    )
    if db_object is None:
        raise HTTPException(status_code=400, detail="NhomChat not found")
    return db_object
