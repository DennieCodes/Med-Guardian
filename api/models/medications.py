from pydantic import BaseModel


class Error(BaseModel):
    message: str


class MedicationsIn(BaseModel):
    name: str


class MedicationsOut(BaseModel):
    name: str
