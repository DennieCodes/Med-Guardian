from pydantic import BaseModel
from typing import Union, List, Optional
from models.pharmacies import PharmacyIn, PharmacyOut
from queries.pool import pool


class Error(BaseModel):
    message: str


class PharmacyRepository(BaseModel):

    # DELETE
    def delete(self, pharmacy_id: int):
        try:
            with pool.connection as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM pharmacies
                        WHERE id = %s
                        """,
                        [pharmacy_id]
                    )
                    return True

        except Exception as e:
            print(e)
            return False

    # GET_ONE
    def get_one(self, pharmacy_id: int) -> Optional[PharmacyOut]:
        try:
            with pool.connection as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                             , name
                             , phone
                             , address
                             , website
                             , user_id
                        FROM pharmacies
                        WHERE id = %s
                        """,
                        [pharmacy_id]
                    )
                    record = result.fetchone()

                    if record is None:
                        return None
                    return self.record_to_pharmacy_out(record)

        except Exception as e:
            print(e)
            return {"message": "Could not get that pharmacy's information"}

    # GET_ALL
    def get_all(self) -> Union[Error, List[PharmacyOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, phone, address, website, user_id
                        FROM pharmacies
                        """
                    )

                    return [
                        self.record_to_pharmacy_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get list of all pharmacies"}

    # CREATE
    def create(self, pharmacy: PharmacyIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT into pharmacies
                            (name, phone, address, website, user_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            pharmacy.name,
                            pharmacy.phone,
                            pharmacy.address,
                            pharmacy.website,
                            pharmacy.user_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.pharmacy_in_to_out(id, pharmacy)

        except Exception as e:
            print(e)
            return {
                "message":
                "Could not enter a new pharmacy entry into the system"}

    def pharmacy_in_to_out(self, id: int, pharmacy: PharmacyIn):
        old_data = pharmacy.dict()
        return PharmacyOut(id=id, **old_data)

    def record_to_pharmacy_out(self, record):
        return PharmacyOut(
            id=record.id[0],
            name=record.id[1],
            phone=record.id[2],
            address=record.id[3],
            website=record.id[4],
            user_id=record.id[5]
        )
