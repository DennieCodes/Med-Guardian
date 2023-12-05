from typing import Union, List
from models.schedules import EventIn, EventOut, Error
from queries.pool import pool


class EventsRepository:
    def create(self, events: List[EventIn], user_id: int):
        try:
            new_events = []
            with pool.connection() as conn:
                with conn.cursor() as db:
                    for event in events:
                        result = db.execute(
                            """
                            INSERT INTO med_events
                            (
                                color,
                                from_date,
                                to_date,
                                title,
                                med_id,
                                user_id
                            )
                            VALUES
                            (%s, %s, %s, %s, %s,%s)
                            RETURNING id;
                            """,
                            [
                                event.color,
                                event.from_date,
                                event.to_date,
                                event.title,
                                event.med_id,
                                user_id
                            ]
                        )
                        id = result.fetchone()[0]
                        if id is None:
                            return {
                                "message: There was a problem creating event."
                            }
                        new_event = self.event_in_to_out(id, event, user_id)
                        new_events.append(new_event)
                    return new_events
        except Exception as e:
            print(e)
            return {
                "message": "Could not create events."
            }

    def get_all(self, user_id) -> Union[List[EventOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                        color,
                        from_date,
                        to_date,
                        title,
                        med_id,
                        user_id
                        FROM med_events
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )

                    return [
                        self.record_to_event_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message":
                    "Could not get a list of events"}

    def update_color(self, event_id: int, color: str, user_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE med_events
                        SET color = %s
                        WHERE id = %s AND user_id = %s
                        RETURNING id,
                        color,
                        from_date,
                        to_date,
                        title,
                        med_id,
                        user_id
                        """,
                        [color, event_id, user_id]
                    )
                    record = db.fetchone()
                    return self.record_to_event_out(record)
        except Exception as e:
            print(e)
            return {"message": "The color of this even could not be updated."}

    def event_in_to_out(self,
                        id: int,
                        event: EventIn,
                        user_id: int
                        ):
        old_data = event.dict()
        old_data["user_id"] = user_id  # Add user_id to old_data
        return EventOut(id=id, **old_data)

    def record_to_event_out(self, record):
        return EventOut(
            id=record[0],
            color=record[1],
            from_date=record[2],
            to_date=record[3],
            title=record[4],
            med_id=record[5],
            user_id=record[6],
        )
