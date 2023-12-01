from pydantic import BaseModel


class ScheduleIn(BaseModel):
    color: str
    from_date: str
    to_date: str
    title: str
    med_id: int
    user_id: int


class ScheduleOut(BaseModel):
    id: int
    color: str
    from_date: str
    to_date: str
    title: str
    med_id: int
    user_id: int


# Model for viewing error message
class Error(BaseModel):
    message: str
