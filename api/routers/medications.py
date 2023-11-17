from fastapi import APIRouter, Depends, Response
from models.medications import (
    MedicationsIn,
    MedicationsOut,
    MedicationUpdateRefills,
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
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends(),
):
    medications = repo.get_all(user_id=account_data["id"])

    if type(medications) is not List[MedicationsOut]:
        response.status_code = 400
    return medications


# GET MEDICATION
@router.get("/api/medications/{medications_id}")
def get_medication():
    pass


# UPDATE MEDICATION
@router.put("/api/medications/{medications_id}")
def update_medication():
    pass


# DELETE MEDICATION
@router.delete("/api/medications/{medications_id}")
def delete_medication():
    pass


# UPDATE MEDICATION QUANTITY
@router.put("/api/medications/{medications_id}/quantity")
def update_medication_quantity():
    pass


# UPDATE MEDICATION QUANTITY
@router.put(
    "/api/medications/{medications_id}/refill",
    response_model=MedicationsOut
)
def update_refill_quantity(
    medications_id: int,
    medication:  MedicationUpdateRefills,
    response: Response,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: MedicationRepository = Depends()
) -> Union[MedicationsOut, Error]:
    return repo.update_quantity(medications_id, medication)
