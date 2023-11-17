from pydantic import BaseModel
from typing import Union, List
from models.medications import (
    MedicationsIn,
    MedicationsOut,
    MedicationUpdateRefills,
    Error
)
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

    def update_quantity(
            self,
            medications_id: int,
            medication: MedicationUpdateRefills
    ) -> Union[MedicationsOut, Error]:
        print('medication: ', medication)
        # Bring in existing data to change (quatity and or refills)
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (to run sql)
                with conn.cursor() as db:
                    # run Select statement and store in result
                    old_data = db.execute(
                        """
                        SELECT  quantity, refills
                        FROM medications
                        WHERE id = %s
                        """,
                        [medications_id],
                    )
                    tester = old_data.fetchone()
                    result = MedicationUpdateRefills(
                        quantity=tester[0],
                        refills=tester[1]
                    )
                    print("result: ", result)
        except Exception as e:
            print(e)
            return {"message": "There was a problem getting existing data"}
        print(f'Old_data- quantity:{tester[0]}, refills:{tester[1]}')
        print(f'incoming data- quantity:{medication.quantity}, refills:{medication.refills}')

        return {"message": "test"}










    def update_refill(self,):
        pass


    def medication_in_to_out(self, id: int, medication: MedicationsIn, user_id: int):
        old_data = medication.dict()
        return MedicationsOut(id=id, **old_data, user_id=user_id)
