from fastapi import APIRouter, Depends, Response
from models.medications import (
    MedicationsIn,
    MedicationsOut,
    MedicationRefillsOut,
    MedicationQuantityIn,
    MedicationQuantityOut,
    Error
)
from authenticator import authenticator
from typing import Union, List
from queries.medications import MedicationRepository

router = APIRouter()


# CREATE MEDICATION
@router.post("/api/medications", response_model=Union[MedicationsOut, Error])
def create_medication(
    medication: MedicationsIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends()
):
    new_med = repo.create(medication, account_data["id"])
    if type(new_med) is not MedicationsOut:
        response.status_code = 400
    return new_med


# GET ALL MEDICATION
@router.get("/api/medications",
            response_model=Union[List[MedicationsOut], Error])
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends(),
):
    medications = repo.get_all(user_id=account_data["id"])

    return medications


# GET MEDICATION
@router.get(
    "/api/medications/{medication_id}",
    response_model=Union[MedicationsOut, Error]
)
def get_medication(
    medication_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends()
) -> Union[MedicationsOut, Error]:
    result = repo.get_one(medication_id, account_data["id"])
    if type(result) is not MedicationsOut:
        response.status_code = 400
    return result


# UPDATE MEDICATION
@router.put(
    "/api/medications/{medication_id}",
    response_model=Union[MedicationsOut, Error]
)
def update_medication(
    medication_id: int,
    medication: MedicationsIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends()
) -> Union[MedicationsOut, Error]:
    return repo.update(medication_id, medication, account_data["id"])


# DELETE MEDICATION
@router.delete("/api/medications/{medication_id}", response_model=bool)
def delete_medication(
    medication_id: int,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends()
) -> bool:
    result = repo.delete(medication_id, account_data['id'])
    if not result:
        response.status_code = 400
    return result


# UPDATE MEDICATION QUANTITY
@router.put(
    "/api/medications/{medication_id}/quantity",
    response_model=Union[MedicationQuantityOut, Error]
)
def update_medication_quantity(
    medication: MedicationQuantityIn,
    medications_id: int,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends()
) -> Union[MedicationQuantityOut, Error]:
    return repo.update_quantity(medications_id, medication)


# UPDATE MEDICATION REFILL
@router.put(
    "/api/medications/{medication_id}/refill",
    response_model=Union[MedicationRefillsOut, Error]
)
def update_refill_quantity(
    medication_id: int,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends()
) -> Union[MedicationRefillsOut, Error]:
    return repo.update_refill(medication_id)
