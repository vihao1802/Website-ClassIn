from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class Author(Base):
    __tablename__ = "author"

    author_id = Column(String, primary_key=True,default=generate_uuid)
    author_name = Column(String, nullable=False)
    accounts = relationship("Account")

    def dict(self): 
        return {
            "id": self.author_id,
            "name": self.author_name
        }

class Account(Base):
    __tablename__ = "account"

    account_id = Column(String, primary_key=True,default=generate_uuid)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    phone = Column(String)
    avatar = Column(String)

    author_id = Column(String, ForeignKey("author.author_id"))
    


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
