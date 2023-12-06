from fastapi.testclient import TestClient
from main import app
from queries.pharmacies import PharmacyRepository
from authenticator import authenticator
from models.pharmacies import PharmacyOut

client = TestClient(app)

pharmacyIn = {
    "name": "CVS",
    "phone": "(212) 555-1212",
    "address": "13-13 Main Street Anywhere, AnyState 10000",
    "website": "www.cvs.com"
}

pharmacyOut = {
    "id": 1,
    "name": "CVS",
    "phone": "(212) 555-1212",
    "address": "13-13 Main Street Anywhere, AnyState 10000",
    "website": "www.cvs.com",
    "user_id": 1
}


def user():
    return {
        "id": 1,
        "first_name": "Test",
        "last_name": "User",
        "username": "TestUser",
        "email": "TestUser",
        "phone": "TestUser"
    }


class CreatePharmacy:
    def create(self, pharmacy, user_id):
        result = {
            "id": 1,
            "user_id": user_id
        }
        result.update(pharmacy)
        return PharmacyOut(**result)


class PharmacyList:
    def get_all(self, user_id):
        return [pharmacyOut]


class GetOnePharmacy:
    def get_one(self, pharmacy_id, user_id):
        result = pharmacyOut
        return PharmacyOut(**result)


class DeletePharmacy:
    def delete(self, pharmacy_id, user_id):
        return True


class UpdatePharmacy:
    def update(self, pharmacy_id, pharmacy, user_id):
        result = {
            "id": pharmacy_id,
            "user_id": user_id
        }
        result.update(pharmacy)
        return PharmacyOut(**result)


# Test Create Pharmacy
def test_create_pharmacy():
    # Arrange
    app.dependency_overrides[PharmacyRepository] = CreatePharmacy
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.post("/api/pharmacies", json=pharmacyIn)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == pharmacyOut


# Test Get all Pharmacies
def test_get_all_pharmacies():
    # Arrange
    app.dependency_overrides[PharmacyRepository] = PharmacyList
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.get("/api/pharmacies")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == [pharmacyOut]


# Test Get Pharmacy
def test_get_pharmacy():
    # Arrange
    app.dependency_overrides[PharmacyRepository] = GetOnePharmacy
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.get("/api/pharmacies/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == pharmacyOut


# Test Delete Pharmacy
def test_delete_pharmacy():
    # Arrange
    app.dependency_overrides[PharmacyRepository] = DeletePharmacy
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.delete("/api/pharmacies/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json()


# Test Update Pharmacy
def test_update_pharmacy():
    # Arrange
    app.dependency_overrides[PharmacyRepository] = UpdatePharmacy
    app.dependency_overrides[authenticator.get_current_account_data] = user

    # Act
    response = client.put("/api/pharmacies/1", json=pharmacyIn)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == pharmacyOut
