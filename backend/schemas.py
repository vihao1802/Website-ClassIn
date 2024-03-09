from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime

# For Swagger docs

class NhomQuyenBase(BaseModel):
    ten_nhomQuyen: str = Field(examples=["Admin"])


class NhomQuyenCreate(NhomQuyenBase):
    pass


class NhomQuyen(NhomQuyenBase):
    ma_nhomQuyen: UUID 

    class Config:
        from_attributes = True


# define class BaseModel
class TaiKhoanBase(BaseModel):
    hoTen: str = Field(examples=["hello"])
    email: str = Field(examples=["hello@gmail.com"])
    dienThoai: str = Field(examples=["0912345678"])
    anhDaiDien: str = Field(examples=["link_to_somewhere"])

# when receive form data or API request, this should validate and parse data to database
class TaiKhoanCreate(TaiKhoanBase):
    matKhau: str  

# Represents instances retrieved from the database, interaction with SQLAlchemy ORM objects.
class TaiKhoan(TaiKhoanBase):
    ma_taiKhoan: UUID 
    ma_nhomQuyen: UUID 

    class Config:
        from_attributes = True


class LopHocBase(BaseModel):
    ten: str
    moTa: str


class LopHocCreate(LopHocBase):
    pass


class LopHoc(LopHocBase):
    ma_lopHoc: UUID 
    anLopHoc: int 
    ma_taiKhoan: UUID 

    class Config:
        from_attributes = True

class ThamGiaLopHocBase(BaseModel):
    ma_lopHoc: UUID 
    ma_taiKhoan: UUID 


class ThamGiaLopHocCreate(ThamGiaLopHocBase):
    pass


class ThamGiaLopHoc(ThamGiaLopHocBase):
    class Config:
        from_attributes = True


class NhomChatBase(BaseModel):
    ten: str


class NhomChatCreate(NhomChatBase):
    pass


class NhomChat(NhomChatBase):
    ma_nhomChat: UUID 
    ma_lopHoc: UUID 

    class Config:
        from_attributes = True


class TinNhanBase(BaseModel):
    noiDung: str
    thoiGianGui: datetime



class TinNhanCreate(TinNhanBase):
    pass


class TinNhan(TinNhanBase):
    ma_tinNhan: UUID 
    ma_nhomChat: UUID 
    ma_taiKhoan: UUID 
    anTinNhan: int

    class Config:
        from_attributes = True


class ChuongBase(BaseModel):
    ten: str


class ChuongCreate(ChuongBase):
    pass


class Chuong(ChuongBase):
    ma_chuong: UUID 
    ma_lopHoc: UUID 
    thoiGianTao: datetime
    anChuong: int

    class Config:
        from_attributes = True


class HocLieuBase(BaseModel):
    tieuDe: str
    noiDung: str


class HocLieuCreate(HocLieuBase):
    pass


class HocLieu(HocLieuBase):
    ma_hocLieu: UUID 
    ma_chuong: UUID 

    class Config:
        from_attributes = True


class FileHocLieuBase(BaseModel):
    link: str


class FileHocLieuCreate(FileHocLieuBase):
    pass


class FileHocLieu(FileHocLieuBase):
    ma_hocLieu: UUID 

    class Config:
        from_attributes = True

class BanBeBase(BaseModel):
    thoiGianKetBan: datetime


class BanBeCreate(BanBeBase):
    pass


class BanBe(BanBeBase):
    ma_banBe: UUID 
    anBanBe: int
    ma_nguoiKetBan: UUID 
    ma_nguoiDuocKetBan: UUID 

    class Config:
        from_attributes = True


class TinNhanBanBeBase(BaseModel):
    noiDung: str
    thoiGianGui: datetime



class TinNhanBanBeCreate(TinNhanBanBeBase):
    pass


class TinNhanBanBe(TinNhanBanBeBase):
    anTinNhan: int
    ma_nguoiBanBe: UUID 
    ma_nguoiNguoiGui: UUID 
    ma_nguoiNguoiNhan: UUID 

    class Config:
        from_attributes = True


class BaiTapBase(BaseModel):
    tieuDe: str
    noiDung: str
    thoiGianTao: datetime
    thoiHan: datetime



class BaiTapCreate(BaiTapBase):
    pass


class BaiTap(BaiTapBase):
    ma_baiTap: UUID 
    daHoanThanh: int
    ma_chuong: UUID 

    class Config:
        from_attributes = True


class DapAnBaiTapBase(BaseModel):
    noiDung: str
    xemDapAn: int


class DapAnBaiTapCreate(DapAnBaiTapBase):
    pass


class DapAnBaiTap(DapAnBaiTapBase):
    ma_dapAnBaiTap:  UUID 
    ma_baiTap:  UUID 

    class Config:
        from_attributes = True


class FileDapAnBaiTapBase(BaseModel):
    link: str


class FileDapAnBaiTapCreate(FileDapAnBaiTapBase):
    pass


class FileDapAnBaiTap(FileDapAnBaiTapBase):
    ma_dapAnBaiTap: UUID 

    class Config:
        from_attributes = True


class FileBaiTapBase(BaseModel):
    link: str


class FileBaiTapCreate(FileBaiTapBase):
    pass


class FileBaiTap(FileBaiTapBase):
    ma_baiTap: UUID 

    class Config:
        from_attributes = True


class BaiLamBaiTapBase(BaseModel):
    noiDung: str
    thoiGianNopBai: datetime
    nhanXet: str
    diem: int



class BaiLamBaiTapCreate(BaiLamBaiTapBase):
    pass


class BaiLamBaiTap(BaiLamBaiTapBase):
    ma_baiLamBaiTap: UUID 
    ma_taiKhoan: UUID 
    ma_baiTap: UUID 

    class Config:
        from_attributes = True


class FileBaiLamBaiTapBase(BaseModel):
    link: str


class FileBaiLamBaiTapCreate(FileBaiLamBaiTapBase):
    pass


class FileBaiLamBaiTap(FileBaiLamBaiTapBase):
    ma_baiLamBaiTap: UUID 

    class Config:
        from_attributes = True


class DeKiemTraBase(BaseModel):
    tieuDe: str
    thoiGianTao: datetime
    thoiGianBatDau: datetime
    thoiGianNopBai: datetime
    xemDiem: int
    xemDapAn: int
    tronCauHoi: int



class DeKiemTraCreate(DeKiemTraBase):
    pass


class DeKiemTra(DeKiemTraBase):
    ma_deKiemTra: UUID 
    daHoanThanh: int
    anDeKiemTra: int
    ma_chuong: UUID 

    class Config:
        from_attributes = True


class CauHoiBase(BaseModel):
    noiDung: str
    giaiThich: str
    anCauHoi: int


class CauHoiCreate(CauHoiBase):
    pass


class CauHoi(CauHoiBase):
    ma_cauHoi: UUID 
    ma_taiKhoan: UUID 

    class Config:
        from_attributes = True


class CauTraLoiBase(BaseModel):
    noiDung: str



class CauTraLoiCreate(CauTraLoiBase):
    pass


class CauTraLoi(CauTraLoiBase):
    ma_cauTraLoi: UUID 
    laCauTraLoiDung: int
    ma_cauHoi: UUID 

    class Config:
        from_attributes = True


class ChiTietBaiKiemTraBase(BaseModel):
    thuTu: int



class ChiTietBaiKiemTraCreate(ChiTietBaiKiemTraBase):
    pass


class ChiTietBaiKiemTra(ChiTietBaiKiemTraBase):
    ma_deKiemTra: UUID 
    ma_cauHoi: UUID 

    class Config:
        from_attributes = True


class BaiLamKiemTraBase(BaseModel):
    thoiGianBatDauLam: datetime
    thoiGianNop: datetime
    diem: int
    soCauDung: int



class BaiLamKiemTraCreate(BaiLamKiemTraBase):
    pass


class BaiLamKiemTra(BaiLamKiemTraBase):
    ma_baiLamKiemTra: UUID 
    ma_taiKhoan: UUID 

    class Config:
        from_attributes = True


class ChiTietBaiLamKiemTraBase(BaseModel):
    ma_baiLamKiemTra: str
    ma_cauHoi: str
    ma_dapAnChon: str


class ChiTietBaiLamKiemTraCreate(ChiTietBaiLamKiemTraBase):
    pass


class ChiTietBaiLamKiemTra(ChiTietBaiLamKiemTraBase):
    class Config:
        from_attributes = True


