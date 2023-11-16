from fastapi import APIRouter, Response, Depends
from typing import Union, List
from models.doctors import DoctorIn, DoctorShow, DoctorUpdate, Error
from queries.doctors import DoctorRepository
from authenticator import authenticator

router = APIRouter()


@router.post("/api/doctors", response_model=DoctorShow)
def create(
    doctor: DoctorIn,
    response: Response,
    repo: DoctorRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> DoctorShow:
    print("user", user)
    return repo.create(doctor, user["id"])


@router.get("/api/doctors", response_model=Union[List[DoctorShow], Error])
def list_doctors(
    response: Response,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: DoctorRepository = Depends(),
) -> List[DoctorShow]:
    return repo.list_doctors(user["id"])


@router.get(
    "/api/doctors/{doctor_id}", response_model=Union[DoctorShow, Error]
)
def show_doctor(
    doctor_id: int,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: DoctorRepository = Depends(),
) -> DoctorShow:
    return repo.show_doctor(doctor_id)


@router.put(
    "/api/doctors/{doctor_id}", response_model=Union[DoctorShow, Error]
)
def update(
    doctor_id: int,
    doctor: DoctorUpdate,
    response: Response,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: DoctorRepository = Depends(),
) -> DoctorShow:
    return repo.update(doctor, doctor_id)


@router.delete("/api/doctors/{doctor_id}", response_model=bool)
def delete(
    doctor_id: int,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: DoctorRepository = Depends(),
) -> bool:
    return repo.delete(doctor_id)
