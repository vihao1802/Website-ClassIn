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
    ma_nhomChat: UUID 
    ma_taiKhoan: UUID 



class TinNhanCreate(TinNhanBase):
    pass


class TinNhan(TinNhanBase):
    ma_tinNhan: UUID 
    thoiGianGui: datetime
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
    ma_nguoiKetBan: UUID 
    ma_nguoiDuocKetBan: UUID 

class BanBeCreate(BanBeBase):
    pass


class BanBe(BanBeBase):
    ma_banBe: UUID 
    thoiGianKetBan: datetime
    daKetBan: int

    class Config:
        from_attributes = True


class TinNhanBanBeBase(BaseModel):
    ma_banBe: UUID 
    ma_nguoiGui: UUID 
    ma_nguoiNhan: UUID 
    noiDung: str


class TinNhanBanBeCreate(TinNhanBanBeBase):
    pass


class TinNhanBanBe(TinNhanBanBeBase):
    thoiGianGui: datetime
    anTinNhan: int

    class Config:
        from_attributes = True


class BaiTapBase(BaseModel):
    tieuDe: str
    noiDung: str
    thoiHan: datetime



class BaiTapCreate(BaiTapBase):
    pass


class BaiTap(BaiTapBase):
    ma_baiTap: UUID 
    ma_chuong: UUID 
    thoiGianTao: datetime
    daHoanThanh: int

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
    ma_taiKhoan: UUID 
    ma_baiTap: UUID 
    nhanXet: str
    diem: int



class BaiLamBaiTapCreate(BaiLamBaiTapBase):
    pass


class BaiLamBaiTap(BaiLamBaiTapBase):
    ma_baiLamBaiTap: UUID 
    thoiGianNopBai: datetime

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
    thoiGianBatDau: datetime
    thoiGianNopBai: datetime
    xemDiem: int
    xemDapAn: int
    tronCauHoi: int



class DeKiemTraCreate(DeKiemTraBase):
    pass


class DeKiemTra(DeKiemTraBase):
    ma_deKiemTra: UUID 
    ma_chuong: UUID 
    thoiGianTao: datetime
    daHoanThanh: int
    anDeKiemTra: int

    class Config:
        from_attributes = True


class CauHoiBase(BaseModel):
    noiDung: str
    giaiThich: str


class CauHoiCreate(CauHoiBase):
    pass


class CauHoi(CauHoiBase):
    ma_cauHoi: UUID 
    ma_taiKhoan: UUID 
    anCauHoi: int

    class Config:
        from_attributes = True


class CauTraLoiBase(BaseModel):
    noiDung: str
    laCauTraLoiDung: int


class CauTraLoiCreate(CauTraLoiBase):
    pass


class CauTraLoi(CauTraLoiBase):
    ma_cauTraLoi: UUID 
    ma_cauHoi: UUID 

    class Config:
        from_attributes = True


class ChiTietBaiKiemTraBase(BaseModel):
    ma_deKiemTra: UUID 
    ma_cauHoi: UUID 
    thuTu: int


class ChiTietBaiKiemTraCreate(ChiTietBaiKiemTraBase):
    pass


class ChiTietBaiKiemTra(ChiTietBaiKiemTraBase):

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
    ma_baiLamKiemTra: UUID
    ma_cauHoi: UUID
    ma_dapAnChon: UUID # ma_cauTraLoi


class ChiTietBaiLamKiemTraCreate(ChiTietBaiLamKiemTraBase):
    pass


class ChiTietBaiLamKiemTra(ChiTietBaiLamKiemTraBase):
    class Config:
        from_attributes = True


