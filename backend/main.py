import load_env_global
import models
import uvicorn
from database import engine
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import (
    baiLamBaiTap,
    baiLamKiemTra,
    baiTap,
    banBe,
    cauHoi,
    cauTraLoi,
    chiTietBaiKiemTra,
    chiTietBaiLamKiemTra,
    chuong,
    deKiemTra,
    fileBaiLamBaiTap,
    fileBaiTap,
    fileHocLieu,
    hocLieu,
    lopHoc,
    luuVetBaiLamKiemTra,
    nhomChat,
    nhomQuyen,
    taiKhoan,
    thamGiaLopHoc,
    tinNhan,
    tinNhanBanBe,
)

models.Base.metadata.create_all(bind=engine)
app = FastAPI()
main_route = APIRouter()
origins = ["http://localhost:3000", "localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
main_route.include_router(nhomQuyen.router)
main_route.include_router(taiKhoan.router)
main_route.include_router(lopHoc.router)
main_route.include_router(thamGiaLopHoc.router)
main_route.include_router(nhomChat.router)
main_route.include_router(tinNhan.router)
main_route.include_router(chuong.router)
main_route.include_router(hocLieu.router)
main_route.include_router(fileHocLieu.router)
main_route.include_router(banBe.router)
main_route.include_router(tinNhanBanBe.router)
main_route.include_router(baiTap.router)
main_route.include_router(fileBaiTap.router)
main_route.include_router(baiLamBaiTap.router)
main_route.include_router(fileBaiLamBaiTap.router)
main_route.include_router(deKiemTra.router)
main_route.include_router(cauHoi.router)
main_route.include_router(cauTraLoi.router)
main_route.include_router(chiTietBaiKiemTra.router)
main_route.include_router(baiLamKiemTra.router)
main_route.include_router(chiTietBaiLamKiemTra.router)
main_route.include_router(luuVetBaiLamKiemTra.router)

app.include_router(main_route, prefix="/api")


@app.get("/")
async def hello():
    return {"message": "Hello world"}


print(
    "\nNotice:\t Server is running at http://localhost:"
    + load_env_global.get_PORT()
    + "/docs\n"
)
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=load_env_global.get_PORT(),
        reload=True,
    )
