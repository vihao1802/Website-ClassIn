import os

from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)


def get_URL_DATABASE():
    return str(os.getenv("URL_DATABASE"))


def get_PORT():
    return os.getenv("PORT")


def get_DOMAIN_URL():
    return str(os.getenv("DOMAIN_URL"))


def get_DOMAIN_CLIENT():
    return str(os.getenv("DOMAIN_CLIENT"))


def get_JWT_SECRET():
    return str(os.getenv("JWT_SECRET"))


def get_JWT_ALGORITHM():
    return str(os.getenv("JWT_ALGORITHM"))


def get_EMAIL():
    return str(os.getenv("EMAIL"))


def get_PASSWORD_EMAIL():
    return str(os.getenv("PASSWORD_EMAIL"))
