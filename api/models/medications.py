from pydantic import BaseModel


class Error(BaseModel):
    message: str


class MedicationRefillsOut(BaseModel):
    id: int
    quantity: int
    refills: int


class MedicationQuantityIn(BaseModel):
    quantity: int


class MedicationQuantityOut(BaseModel):
    id: int
    quantity: int


class MedicationUpdateRefillsOut(BaseModel):
    id: int


class MedicationsIn(BaseModel):
    name: str
    strength: str
    dosage: int
    frequency: int
    quantity: int
    refills: int
    doctor_id: int
    pharmacy_id: int


class MedicationsOut(BaseModel):
    id: int
    name: str
    strength: str
    dosage: int
    frequency: int
    quantity: int
    refills: int
    doctor_id: int
    pharmacy_id: int
    user_id: int
