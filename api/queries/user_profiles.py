from models.user_profiles import ProfileIn, ProfileOut
from queries.pool import pool


class ProfilesQueries:
    def create(self, info: ProfileIn, account_username: str):
        profile = info.dict()
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO user_profiles
                        (height, weight, cholesterol, blood_pressure,
                        A1C_sugar_level, username)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            profile["height"],
                            profile["weight"],
                            profile["cholesterol"],
                            profile["blood_pressure"],
                            profile["a1c_sugar_level"],
                            account_username,
                        ],
                    )
                    id = result.fetchone()[0]
                    profile["id"] = id
                    profile["username"] = account_username
                    return ProfileOut(**profile)
        except Exception:
            return {"message": "There was an error entering in your profile."}

    def get(self, account_username):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, height, weight, cholesterol,
                    blood_pressure, A1C_sugar_level, username
                    FROM user_profiles
                    WHERE username = %s
                    """,
                    [account_username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return ProfileOut(
                    id=record[0],
                    height=record[1],
                    weight=record[2],
                    cholesterol=record[3],
                    blood_pressure=record[4],
                    a1c_sugar_level=record[5],
                    username=record[6],
                )

    def update(self, profile_id: int, info: ProfileIn, username: str):
        profile = info.dict()
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE user_profiles
                        SET height = %s,
                        weight = %s,
                        cholesterol = %s,
                        blood_pressure = %s,
                        A1C_sugar_level = %s
                        WHERE id = %s AND username = %s
                        RETURNING id
                        """,
                        [
                            profile["height"],
                            profile["weight"],
                            profile["cholesterol"],
                            profile["blood_pressure"],
                            profile["a1c_sugar_level"],
                            profile_id,
                            username,
                        ],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    profile["id"] = profile_id
                    profile["username"] = username
                    return ProfileOut(**profile)
        except Exception:
            return {"message": "Could not update profile."}
