from fastapi import APIRouter, Depends
from queries.third_party_calls import ThirdPartyQueries
from authenticator import authenticator

router = APIRouter()


@router.get("/api/drug_list")
def get_drug_list(repo: ThirdPartyQueries = Depends()):
    return repo.get_drug_list()


@router.get("/api/users_drug_interactions")
def get_users_drug_interactions(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ThirdPartyQueries = Depends()
):
    return repo.get_interactions(account_data["id"])
