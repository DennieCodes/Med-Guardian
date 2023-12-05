from pydantic import BaseModel


class EventIn(BaseModel):
    color: str
    from_date: str
    to_date: str
    title: str
    med_id: int
    user_id: int


class EventOut(BaseModel):
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
