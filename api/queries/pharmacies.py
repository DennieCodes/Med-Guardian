from pydantic import BaseModel
from typing import Union, List
from models.pharmacies import PharmacyIn, PharmacyOut
from queries.pool import pool


class Error(BaseModel):
    message: str


class PharmacyRepository(BaseModel):
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
            id = record.id[0],
            name = record.id[1],
            phone = record.id[2],
            address = record.id[3],
            website = record.id[4],
            user_id = record.id[5]
        )