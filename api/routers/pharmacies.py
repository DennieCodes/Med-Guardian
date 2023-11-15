from fastapi import APIRouter

from models.pharmacies import PharmacyIn, PharmacyOut
from queries.pharmacies import PharmacyRepository

router = APIRouter()
