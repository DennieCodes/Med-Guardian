from pydantic import BaseModel
from typing import Union, List
from models.medications import (
    MedicationsIn,
    MedicationsOut,
    MedicationUpdateRefills,
    MedicationUpdateRefillsOut,
    MedicationQuantityIn,
    MedicationQuantityOut,
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
                            medication.quantity,
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

    def update_refill(
            self,
            medication_id: int,
    ) -> Union[MedicationUpdateRefillsOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (to run sql)
                with conn.cursor() as db:
                    # run Update statement and store in result
                    result = db.execute(
                        """
                        UPDATE medications
                        SET quantity = quantity + refill_count
                        , refills = refills-1
                        WHERE id = %s
                        """,
                        [medication_id],

                    )
                    # data = result.fetchone()[0]
                    # old_data['id'] = medication_id
                    # record = MedicationUpdateRefillsOut(id=medication_id, **data)
                    print('returned data: ', result)
                    # record = MedicationUpdateRefillsOut(medication_id)
                    # print(record)
                    # return True
        except Exception as e:
            print(e)
            return {"message": "There was a problem getting existing data"}
        # print(f'data to be inserted: refills{new_refills}, quantity{new_quantity}')
        return {"message": "test"}

    def update_quantity(
            self,
            medications_id: int,
            medication: MedicationQuantityIn,
    ) -> Union[MedicationQuantityOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (to run sql)
                with conn.cursor() as db:
                    # run Update statement and store in result
                    result = db.execute(
                        """
                        UPDATE medications
                        SET quantity = quantity + %s
                        WHERE id = %s
                        RETURNING quantity
                        """,
                        [medication.quantity, medications_id],

                    )

                    # old_data['id'] = medication_id
                    # record = MedicationUpdateRefillsOut(id=medication_id, **data)
                    data = {result.fetchone()[0]}
                    id=  medications_id
                    # print('data: ', data)
                    # record = MedicationUpdateRefillsOut(**data)
                    # print('returning data: ', record)
                    # return record
                    # data = medication.dict()
                    # data["id"] = medications_id
                    # data["quantity"] = result.fetchone()[0]
                    # return MedicationUpdateRefillsOut(id=id, **data)
        except Exception as e:
            print(e)
            return {"message": "There was a problem getting existing data"}
        # print(f'data to be inserted: refills{new_refills}, quantity{new_quantity}')
        return {"message": "test"}


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
