from pydantic import BaseModel


class Error(BaseModel):
    message: str


class MedicationUpdateRefills(BaseModel):
    quantity: int
    refills: int
    refill_count: int

class MedicationUpdateRefillsOut(BaseModel):
    id: int
    quantity: int
    refills: int
    refill_count: int

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
