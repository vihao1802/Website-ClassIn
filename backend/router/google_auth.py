from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/bai-lam-bai-tap", tags=["BaiLamBaiTap"])
import json

from google.auth.transport.requests import Request
from google.oauth2 import service_account

router = APIRouter(prefix="/googleapi", tags=["GoogleApi"])


@router.post("/access-token")
def get_access_token():
    # Path to your service account key file
    SERVICE_ACCOUNT_FILE = "/mnt/d/code/ptpmmnt/Website-ClassIn/backend/config/xenon-timer-421207-29f217c35846.json"

    # Define the scopes for the access token
    SCOPES = [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive.appdata",
    ]

    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )

    credentials.refresh(Request())

    return {"token": credentials.token}
