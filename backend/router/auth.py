import re
import smtplib
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Annotated

import bcrypt
import database
import jwt
import load_env_global
import models
import schemas
from email_validator import EmailNotValidError, validate_email
from fastapi import (
    APIRouter,
    Depends,
    Form,
    HTTPException,
    Request,
    Response,
    status,
)
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

auth = APIRouter(tags=["Authentication"])
ACCESS_TOKEN_EXPIRE_MINUTES = 30
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=load_env_global.get_DOMAIN_URL() + "/auth/login"
)


class Token(BaseModel):
    access_token: str
    token_type: str


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt(16)
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def authenticate_user(username: str, password: str, db: Session):

    if username == None or username == "":
        return False
    if password == None or password == "":
        return False
    user = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.email == username)
        .first()
    )
    if not user:
        return False
    if not verify_password(password, user.matKhau):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        load_env_global.get_JWT_SECRET(),
        algorithm=load_env_global.get_JWT_ALGORITHM(),
    )
    return encoded_jwt


def validatePassword(plain_password: str) -> bool:
    PASSWORD_PATTERN = r"^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
    if re.match(PASSWORD_PATTERN, plain_password) is None:
        return False
    return True


def validatePhoneNumber(phone_number: str) -> bool:
    PHONE_PATTERN = r"^0\d{9}$"
    if re.match(PHONE_PATTERN, phone_number) is None:
        return False
    return True


def verifyNewAccount(newAcc: schemas.InewAccount) -> bool:
    if (
        not newAcc.hoTen
        or not newAcc.email
        or not newAcc.dienThoai
        or not newAcc.matKhau
        or not newAcc.cfm_password
    ):
        return False
    if (
        newAcc.hoTen
        == newAcc.dienThoai
        == newAcc.matKhau
        == newAcc.email
        == newAcc.cfm_password
        == ""
    ):
        return False
    if newAcc.matKhau != newAcc.cfm_password:
        return False

    if not validatePassword(newAcc.matKhau):
        return False
    if not validatePhoneNumber(newAcc.dienThoai):
        return False
    try:
        validate_email(newAcc.email)
    except EmailNotValidError:
        return False
    return True


@auth.post(
    "/signup",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.TaiKhoan,
)
async def signup(
    form_data: schemas.InewAccount,
    db: Session = Depends(database.get_db),
):
    if not form_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing information",
        )
    if not verifyNewAccount(form_data):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid information",
        )
    if form_data.matKhau != form_data.cfm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Confirm password must match with password",
        )
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.email == form_data.email)
        .first()
    )
    if db_object_check:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already exist",
        )
    hashed_password = hash_password(form_data.matKhau)
    tai_khoan_create = schemas.TaiKhoanCreate(
        hoTen=form_data.hoTen,
        anhDaiDien=form_data.anhDaiDien,
        email=form_data.email,
        dienThoai=form_data.dienThoai,
        matKhau=hashed_password,
    )
    ma_nhomQuyen = str(form_data.ma_nhomQuyen)
    db_object = models.TaiKhoan(
        **tai_khoan_create.dict(), ma_nhomQuyen=ma_nhomQuyen
    )
    db.add(db_object)
    db.commit()
    db.refresh(db_object)

    return db_object


@auth.post("/login")
async def login_for_access_token(
    response: Response,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(database.get_db),
) -> Token:
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email  or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(days=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"usr_email": user.email, "usr_id": user.ma_taiKhoan},
        expires_delta=access_token_expires,
    )
    return Token(access_token=access_token, token_type="bearer")


class IuserData(BaseModel):
    email: str = Field(examples=["hackiemsi0711@gmail.com"])


def sendEmail(payload):
    s = smtplib.SMTP("smtp.gmail.com", 587)
    s.starttls()
    message = MIMEMultipart("alternative")
    message["From"] = load_env_global.get_EMAIL()
    message["To"] = payload["email"]
    message["Subject"] = "Recover password"

    token = create_access_token(payload)
    recover_url = (
        load_env_global.get_DOMAIN_CLIENT()
        + "/auth/recoverPassword?token="
        + token
    )
    html_string = """\
    <html lang='en'>
    <head>
    <style>
    .container-web-name {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #009265;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }
    .intro {
        font-size: 1rem;
        margin-bottom: 1rem;
        color: black;
    }
    </style>
</head>
<body>
    <div
    class='container'
    style='
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 500px;
        width: 500px;
        background-image:url('https://img.freepik.com/free-photo/painted-solid-concrete-wall-textured-background_53876-101638.jpg');
        border: 4px solid #964b00;
        border-radius: 10px;
    '
    >
    <h1 class='container-web-name'>Classin</h1>
    <h2 style='color:black;'>Hi, <strong>hoTen</strong>! </h2>
    <p class='intro'>
    We received a request for reseting your password.<br>
    Please follow the link below to reset your password:</p>
    <a href="thelink">Reset password</a>
    </div>
</body>
</html>
    """
    html_string = html_string.replace("thelink", recover_url)
    html_string = html_string.replace("hoTen", payload["hoTen"])
    try:
        message.attach(MIMEText(html_string, "html"))
        s.login(
            load_env_global.get_EMAIL(), load_env_global.get_PASSWORD_EMAIL()
        )
        s.sendmail(
            load_env_global.get_EMAIL(), payload["email"], message.as_string()
        )
    except smtplib.SMTPException:
        print(smtplib.SMTPException)
        return False


@auth.post("/forgetPassword", status_code=status.HTTP_200_OK)
async def forget_password(
    user_email: IuserData, db: Session = Depends(database.get_db)
):
    if user_email.email == None or user_email.email == "":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email is not valid"
        )
    db_object_check = (
        db.query(models.TaiKhoan)
        .filter(models.TaiKhoan.email == user_email.email)
        .first()
    )
    if not db_object_check:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email not exist"
        )

    try:
        payload = {
            "id": db_object_check.ma_taiKhoan,
            "email": db_object_check.email,
            "hoTen": db_object_check.hoTen,
        }
        if sendEmail(payload) == False:
            raise HTTPException(status_code=500, detail="server error")
    except smtplib.SMTPException:
        print(smtplib.SMTPException)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email is not valid"
        )


class ResetPassword(BaseModel):
    new_password: str
    cfm_new_password: str


@auth.post("/recoverPassword", status_code=status.HTTP_200_OK)
async def recover_password(
    newPassword: ResetPassword,
    req: Request,
    db: Session = Depends(database.get_db),
):
    token = req.headers["authorization"]

    if not token:
        raise HTTPException(status_code=401, detail="Token is not valid")

    try:
        payload = jwt.decode(
            token,
            load_env_global.get_JWT_SECRET(),
            algorithms=[load_env_global.get_JWT_ALGORITHM()],
        )
        if not payload:
            raise HTTPException(status_code=401, detail="Token is not valid")

        if not validatePassword(newPassword.new_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password is not valid",
            )

        if newPassword.new_password != newPassword.cfm_new_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password and confirm password must match",
            )
        # hash_password = pwd_context.hash(newPassword.new_password)
        hashed_password = hash_password(newPassword.new_password)
        db_object = (
            db.query(models.TaiKhoan)
            .filter(models.TaiKhoan.ma_taiKhoan == payload["id"])
            .first()
        )

        if not db_object:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Account not exist",
            )

        db_object.matKhau = hashed_password
        db.commit()
        return {"detail": "Change password successfully", "status": 200}

    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token Expired")


@auth.post("/logOut", status_code=status.HTTP_200_OK)
async def log_out(req: Request, res: Response):
    if req.cookies.get("user_token"):
        res.delete_cookie("user_token")
    return {"detail": "Log out successfully", "status": 200}


@auth.get("/me")
async def read_current_user(request: Request):
    token = request.cookies.get("user_token")
    if not token:
        raise HTTPException(status_code=401, detail="Invalid token")
    try:
        payload = jwt.decode(
            token,
            load_env_global.get_JWT_SECRET(),
            algorithms=[load_env_global.get_JWT_ALGORITHM()],
        )
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
