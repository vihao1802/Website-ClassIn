from sqlalchemy.orm import Session
from fastapi import Depends
import models, schemas, database

""" def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() """

def create_author(author: schemas.AuthorCreate, db: Session = Depends(database.get_db)):
    db_author = models.Author(**author.dict())
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author

""" def create_author(db: Session, author: schemas.AuthorCreate):
    # fake_hashed_password = author.password + "notreallyhashed"
    db_author = models.Author(author_name=author.author_name)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author  """
