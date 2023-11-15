from pydantic import BaseModel

class Error(BaseModel):
  message: str

class PharmacyIn(BaseModel):
  pass

class PharmacyOut(BaseModel):
  pass