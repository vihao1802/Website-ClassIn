from sqlalchemy import DateTime, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime 
import uuid

def generate_uuid():
    return str(uuid.uuid4())

#Column(String) default 255 characters

class NhomQuyen(Base):
    __tablename__ = "nhomQuyen"

    ma_nhomQuyen = Column(String, primary_key=True,default=generate_uuid)
    ten_nhomQuyen = Column(String(50), nullable=False)


class TaiKhoan(Base):
    __tablename__ = "taiKhoan"

    ma_taiKhoan = Column(String, primary_key=True,default=generate_uuid)
    hoTen = Column(String)
    email = Column(String, unique=True, index=True)
    matKhau = Column(String) 
    dienThoai = Column(String(15))
    anhDaiDien = Column(String)

    ma_nhomQuyen = Column(String, ForeignKey("nhomQuyen.ma_nhomQuyen"))
    
class LopHoc(Base):
    __tablename__ = "lopHoc"

    ma_lopHoc = Column(String,primary_key=True,default=generate_uuid)
    ten = Column(String)
    moTa = Column(String(500))
    anLopHoc = Column(Integer,default=0)

    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))

class ThamGiaLopHoc(Base):
    __tablename__ = "thamGiaLopHoc"

    ma_lopHoc = Column(String, ForeignKey("lopHoc.ma_lopHoc"),primary_key=True)
    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"),primary_key=True)

class NhomChat(Base):
    __tablename__ = "nhomChat"

    ma_nhomChat = Column(String,primary_key=True,default=generate_uuid)
    ten = Column(String)

    ma_lopHoc = Column(String, ForeignKey("lopHoc.ma_lopHoc"))

class TinNhan(Base):
    __tablename__ = "tinNhan"

    ma_tinNhan = Column(String,primary_key=True,default=generate_uuid)
    noiDung = Column(String(300))
    thoiGianGui = Column(DateTime,default=datetime.now)
    anTinNhan = Column(Integer,default=0)

    ma_nhomChat = Column(String, ForeignKey("nhomChat.ma_nhomChat"))
    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))

class Chuong(Base):
    __tablename__ = "chuong"

    ma_chuong = Column(String,primary_key=True,default=generate_uuid)
    ten = Column(String(100))
    thoiGianTao = Column(DateTime,default=datetime.now)
    anChuong = Column(Integer,default=0)

    ma_lopHoc = Column(String, ForeignKey("lopHoc.ma_lopHoc"))

class HocLieu(Base):
    __tablename__ = "hocLieu"

    ma_hocLieu = Column(String,primary_key=True,default=generate_uuid)
    tieuDe = Column(String(100))
    noiDung = Column(String(300))

    ma_chuong = Column(String, ForeignKey("chuong.ma_chuong"))

class FileHocLieu(Base):
    __tablename__ = "fileHocLieu"

    link = Column(String)

    ma_hocLieu = Column(String, ForeignKey("hocLieu.ma_hocLieu"),primary_key=True)

class BanBe(Base):
    __tablename__ = "banBe"

    ma_banBe = Column(String,primary_key=True,default=generate_uuid)
    thoiGianKetBan = Column(DateTime,default=datetime.now)
    daKetBan = Column(Integer,default=0)

    ma_nguoiKetBan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))
    ma_nguoiDuocKetBan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))

class TinNhanBanBe(Base):
    __tablename__ = "tinNhanBanBe"

    noiDung = Column(String(300))
    thoiGianGui = Column(DateTime,default=datetime.now)
    anTinNhan = Column(Integer,default=0)

    ma_banBe = Column(String, ForeignKey("banBe.ma_banBe"),primary_key=True)
    ma_nguoiGui = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"),primary_key=True)  
    ma_nguoiNhan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"),primary_key=True)

class BaiTap(Base):
    __tablename__ = "baiTap"

    ma_baiTap = Column(String,primary_key=True,default=generate_uuid)
    tieuDe = Column(String(100))
    noiDung = Column(String(300))
    thoiGianTao = Column(DateTime,default=datetime.now)
    thoiHan = Column(DateTime)
    daHoanThanh = Column(Integer,default=0)

    ma_chuong = Column(String, ForeignKey("chuong.ma_chuong"))

class DapAnBaiTap(Base):
    __tablename__ = "dapAnBaiTap"

    ma_dapAnBaiTap = Column(String,primary_key=True,default=generate_uuid)
    noiDung = Column(String(300))
    xemDapAn = Column(Integer,default=0)

    ma_baiTap = Column(String, ForeignKey("baiTap.ma_baiTap"))   

class FileDapAnBaiTap(Base):
    __tablename__ = "fileDapAnBaiTap"

    link = Column(String(100))

    ma_dapAnBaiTap = Column(String, ForeignKey("dapAnBaiTap.ma_dapAnBaiTap"),primary_key=True)    

class FileBaiTap(Base):
    __tablename__ = "fileBaiTap"

    link = Column(String(100))

    ma_baiTap = Column(String, ForeignKey("baiTap.ma_baiTap"),primary_key=True)    

class BaiLamBaiTap(Base):
    __tablename__ = "baiLamBaiTap"

    ma_baiLamBaiTap = Column(String,primary_key=True,default=generate_uuid)
    noiDung = Column(String(500))
    thoiGianNopBai = Column(DateTime,default=datetime.now)
    nhanXet = Column(String(200))
    diem = Column(Integer)

    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))
    ma_baiTap = Column(String, ForeignKey("baiTap.ma_baiTap")) 

class FileBaiLamBaiTap(Base):
    __tablename__ = "fileBaiLamBaiTap"

    link = Column(String(100))

    ma_baiLamBaiTap = Column(String, ForeignKey("baiLamBaiTap.ma_baiLamBaiTap"),primary_key=True)   

class DeKiemTra(Base):
    __tablename__ = "deKiemTra"

    ma_deKiemTra = Column(String,primary_key=True,default=generate_uuid)
    tieuDe = Column(String(50))
    thoiGianTao = Column(DateTime,default=datetime.now)
    thoiGianBatDau = Column(DateTime)
    thoiGianNopBai = Column(DateTime)
    xemDiem = Column(Integer)
    xemDapAn = Column(Integer)
    tronCauHoi = Column(Integer)
    daHoanThanh = Column(Integer,default=0)
    anDeKiemTra = Column(Integer,default=0)

    ma_chuong = Column(String, ForeignKey("chuong.ma_chuong"))

class CauHoi(Base):
    __tablename__ = "cauHoi"

    ma_cauHoi = Column(String,primary_key=True,default=generate_uuid)
    noiDung = Column(String(300))
    giaiThich = Column(String(300))
    anCauHoi = Column(Integer,default=0)

    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))

class CauTraLoi(Base):
    __tablename__ = "cauTraLoi"

    ma_cauTraLoi = Column(String,primary_key=True,default=generate_uuid)
    noiDung =  Column(String(300))
    laCauTraLoiDung = Column(Integer)

    ma_cauHoi = Column(String, ForeignKey("cauHoi.ma_cauHoi"))

class ChiTietBaiKiemTra(Base):
    __tablename__ = "chiTietBaiKiemTra"

    thuTu = Column(Integer)

    ma_deKiemTra = Column(String, ForeignKey("deKiemTra.ma_deKiemTra"),primary_key=True)  
    ma_cauHoi = Column(String, ForeignKey("cauHoi.ma_cauHoi"),primary_key=True)  

class BaiLamKiemTra(Base):
    __tablename__ = "baiLamKiemTra"

    ma_baiLamKiemTra = Column(String,primary_key=True,default=generate_uuid)
    thoiGianBatDauLam = Column(DateTime)
    thoiGianNop = Column(DateTime)
    diem = Column(Integer)
    soCauDung = Column(Integer)

    ma_taiKhoan = Column(String, ForeignKey("taiKhoan.ma_taiKhoan"))

class ChiTietBaiLamKiemTra(Base):
    __tablename__ = "chiTietBaiLamKiemTra"

    ma_baiLamKiemTra = Column(String, ForeignKey("baiLamKiemTra.ma_baiLamKiemTra"),primary_key=True)  
    ma_cauHoi = Column(String, ForeignKey("cauHoi.ma_cauHoi"),primary_key=True)  
    ma_dapAnChon = Column(String, ForeignKey("cauTraLoi.ma_cauTraLoi"))  
