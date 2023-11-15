from pydantic import BaseModel


class PharmacyIn(BaseModel):
    name: str
    phone: str
    address: str
    website: str
    user_id: int


class PharmacyOut(BaseModel):
    id: int
    name: str
    phone: str
    address: str
    website: str
    user_id: int
