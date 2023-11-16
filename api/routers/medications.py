from fastapi import APIRouter

from models.medications import MedicationIn, MedicationOut, Error

from authenticator import authenticator

router = APIRouter()
