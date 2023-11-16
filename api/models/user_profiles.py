from pydantic import BaseModel
from typing import Optional


class ProfileIn(BaseModel):
    height: Optional[float]
    weight: Optional[float]
    cholesterol: Optional[int]
    blood_pressure: Optional[str]
    a1c_sugar_level: Optional[float]


class ProfileOut(BaseModel):
    id: int
    height: Optional[float]
    weight: Optional[float]
    cholesterol: Optional[int]
    blood_pressure: Optional[str]
    a1c_sugar_level: Optional[float]
    username: str
