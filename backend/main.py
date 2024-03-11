from fastapi import FastAPI,APIRouter,Depends,status,HTTPException
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from router import luuVetBaiLamKiemTra,chiTietBaiLamKiemTra,baiLamKiemTra,chiTietBaiKiemTra,cauTraLoi,cauHoi,deKiemTra,fileBaiLamBaiTap,baiLamBaiTap,fileBaiTap,nhomQuyen,taiKhoan,lopHoc,thamGiaLopHoc,nhomChat,tinNhan,chuong, hocLieu,fileHocLieu, banBe, tinNhanBanBe, baiTap
from sqlalchemy.orm import Session
from database import engine, get_db
import schemas, models, uvicorn, load_env_global

models.Base.metadata.create_all(bind=engine)
app = FastAPI()
main_route = APIRouter()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
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

app.include_router(main_route,prefix="/api")
@app.get("/")
async def hello():
    return {"message": "Hello world"}

print("\nNotice:\t Server is running at http://localhost:" + load_env_global.get_PORT() + "/docs\n")
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=load_env_global.get_PORT(), reload=True)
