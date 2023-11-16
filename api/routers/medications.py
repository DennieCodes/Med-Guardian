from fastapi import APIRouter

# from models.medications import MedicationIn, MedicationOut, Error
# from authenticator import authenticator

router = APIRouter()


# CREATE MEDICATION
@router.post("/api/medications")
def create_medication():
    pass


# GET ALL MEDICATION
@router.get("/api/medications")
def get_all():
    pass


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
@router.put("/api/medications/{medications_id}/refill")
def update_refill_quantity():
    pass
