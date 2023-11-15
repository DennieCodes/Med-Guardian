from fastapi import APIRouter, Depends, Response
from typing import Union, List

from models.pharmacies import PharmacyIn, PharmacyOut, Error
from queries.pharmacies import PharmacyRepository

from authenticator import authenticator

router = APIRouter()


# CREATE PHARMACY
@router.post("/api/pharmacies", response_model=Union[PharmacyOut, Error])
def create_pharmacy(
    pharmacy: PharmacyIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PharmacyRepository = Depends(),
):
    return_response = repo.create(pharmacy, account_id=account_data["id"])

    if type(return_response) is not PharmacyOut:
        response.status_code = 400

    return return_response


# UPDATE PHARMACY
@router.put("/api/pharmacies/{pharmacies_id}",
            response_model=Union[PharmacyOut, Error])
def update_pharmacy(
    pharmacy_id: int,
    pharmacy: PharmacyIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PharmacyRepository = Depends(),
) -> Union[PharmacyOut, Error]:
    return repo.update(pharmacy_id, pharmacy, user_id=account_data["id"])


# GET PHARMACY
@router.get("/api/pharmacies", response_model=Union[List[PharmacyOut], Error])
def get_all(repo: PharmacyRepository = Depends()):
    return repo.get_all()


# GET A PHARMACY
@router.get(
    "/api/pharmacies/{pharmacies_id}", response_model=Union[PharmacyOut, Error]
)
def get_pharmacy(
    pharmacy_id: int,
    response: Response,
    repo: PharmacyRepository = Depends(),
) -> PharmacyOut:
    result = repo.get_one(pharmacy_id)

    if result is None:
        response.status_code = 400
    return result


# DELETE PHARMACY
@router.delete("/api/pharmacies/{pharmacies_id}", response_model=bool)
def delete_pharmacy(
    pharmacy_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PharmacyRepository = Depends(),
) -> bool:
    return repo.delete(pharmacy_id, user_id=account_data["id"])
