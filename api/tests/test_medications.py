from fastapi.testclient import TestClient
from main import app
from queries.medications import MedicationRepository
from authenticator import authenticator
from models.medications import MedicationsOut

client = TestClient(app)

medIn = {
        "name": "amlodipine",
        "strength": '10mg',
        "dosage": 1,
        "frequency": 1,
        "quantity": 30,
        "refills": 11,
        "doctor_id": 1,
        "pharmacy_id": 1
    }


medOut = {
    "id": 1,
    "name": "amlodipine",
    "strength": '10mg',
    "dosage": 1,
    "frequency": 1,
    "quantity": 30,
    "refills": 11,
    "doctor_id": 1,
    "pharmacy_id": 1,
    "user_id": 1
}


def user():
    return {
        "id": 1,
        "first_name": "test",
        "last_name": " test",
        "username": "test",
        "email": "test",
        "phone": "test"
    }


class CreateMedication:
    def create(self, medication, user_id):
        result = {
            "id": 1,
            "user_id": user_id
        }
        result.update(medication)
        return MedicationsOut(**result)


class MedicationsList:
    def get_all(self, user_id):
        return [medOut]


class GetOneMedication:
    def get_one(self, medication_id, user_id):
        result = medOut
        return MedicationsOut(**result)


class DeleteMedication:
    def delete(self, medication_id, user_id):
        return True


class UpdateMedication:
    def update(self, medication_id, medication, user_id):
        result = {
            "id": medication_id,
            "user_id": user_id
        }
        result.update(medication)
        return MedicationsOut(**result)

def test_create_medication():
    # Arrange
    app.dependency_overrides[MedicationRepository] = CreateMedication
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.post("/api/medications", json=medIn)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == medOut


def test_get_all_medications():
    # Arrange
    app.dependency_overrides[MedicationRepository] = MedicationsList
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.get("/api/medications")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == [medOut]


def test_get_medication():
    # Arrange
    app.dependency_overrides[MedicationRepository] = GetOneMedication
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.get("/api/medications/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == medOut


def test_delete_medication():
    # Arrange
    app.dependency_overrides[MedicationRepository] = DeleteMedication
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.delete("/api/medications/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json()


def test_update_medication():
    # Arrange
    app.dependency_overrides[MedicationRepository] = UpdateMedication
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.put("/api/medications/1", json=medIn)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == medOut
