from fastapi import APIRouter
from api import *
router2 = APIRouter()
@router2.get("/")
async def doing_something():
  result = show_something()
  return result