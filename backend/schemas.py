from pydantic import BaseModel
from uuid import UUID

class AccountBase(BaseModel):
    email: str
    hashed_password: str  
    phone: str
    avatar: str

class AccountCreate(AccountBase):
    pass


class Account(AccountBase):
    account_id: UUID
    author_id: UUID

    class Config:
        from_attributes = True


class AuthorBase(BaseModel):
    author_name: str


class AuthorCreate(AuthorBase):
    pass


class Author(AuthorBase):
    author_id: UUID
    accounts: list[Account] = []

    class Config:
        from_attributes = True