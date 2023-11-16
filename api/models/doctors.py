from pydantic import BaseModel
from typing import Optional


# Model for creating and updating doctor information
class DoctorIn(BaseModel):
    full_name: str
    specialty: str
    phone: str
    address: Optional[str]


# Model for viewing and deleting single doctor
class DoctorShow(BaseModel):
    id: int
    full_name: str
    specialty: str
    phone: str
    address: Optional[str]


# Model for updating doctor
class DoctorUpdate(BaseModel):
    full_name: str
    specialty: str
    phone: str
    address: Optional[str]


# Model for viewing error message
class Error(BaseModel):
    message: str
