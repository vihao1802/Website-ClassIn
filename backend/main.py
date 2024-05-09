import jwt
import load_env_global
import models
import uvicorn
from database import engine
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from router import (
    auth,
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
    google_auth,
    hocLieu,
    lopHoc,
    luuVetBaiLamKiemTra,
    nhomChat,
    nhomQuyen,
    taiKhoan,
    thamGiaLopHoc,
    tinNhan,
    tinNhanBanBe,
    webSocket,
)

models.Base.metadata.create_all(bind=engine)
app = FastAPI()
main_route = APIRouter()
origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://192.168.110.46:3000",
    "http://192.168.1.103:3000",
    "http://192.168.235.220:8000",
    "http://192.168.224.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def verify_token_middleware(request: Request):
    token = request.cookies.get("user_token")
    if not token:
        raise HTTPException(status_code=401, detail="Invalid token")
    try:
        payload = jwt.decode(
            token,
            load_env_global.get_JWT_SECRET(),
            algorithms=[load_env_global.get_JWT_ALGORITHM()],
        )
        request.user_data = payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return request


main_route.include_router(
    nhomQuyen.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    google_auth.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    taiKhoan.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    thamGiaLopHoc.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    nhomChat.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    tinNhan.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    chuong.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    hocLieu.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    fileHocLieu.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    banBe.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    tinNhanBanBe.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    baiTap.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    fileBaiTap.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    baiLamBaiTap.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    fileBaiLamBaiTap.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    deKiemTra.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    cauHoi.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    cauTraLoi.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    chiTietBaiKiemTra.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    baiLamKiemTra.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    chiTietBaiLamKiemTra.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(
    lopHoc.router, dependencies=[Depends(verify_token_middleware)]
)
main_route.include_router(auth.auth, prefix="/auth")
main_route.include_router(webSocket.router)
app.include_router(main_route, prefix="/api")


@app.get("/")
async def hello():
    return {"message": "Hello world"}


print(
    "\nNotice:\t Server is running at http://localhost:"
    + load_env_global.get_PORT()
    + "/docs\n"
)
# if __name__ == "__main__":
#     uvicorn.run(
#         "main:app",
#         host="127.0.0.1",
#         port=load_env_global.get_PORT(),
#         reload=True,
#     )
