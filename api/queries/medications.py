from pydantic import BaseModel


class MedicationRepository(BaseModel):
    def create(self):
        pass

    def get_all(self):
        pass

    def get_one(self):
        pass

    def update(self):
        pass

    def delete(self):
        pass

    def update_quantity(self):
        pass

    def update_refill(self):
        pass
