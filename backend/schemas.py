from datetime import datetime
from typing import Optional, Union
from uuid import UUID

from pydantic import BaseModel, Field

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


class TaiKhoanUpdate(TaiKhoanBase):
    matKhau: str
    ma_nhomQuyen: UUID


class TaiKhoanUpdateInfo(BaseModel):
    hoTen: str = Field(examples=["hello"])
    email: str = Field(examples=["hello@gmail.com"])
    dienThoai: str = Field(examples=["0912345678"])


class TaiKhoanUpdatePassword(BaseModel):
    currentPassword: str
    newPassword: str


# Represents instances retrieved from the database, interaction with SQLAlchemy ORM objects.
class TaiKhoan(TaiKhoanBase):
    ma_taiKhoan: UUID
    ma_nhomQuyen: UUID

    class Config:
        from_attributes = True


class InewAccount(TaiKhoanCreate):
    ma_nhomQuyen: UUID = Field(example="8cb96e51-9749-40c9-9799-bb5e25057816")
    cfm_password: str = Field(examples=["Abcd@123"])


class LopHocBase(BaseModel):
    ten: str
    moTa: str
    anhDaiDien: str


class LopHocCreate(LopHocBase):
    pass


class LopHocUpdate(LopHocBase):
    anLopHoc: int
    ma_giangVien: str


class LopHoc(LopHocBase):
    ma_lopHoc: UUID
    anLopHoc: int
    ma_giangVien: UUID

    class Config:
        from_attributes = True


class ThamGiaLopHocBase(BaseModel):
    ma_lopHoc: UUID
    ma_taiKhoan: UUID


class ThamGiaLopHocCreate(ThamGiaLopHocBase):
    pass


class ThamGiaLopHocUpdate(ThamGiaLopHocBase):
    ma_lopHoc: str
    ma_taiKhoan: str


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
    daXoa: int
    thoiGianTao: datetime

    class Config:
        from_attributes = True


class FileHocLieuBase(BaseModel):
    ma_file: str
    tenFile: str


class FileHocLieuCreate(FileHocLieuBase):
    pass


class FileHocLieu(FileHocLieuBase):
    ma_file: str
    ma_hocLieu: UUID
    tenFile: str

    class Config:
        from_attributes = True


class BanBeBase(BaseModel):
    ma_nguoiKetBan: UUID
    ma_nguoiDuocKetBan: UUID


class BanBeCreate(BanBeBase):
    pass


class BanBe(BanBeBase):
    thoiGianKetBan: datetime
    daKetBan: int

    class Config:
        from_attributes = True


class TinNhanBanBeBase(BaseModel):
    ma_nguoiGui: UUID
    ma_nguoiNhan: UUID
    noiDung: str


class TinNhanBanBeCreate(TinNhanBanBeBase):
    pass


class TinNhanBanBe(TinNhanBanBeBase):
    ma_tinNhan: UUID
    thoiGianGui: datetime
    daXoa: int

    class Config:
        from_attributes = True


class BaiTapBase(BaseModel):
    tieuDe: str
    noiDungBaiTap: str
    noiDungDapAn: str
    thoiGianBatDau: datetime
    thoiGianKetThuc: datetime
    congKhaiDapAn: int


class BaiTapCreate(BaiTapBase):
    nopBu: int


class BaiTapUpdate(BaiTapBase):
    pass


class BaiTap(BaiTapBase):
    ma_baiTap: UUID
    ma_chuong: UUID
    thoiGianTao: datetime
    daXoa: int
    nopBu: int

    class Config:
        from_attributes = True


class FileBaiTapBase(BaseModel):
    tenFile: str
    laFileDapAn: int
    ma_file: str


class FileBaiTapCreate(FileBaiTapBase):
    isYoutubeLink: int

    class Config:
        from_attributes = True


class FileBaiTap(FileBaiTapBase):
    ma_baiTap: UUID

    class Config:
        from_attributes = True


class BaiLamBaiTapBase(BaseModel):
    noiDung: str
    ma_taiKhoan: UUID
    ma_baiTap: UUID
    nhanXet: str
    diem: float
    nopTre: int


class BaiLamBaiTapCreate(BaiLamBaiTapBase):
    pass


class BaiLamBaiTapUpdate(BaseModel):

    nhanXet: str
    diem: float


class BaiLamBaiTap(BaiLamBaiTapBase):
    ma_baiLamBaiTap: UUID
    thoiGianNopBai: datetime

    class Config:
        from_attributes = True


class FileBaiLamBaiTapBase(BaseModel):
    tenFile: str
    ma_file: str


class FileBaiLamBaiTapCreate(FileBaiLamBaiTapBase):
    tenFile: str
    ma_file: str


class FileBaiLamBaiTap(FileBaiLamBaiTapBase):
    ma_baiLamBaiTap: UUID

    class Config:
        from_attributes = True


class DeKiemTraBase(BaseModel):
    tieuDe: str
    thoiGianBatDau: datetime
    thoiGianKetThuc: datetime
    thoiGianLamBai: int
    xemDapAn: int
    tronCauHoi: int
    hinhPhat: int


class DeKiemTraCreate(DeKiemTraBase):
    pass


class DeKiemTraUpdate(BaseModel):
    tieuDe: str


class DeKiemTra(DeKiemTraBase):
    ma_deKiemTra: UUID
    ma_chuong: UUID
    thoiGianTao: datetime
    daXoa: int

    class Config:
        from_attributes = True


class CauHoiBase(BaseModel):
    noiDung: str


class CauHoiCreate(CauHoiBase):
    pass


class CauHoi(CauHoiBase):
    ma_cauHoi: UUID
    ma_taiKhoan: UUID
    daXoa: int

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
    ma_taiKhoan: UUID
    ma_deKiemTra: UUID
    thoiGianNopBai: datetime
    thoiGianBatDauLam: datetime
    diem: float
    nopTre: int
    soCauDung: int


class BaiLamKiemTraCreate(BaiLamKiemTraBase):
    pass


class BaiLamKiemTra(BaiLamKiemTraBase):
    ma_baiLamKiemTra: UUID

    class Config:
        from_attributes = True


class ChiTietBaiLamKiemTraBase(BaseModel):
    ma_baiLamKiemTra: UUID
    ma_cauHoi: UUID
    ma_dapAnChon: Union[UUID, None] = None  # ma_cauTraLoi
    thuTu: int


class ChiTietBaiLamKiemTraCreate(ChiTietBaiLamKiemTraBase):
    pass


class ChiTietBaiLamKiemTra(ChiTietBaiLamKiemTraBase):
    class Config:
        from_attributes = True


class LuuVetBaiLamKiemTraBase(BaseModel):
    ma_deKiemTra: UUID
    ma_cauHoi: UUID
    ma_dapAnChon: UUID  # ma_cauTraLoi
    email: str = Field(examples=["abc@gmail.com"])


class LuuVetBaiLamKiemTraCreate(LuuVetBaiLamKiemTraBase):
    pass


class LuuVetBaiLamKiemTra(LuuVetBaiLamKiemTraBase):
    class Config:
        from_attributes = True
