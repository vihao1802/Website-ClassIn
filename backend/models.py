from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class NhomQuyen(Base):
    __tablename__ = "nhomQuyen"

    ma_nhomQuyen = Column(String, primary_key=True,default=generate_uuid)
    ten_nhomQuyen = Column(String, nullable=False)
    ds_taikhoan = relationship("TaiKhoan")

    def dict(self): 
        return {
            "id": self.ma_nhomQuyen,
            "name": self.ten_nhomQuyen
        }

class TaiKhoan(Base):
    __tablename__ = "taiKhoan"

    ma_taiKhoan = Column(String, primary_key=True,default=generate_uuid)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    dienThoai = Column(String)
    avatar = Column(String)

    ma_nhomQuyen = Column(String, ForeignKey("nhomQuyen.ma_nhomQuyen"))
    


# Example
""" class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items") """
