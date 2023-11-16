from pydantic import BaseModel


class Error(BaseModel):
    message: str


class PharmacyIn(BaseModel):
    name: str
    phone: str
    address: str
    website: str


class PharmacyOut(BaseModel):
    id: int
    name: str
    phone: str
    address: str
    website: str
    user_id: int
