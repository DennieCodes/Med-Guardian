from pydantic import BaseModel


class ScheduleIn(BaseModel):
    color: str
    from_date: str
    to_date: str
    title: str
    notif_type: str
    pill_count: int
    med_id: int
    prescribed_by: int
    user_id: int
    user_profile_id: int


class ScheduleOut(BaseModel):
    id: int
    color: str
    from_date: str
    to_date: str
    title: str
    notif_type: str
    pill_count: int
    med_id: int
    prescribed_by: int
    user_id: int
    user_profile_id: int

# Model for viewing error message
class Error(BaseModel):
    message: str
