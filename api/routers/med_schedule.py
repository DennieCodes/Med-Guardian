from fastapi import APIRouter, Response, Depends
from typing import Union, List
from models.schedules import EventIn, EventOut, Error
from queries.schedules import EventsRepository
from authenticator import authenticator

router = APIRouter()


@router.post('/api/events', response_model=Union[List[EventOut], Error])
def create(
    events: List[EventIn],
    response: Response,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: EventsRepository = Depends()
):
    events = repo.create(events, user["id"])
    if not isinstance(events, list) or not all(isinstance(e, EventOut) for e in events):
        response.status_code = 400
    return events

@router.get("/api/events", response_model=Union[List[EventOut], Error])
def get_all(
    user: dict = Depends(authenticator.get_current_account_data),
    repo: EventsRepository = Depends()
):
    events = repo.get_all(user["id"])
    return events
