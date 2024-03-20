import os

from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)


def get_URL_DATABASE():
    return str(os.getenv("URL_DATABASE"))


def get_PORT():
    return os.getenv("PORT")
