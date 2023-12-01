steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE user_accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(200) NOT NULL,
            last_name VARCHAR(200) NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(200) NOT NULL UNIQUE,
            phone VARCHAR(20) NULL,
            hashed_password VARCHAR(255) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user_accounts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE user_profiles (
            id SERIAL PRIMARY KEY NOT NULL,
            height DECIMAL NULL,
            weight DECIMAL NULL,
            cholesterol INTEGER NULL,
            blood_pressure VARCHAR(10) NULL,
            A1C_sugar_level DECIMAL NULL,
            notif_type VARCHAR(20) NULL,
            username VARCHAR(50) references user_accounts(username)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user_profiles;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE doctors (
            id SERIAL PRIMARY KEY NOT NULL,
            full_name VARCHAR(200) NOT NULL,
            specialty VARCHAR(200) NOT NULL,
            phone VARCHAR(20) NULL,
            address TEXT NULL,
            user_id INTEGER references user_accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE doctors;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE pharmacies (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) NOT NULL,
            phone VARCHAR(20) NULL,
            address TEXT NULL,
            website VARCHAR(200) NULL,
            user_id INTEGER references user_accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE pharmacies;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE medications (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(200) NOT NULL,
            strength VARCHAR(20) NOT NULL,
            dosage INTEGER NOT NULL,
            frequency INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            refills INTEGER NOT NULL,
            refill_count INTEGER NOT NULL,
            doctor_id INTEGER references doctors(id),
            pharmacy_id INTEGER references pharmacies(id),
            user_id INTEGER references user_accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE medications;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE med_events (
            id SERIAL PRIMARY KEY NOT NULL,
            color VARCHAR(200) NOT NULL,
            from_date VARCHAR(30) NOT NULL,
            to_date VARCHAR(30) NOT NULL,
            title VARCHAR(100) NOT NULL,
            med_id INTEGER references medications(id),
            user_id INTEGER references user_accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE med_events;
        """,
    ],
]
