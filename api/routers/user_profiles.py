from fastapi import APIRouter, Depends, Response
from models.user_profiles import ProfileIn, ProfileOut
from authenticator import authenticator
from queries.user_profiles import ProfilesQueries
from typing import Optional

router = APIRouter()


@router.post("/api/profiles", response_model=ProfileOut)
def create_profile(
    info: ProfileIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfilesQueries = Depends(),
):
    profile = repo.create(info, account_username=account_data["username"])
    if profile is None:
        response.status_code = 404
    return profile


@router.get("/api/proflies/", response_model=Optional[ProfileOut])
def get_profile(
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfilesQueries = Depends(),
):
    profile = repo.get(account_username=account_data["username"])
    if profile is None:
        response.status_code = 404
        {"message": "Please enter in profile details"}
    return profile


@router.put(
    "/api/profiles/{profile_id}",
)
def update_profile(
    profile_id: int,
    info: ProfileIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfilesQueries = Depends(),
):
    profile = repo.update(profile_id, info, account_data["username"])
    if profile is None:
        response.status_code = 404
    return profile
