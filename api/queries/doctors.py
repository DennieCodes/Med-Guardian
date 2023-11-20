from typing import Union, List
from models.doctors import DoctorIn, DoctorUpdate, DoctorShow, Error
from .pool import pool


class DoctorRepository:
    def create(self, doctor: DoctorIn, user_id) -> DoctorShow:
        # connect the database
        with pool.connection() as conn:
            # get a cursor(something to run SQL with)
            with conn.cursor() as db:
                # Run INSERT statement
                result = db.execute(
                    """
                    INSERT INTO doctors
                        (full_name, specialty, phone, address, user_id)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        doctor.full_name,
                        doctor.specialty,
                        doctor.phone,
                        doctor.address,
                        user_id,
                    ],
                )
                id = result.fetchone()[0]
                data = doctor.dict()
                return DoctorShow(id=id, **data)

    def list_doctors(self, user_id) -> List[DoctorShow]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (to run sql)
                with conn.cursor() as db:
                    # run SELECT statement and store in result
                    db.execute(
                        """
                        SELECT id, full_name, specialty, phone, address
                        FROM doctors
                        WHERE user_id = %s;
                        """,
                        [user_id],
                    )
                    # loop through list version
                    result = []
                    for record in db:
                        doctor = DoctorShow(
                            id=record[0],
                            full_name=record[1],
                            specialty=record[2],
                            phone=record[3],
                            address=record[4],
                        )
                        result.append(doctor)
                    return result
        except Exception:
            return {"message": "There was a error"}

    def show_doctor(self, doctor_id) -> DoctorShow:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (to run sql)
                with conn.cursor() as db:
                    # run SELECT statement and store in result
                    result = db.execute(
                        """
                        SELECT id, full_name, specialty, phone, address
                        FROM doctors
                        WHERE id = %s;
                        """,
                        [doctor_id],
                    )
                    data = result.fetchone()
                    record = DoctorShow(
                        id=data[0],
                        full_name=data[1],
                        specialty=data[2],
                        phone=data[3],
                        address=data[4],
                    )
                    return record
        except Exception:
            return {"message": "There was an return record"}

    def update(
        self, doctor: DoctorUpdate, doctor_id: int
    ) -> Union[DoctorShow, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (to run sql)
                with conn.cursor() as db:
                    # run UPDATE statement and store in result
                    db.execute(
                        """
                        UPDATE doctors
                        SET full_name = %s
                            , specialty = %s
                            , phone = %s
                            , address = %s
                        WHERE id = %s
                        """,
                        [
                            doctor.full_name,
                            doctor.specialty,
                            doctor.phone,
                            doctor.address,
                            doctor_id,
                        ],
                    )
                    doctor_dict = doctor.dict()
                    doctor_dict["id"] = doctor_id
                    return DoctorShow(**doctor_dict)
                    # return False

        except Exception as e:
            print(e)
            return {"message": "There was a problem with the update"}

    def delete(self, doctor_id) -> bool:
        try:
            with pool.connection() as conn:
                # get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    # Run DELETE statement
                    db.execute(
                        """
                        DELETE FROM doctors
                        WHERE id = %s
                        """,
                        [doctor_id],
                    )
                    return True
                    # return self.vacation_in_to_out(vacation_id, vacation)
        except Exception:
            return False
