import uuid
from datetime import datetime

from database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


def generate_uuid():
    return str(uuid.uuid4())


# Column(String) default 255 characters


class NhomQuyen(Base):
    __tablename__ = "nhomQuyen"

    ma_nhomQuyen = Column(String, primary_key=True, default=generate_uuid)
    ten_nhomQuyen = Column(String(50), nullable=False)


class TaiKhoan(Base):
    __tablename__ = "taiKhoan"

    ma_taiKhoan = Column(String, primary_key=True, default=generate_uuid)
    hoTen = Column(String)
    email = Column(String, unique=True, index=True)
    matKhau = Column(String)
    dienThoai = Column(String(15))
    anhDaiDien = Column(String)

    ma_nhomQuyen = Column(String, ForeignKey("nhomQuyen.ma_nhomQuyen"))


class LopHoc(Base):
    __tablename__ = "lopHoc"

    ma_lopHoc = Column(String, primary_key=True, default=generate_uuid)
    ten = Column(String)
    moTa = Column(String(500))
    anLopHoc = Column(Integer, default=0)
    anhDaiDien = Column(String)

    ma_giangVien = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))


class ThamGiaLopHoc(Base):
    __tablename__ = "thamGiaLopHoc"

    ma_lopHoc = Column(String, ForeignKey("lopHoc.ma_lopHoc"), primary_key=True)
    ma_taiKhoan = Column(
        String, ForeignKey("taiKhoan.ma_taiKhoan"), primary_key=True
    )


class NhomChat(Base):
    __tablename__ = "nhomChat"

    ma_nhomChat = Column(String, primary_key=True, default=generate_uuid)
    ten = Column(String)

    ma_lopHoc = Column(String, ForeignKey("lopHoc.ma_lopHoc"))


class TinNhan(Base):
    __tablename__ = "tinNhan"

    ma_tinNhan = Column(String, primary_key=True, default=generate_uuid)
    noiDung = Column(String(300))
    thoiGianGui = Column(DateTime, default=datetime.now)
    anTinNhan = Column(Integer, default=0)

    ma_nhomChat = Column(String, ForeignKey("nhomChat.ma_nhomChat"))
    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))


class Chuong(Base):
    __tablename__ = "chuong"

    ma_chuong = Column(String, primary_key=True, default=generate_uuid)
    ten = Column(String(100))
    thoiGianTao = Column(DateTime, default=datetime.now)
    anChuong = Column(Integer, default=0)

    ma_lopHoc = Column(String, ForeignKey("lopHoc.ma_lopHoc"))


class HocLieu(Base):
    __tablename__ = "hocLieu"

    ma_hocLieu = Column(String, primary_key=True, default=generate_uuid)
    tieuDe = Column(String(100))
    noiDung = Column(String(300))
    thoiGianTao = Column(DateTime, default=datetime.now)
    daXoa = Column(Integer, default=0)

    ma_chuong = Column(String, ForeignKey("chuong.ma_chuong"))


class FileHocLieu(Base):
    __tablename__ = "fileHocLieu"

    ma_file = Column(String, primary_key=True, default=generate_uuid)
    tenFile = Column(String)

    ma_hocLieu = Column(String, ForeignKey("hocLieu.ma_hocLieu"))


class BanBe(Base):
    __tablename__ = "banBe"

    thoiGianKetBan = Column(DateTime, default=datetime.now)
    daKetBan = Column(Integer, default=0)

    ma_nguoiKetBan = Column(
        String, ForeignKey("taiKhoan.ma_taiKhoan"), primary_key=True
    )
    ma_nguoiDuocKetBan = Column(
        String, ForeignKey("taiKhoan.ma_taiKhoan"), primary_key=True
    )


class TinNhanBanBe(Base):
    __tablename__ = "tinNhanBanBe"

    noiDung = Column(String(300))
    thoiGianGui = Column(DateTime, default=datetime.now)
    daXoa = Column(Integer, default=0)

    ma_tinNhan = Column(String, primary_key=True, default=generate_uuid)
    ma_nguoiGui = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))
    ma_nguoiNhan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))


class BaiTap(Base):
    __tablename__ = "baiTap"

    ma_baiTap = Column(String, primary_key=True, default=generate_uuid)
    tieuDe = Column(String(100))
    noiDungBaiTap = Column(String(300))
    noiDungDapAn = Column(String(300))
    thoiGianTao = Column(DateTime, default=datetime.now)
    thoiGianBatDau = Column(DateTime)
    thoiGianKetThuc = Column(DateTime)
    congKhaiDapAn = Column(Integer)
    daXoa = Column(Integer, default=0)
    nopBu = Column(Integer, default=0)

    ma_chuong = Column(String, ForeignKey("chuong.ma_chuong"))


class FileBaiTap(Base):
    __tablename__ = "fileBaiTap"

    ma_file = Column(String, primary_key=True, default=generate_uuid)
    tenFile = Column(String(100))
    laFileDapAn = Column(Integer)

    ma_baiTap = Column(String, ForeignKey("baiTap.ma_baiTap"), primary_key=True)


class BaiLamBaiTap(Base):
    __tablename__ = "baiLamBaiTap"

    ma_baiLamBaiTap = Column(String, primary_key=True, default=generate_uuid)
    noiDung = Column(String(500))
    thoiGianNopBai = Column(DateTime, default=datetime.now)
    nhanXet = Column(String(200))
    diem = Column(Integer)
    nopTre = Column(Integer)

    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))
    ma_baiTap = Column(String, ForeignKey("baiTap.ma_baiTap"))


class FileBaiLamBaiTap(Base):
    __tablename__ = "fileBaiLamBaiTap"

    ma_file = Column(String, primary_key=True, default=generate_uuid)
    tenFile = Column(String(100))

    ma_baiLamBaiTap = Column(
        String, ForeignKey("baiLamBaiTap.ma_baiLamBaiTap"), primary_key=True
    )


class DeKiemTra(Base):
    __tablename__ = "deKiemTra"

    ma_deKiemTra = Column(String, primary_key=True, default=generate_uuid)
    tieuDe = Column(String(50))
    thoiGianTao = Column(DateTime, default=datetime.now)
    thoiGianBatDau = Column(DateTime)  # thoi gian giao bai cua giang vien
    thoiGianKetThuc = Column(DateTime)  # thoi gian het han nop bai
    thoiGianLamBai = Column(Integer)  # khoang thoi gian lam bai cua hoc sinh
    xemDapAn = Column(Integer)
    tronCauHoi = Column(Integer)
    daXoa = Column(Integer, default=0)
    hinhPhat = Column(Integer)

    ma_chuong = Column(String, ForeignKey("chuong.ma_chuong"))


class CauHoi(Base):
    __tablename__ = "cauHoi"

    ma_cauHoi = Column(String, primary_key=True, default=generate_uuid)
    noiDung = Column(String(300))
    daXoa = Column(Integer, default=0)

    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))


class CauTraLoi(Base):
    __tablename__ = "cauTraLoi"

    ma_cauTraLoi = Column(String, primary_key=True, default=generate_uuid)
    noiDung = Column(String(300))
    laCauTraLoiDung = Column(Integer)

    ma_cauHoi = Column(String, ForeignKey("cauHoi.ma_cauHoi"))


class ChiTietBaiKiemTra(Base):
    __tablename__ = "chiTietBaiKiemTra"

    thuTu = Column(Integer)

    ma_deKiemTra = Column(
        String, ForeignKey("deKiemTra.ma_deKiemTra"), primary_key=True
    )
    ma_cauHoi = Column(String, ForeignKey("cauHoi.ma_cauHoi"), primary_key=True)


class BaiLamKiemTra(Base):
    __tablename__ = "baiLamKiemTra"

    ma_baiLamKiemTra = Column(String, primary_key=True, default=generate_uuid)
    thoiGianNopBai = Column(DateTime)
    thoiGianBatDauLam = Column(DateTime)
    diem = Column(Integer)
    nopTre = Column(Integer)
    soCauDung = Column(Integer)

    ma_deKiemTra = Column(String, ForeignKey("deKiemTra.ma_deKiemTra"))
    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))


class ChiTietBaiLamKiemTra(Base):
    __tablename__ = "chiTietBaiLamKiemTra"

    thuTu = Column(Integer)

    ma_baiLamKiemTra = Column(
        String, ForeignKey("baiLamKiemTra.ma_baiLamKiemTra"), primary_key=True
    )
    ma_cauHoi = Column(String, ForeignKey("cauHoi.ma_cauHoi"), primary_key=True)
    ma_dapAnChon = Column(
        String, ForeignKey("cauTraLoi.ma_cauTraLoi"), nullable=True
    )


class LuuVetBaiLamKiemTra(Base):
    __tablename__ = "luuVetBaiLamKiemTra"

    email = Column(String)

    ma_deKiemTra = Column(
        String, ForeignKey("deKiemTra.ma_deKiemTra"), primary_key=True
    )
    ma_cauHoi = Column(String, ForeignKey("cauHoi.ma_cauHoi"), primary_key=True)
    ma_dapAnChon = Column(
        String, ForeignKey("cauTraLoi.ma_cauTraLoi"), primary_key=True
    )
