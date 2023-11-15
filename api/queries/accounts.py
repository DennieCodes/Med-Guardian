from models.accounts import (
    AccountIn,
    AccountOutWithHashedPassword,
    DuplicateAccountError,
)
from queries.pool import pool


class AccountsQueries:
    def create(self, info: AccountIn, hashed_password: str):
        account = info.dict()
        if self.get_one_by_username(
            account["username"]
        ) or self.get_one_by_email(account["email"]):
            raise DuplicateAccountError
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO user_accounts
                    (first_name,
                    last_name,
                    username,
                    email,
                    phone,
                    hashed_password)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account["first_name"],
                        account["last_name"],
                        account["username"],
                        account["email"],
                        account["phone"],
                        hashed_password,
                    ],
                )
                id = result.fetchone()[0]
                del account["password"]
                account["id"] = id
                account["hashed_password"] = hashed_password
                return AccountOutWithHashedPassword(**account)

    def get_one_by_username(self, username: str):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        SELECT id,
                        first_name,
                        last_name,
                        username,
                        email,
                        phone,
                        hashed_password
                        FROM user_accounts
                        WHERE username = %s
                        """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithHashedPassword(
                    id=record[0],
                    first_name=record[1],
                    last_name=record[2],
                    username=record[3],
                    email=record[4],
                    phone=record[5],
                    hashed_password=record[6],
                )

    def get_one_by_email(self, email: str):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        SELECT id,
                        first_name,
                        last_name,
                        username,
                        email,
                        phone,
                        hashed_password
                        FROM user_accounts
                        WHERE email = %s
                        """,
                    [email],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return AccountOutWithHashedPassword(
                    id=record[0],
                    first_name=record[1],
                    last_name=record[2],
                    username=record[3],
                    email=record[4],
                    phone=record[5],
                    hashed_password=record[6],
                )
