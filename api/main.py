from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import (
    accounts,
    user_profiles,
    third_party_calls,
    pharmacies,
    doctors,
    medications,
    med_schedule,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(authenticator.router, tags=["Auth"])
app.include_router(accounts.router, tags=["Auth"])
app.include_router(doctors.router, tags=["Doctors"])
app.include_router(user_profiles.router, tags=["UserProfiles"])
app.include_router(pharmacies.router, tags=["Pharmacies"])
app.include_router(medications.router, tags=["Medications"])
app.include_router(third_party_calls.router, tags=["3rd Party Calls"])
app.include_router(med_schedule.router, tags=["Med Schedules"])


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
