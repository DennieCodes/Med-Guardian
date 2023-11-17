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
                        refill_count,
                        doctor_id,
                        pharmacy_id,
                        user_id)
                        VALUES
                        (%s, %s, %s, %s, %s,%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            medication.name,
                            medication.strength,
                            medication.dosage,
                            medication.frequency,
                            medication.quantity,
                            medication.refills,
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

    def get_one(
        self,
        medication_id: int,
        user_id: int
    ) -> Union[MedicationsOut, Error]:
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
                        WHERE id =%s AND user_id = %s
                        """,
                        [medication_id, user_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return {"message": "You cannot access that medication"}
                    return self.record_to_medication_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that medication's information"}

    def update(
        self,
        medication_id: int,
        medication: MedicationsIn,
        user_id: int
    ):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE medications
                        SET name = %s,
                        strength = %s,
                        dosage = %s,
                        frequency = %s,
                        quantity = %s,
                        refills = %s,
                        doctor_id = %s,
                        pharmacy_id = %s
                        WHERE id = %s AND user_id = %s
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
                            medication_id,
                            user_id
                        ]
                    )
                    return self.medication_in_to_out(
                        medication_id, medication, user_id
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update that medication record"}

    def delete(self, medication_id: id, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM medications
                        WHERE id = %s AND user_id = %s
                        """,
                        [medication_id, user_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

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
