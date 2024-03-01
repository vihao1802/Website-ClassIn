from fastapi import APIRouter
from api import *
router1 = APIRouter()

@router1.get("/")
async def doing_something():
  result = show_something()
  return result