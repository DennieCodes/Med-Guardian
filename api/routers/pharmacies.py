from fastapi import APIRouter, Depends, Response
from typing import Union, List

from models.pharmacies import PharmacyIn, PharmacyOut
from queries.pharmacies import PharmacyRepository, Error

router = APIRouter()


# CREATE PHARMACY
@router.post("/api/pharmacies", response_model=Union[PharmacyOut, Error])
def create_pharmacy(
    pharmacy: PharmacyIn,
    response: Response,
    repo: PharmacyRepository = Depends()
):
    return_response = repo.create(pharmacy)

    if type(return_response) is not PharmacyOut:
        response.status_code = 400

    return return_response


# GET PHARMACY
@router.get("/api/pharmacies", response_model=Union[List[PharmacyOut], Error])
def get_all(
    repo: PharmacyRepository = Depends()
):
    return repo.get_all()
