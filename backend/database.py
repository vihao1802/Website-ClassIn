from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)

URL_DATABASE = os.getenv("URL_DATABASE")

engine = create_engine(URL_DATABASE, connect_args={"check_same_thread": false})

SessionLocal =  sessionmaker(autocommit=False, autoFlush=False, bind=engine)

Base = declarative_base()