from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    phone: str
    password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str
    phone: str


class AccountOutWithHashedPassword(AccountOut):
    hashed_password: str


class AccountToken(Token):
    account: AccountOut


class DuplicateAccountError(ValueError):
    pass


class HttpError(BaseModel):
    detail: str
