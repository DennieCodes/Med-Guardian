from pydantic import BaseModel
from typing import Union, List
from models.medications import MedicationsIn, MedicationsOut, Error
from queries.pool import pool


class MedicationRepository(BaseModel):
    # CREATE
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
                            "message":
                            "There was a problem creating the medication"
                        }
                    return self.medication_in_to_out(id, medication, user_id)

        except Exception as e:
            print(e)
            return {
                "message": "Could not enter a new medication into the system"
            }

    # GET_ALL
    def get_all(self, user_id: int) -> Union[List[MedicationsOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , name
                            , strength
                            , dosage
                            , frequency
                            , quantity
                            , refills
                            , doctor_id
                            , pharmacy_id
                            , user_id
                        FROM medications
                        WHERE user_Id = %s
                        """,
                        [user_id]
                    )

                    return [
                        self.record_to_medication_out(record)
                        for record in result
                    ]
        except Exception as e:
            print("There was an error: ", e)
            return {"message":
                    "Could not get a list of your medications"}

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

    def medication_in_to_out(self,
                             id: int,
                             medication: MedicationsIn,
                             user_id: int):
        old_data = medication.dict()
        return MedicationsOut(id=id, **old_data, user_id=user_id)

    def record_to_medication_out(self, record):
        return MedicationsOut(
            id=record[0],
            name=record[1],
            strength=record[2],
            dosage=record[3],
            frequency=record[4],
            quantity=record[5],
            refills=record[6],
            doctor_id=record[7],
            pharmacy_id=record[8],
            user_id=record[9],
        )
