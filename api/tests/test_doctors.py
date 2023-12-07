from fastapi.testclient import TestClient
from main import app
from queries.doctors import DoctorRepository
from authenticator import authenticator
from models.doctors import DoctorShow

client = TestClient(app)

doctorIn = {
    "full_name": "Dr. Billy Bob",
    "specialty": "Neurology",
    "phone": "323-323-1234",
    "address": "125 Somewhere Ave."
    }


doctorOut = {
    "id": 1,
    "full_name": "Dr. Billy Bob",
    "specialty": "Neurology",
    "phone": "323-323-1234",
    "address": "125 Somewhere Ave."
}


def user():
    return {
        "id": 1,
        "first_name": "test",
        "last_name": " test",
        "username": "test",
        "email": "test@test.com",
        "phone": "323-323-3333"
    }


class CreateDoctor:
    def create(self, doctor, user_id):
        result = {
            "id": 1,
        }
        result.update(doctor)
        return DoctorShow(**result)


class DoctorsList:
    def list_doctors(self, user_id):
        return [doctorOut]


class GetOneDoctor:
    def show_doctor(self, doctor_id):
        result = doctorOut
        return DoctorShow(**result)


class DeleteDoctor:
    def delete(self, doctor_id):
        return True


class UpdateDoctor:
    def update(self, doctor, doctor_id):
        result = {
            "id": doctor_id,
        }
        result.update(doctor)
        return DoctorShow(**result)


def test_create_doctor():
    # Arrange
    app.dependency_overrides[DoctorRepository] = CreateDoctor
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.post("/api/doctors", json=doctorIn)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == doctorOut


def test_list_doctors():
    # Arrange
    app.dependency_overrides[DoctorRepository] = DoctorsList
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.get("/api/doctors")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == [doctorOut]


def test_get_doctor():
    # Arrange
    app.dependency_overrides[DoctorRepository] = GetOneDoctor
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.get("/api/doctors/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == doctorOut


def test_delete_doctor():
    # Arrange
    app.dependency_overrides[DoctorRepository] = DeleteDoctor
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.delete("/api/doctors/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json()


def test_update_doctor():
    # Arrange
    app.dependency_overrides[DoctorRepository] = UpdateDoctor
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.put("/api/doctors/1", json=doctorIn)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == doctorOut
