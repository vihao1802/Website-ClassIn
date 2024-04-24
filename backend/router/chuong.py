import database
import models
import schemas
from fastapi import (
    APIRouter,
    Depends,
    FastAPI,
    HTTPException,
    Query,
    Response,
    status,
)
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


@router.put("/{ma_chuong}", status_code=status.HTTP_200_OK)
async def update(
    ma_chuong: str,
    schema_object: schemas.ChuongCreate,
    db: Session = Depends(database.get_db),
):
    db_object = (
        db.query(models.Chuong)
        .filter(models.Chuong.ma_chuong == ma_chuong)
        .first()
    )
    if not db_object:
        raise HTTPException(status_code=400, detail="Chuong not found")
    db.query(models.Chuong).filter(models.Chuong.ma_chuong == ma_chuong).update(
        schema_object.dict()
    )
    db.commit()
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


@router.get("/{ma_lopHoc}/hoatdong", status_code=status.HTTP_200_OK)
async def read(
    ma_lopHoc: str,
    search: str = None,
    act: str = None,
    db: Session = Depends(database.get_db),
):
    object_Chuong = (
        db.query(models.Chuong)
        .filter(models.Chuong.ma_lopHoc == ma_lopHoc)
        .all()
    )
    db_object = []
    for chuong in object_Chuong:
        object_DeKiemTra = (
            db.query(models.DeKiemTra)
            .filter(models.DeKiemTra.ma_chuong == chuong.ma_chuong)
            .all()
        )
        object_BaiTap = (
            db.query(models.BaiTap)
            .filter(models.BaiTap.ma_chuong == chuong.ma_chuong)
            .all()
        )
        object_HocLieu = (
            db.query(models.HocLieu)
            .filter(models.HocLieu.ma_chuong == chuong.ma_chuong)
            .all()
        )
        db_object.append(
            {
                "chuong": chuong,
                "deKiemTra": object_DeKiemTra,
                "baiTap": object_BaiTap,
                "hocLieu": object_HocLieu,
            }
        )

    if search:
        print("Dang o trong search: ", search)
        db_search_object = []
        for chuong in db_object:
            dkt_object = [
                dkt
                for dkt in chuong["deKiemTra"]
                if search.lower() in dkt.tieuDe.lower()
            ]
            bt_object = [
                bt
                for bt in chuong["baiTap"]
                if search.lower() in bt.tieuDe.lower()
            ]
            hl_object = [
                hl
                for hl in chuong["hocLieu"]
                if search.lower() in hl.tieuDe.lower()
            ]
            if not dkt_object and not bt_object and not hl_object:
                continue
            db_search_object.append(
                {
                    "chuong": chuong["chuong"],
                    "deKiemTra": dkt_object,
                    "baiTap": bt_object,
                    "hocLieu": hl_object,
                }
            )
        db_object = db_search_object

    if act.lower() != "all" and act is not None:
        print("Dang o trong act: ", act)
        db_act_object = []
        for chuong in db_object:
            dkt_object = [dkt for dkt in chuong["deKiemTra"]]
            bt_object = [bt for bt in chuong["baiTap"]]
            hl_object = [hl for hl in chuong["hocLieu"]]
            if act == "dkt":
                bt_object = []
                hl_object = []
            elif act == "bt":
                dkt_object = []
                hl_object = []
            elif act == "hl":
                dkt_object = []
                bt_object = []
            if not dkt_object and not bt_object and not hl_object:
                continue
            db_act_object.append(
                {
                    "chuong": chuong["chuong"],
                    "deKiemTra": dkt_object,
                    "baiTap": bt_object,
                    "hocLieu": hl_object,
                }
            )
        db_object = db_act_object

    return db_object
