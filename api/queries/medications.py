from pydantic import BaseModel
from models.medications import MedicationsIn, MedicationsOut
from queries.pool import pool


class MedicationRepository(BaseModel):
    def create(self, medication: MedicationsIn, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO medications
                        (name,
                        strength,
                        dosage,
                        frequency,
                        quantity,
                        refills,
                        doctor_id,
                        pharmacy_id,
                        user_id)
                        VALUES
                        (%s, %s, %s, %s, %s,%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            medication.name,
                            medication.strength,
                            medication.dosage,
                            medication.frequency,
                            medication.quantity,
                            medication.refills,
                            medication.doctor_id,
                            medication.pharmacy_id,
                            user_id
                        ]
                    )

                    id = result.fetchone()[0]
                    if id is None:
                        return {
                            "message": "There was a problem creating the medication"
                        }
                    return self.medication_in_to_out(id, medication, user_id)

        except Exception as e:
            print(e)
            return {
                "message": "Could not enter a new medication into the system"
            }

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

    def medication_in_to_out(self, id: int, medication: MedicationsIn, user_id: int):
        old_data = medication.dict()
        return MedicationsOut(id=id, **old_data, user_id=user_id)
