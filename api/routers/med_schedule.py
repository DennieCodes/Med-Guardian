from fastapi import APIRouter, Response, Depends
from typing import Union, List
from models.schedules import ScheduleIn, ScheduleOut, Error
from queries.schedules import ScheduleRepository
from authenticator import authenticator

router = APIRouter()

@router('api/schedule/create', response_model=Union[ScheduleOut, Error])
def create(
    schedule: ScheduleIn,
    response: Response,
    repo: ScheduleRepository = Depends(),
    user: dict = Depends(authenticator.get_current_account_data),
) -> ScheduleOut:
    return repo.create(schedule)
