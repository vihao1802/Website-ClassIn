from pydantic import BaseModel, Field
from uuid import UUID

# For Swagger docs
class TaiKhoanBase(BaseModel):
    email: str = Field(examples=["hello@gmail.com"])
    hashed_password: str  
    dienThoai: str
    avatar: str

class TaiKhoanCreate(TaiKhoanBase):
    pass


class TaiKhoan(TaiKhoanBase):
    ma_taiKhoan: UUID = Field(examples=["014a93f1-84e8-4c7e-98c5-0aae80d03cc2"])
    ma_nhomQuyen: UUID = Field(examples=["215ec863-04fa-408b-a7b2-db06dc7ab1c8"])

    class Config:
        from_attributes = True


class NhomQuyenBase(BaseModel):
    ten_nhomQuyen: str = Field(examples=["Admin"])


class NhomQuyenCreate(NhomQuyenBase):
    pass


class NhomQuyen(NhomQuyenBase):
    ma_nhomQuyen: UUID = Field(examples=["c54f0fb9-678f-4283-a1bf-3de20d02a6fa"])
    ds_taikhoan: list[TaiKhoan] = []

    class Config:
        from_attributes = True