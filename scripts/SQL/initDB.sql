DROP TABLE IF EXISTS "role" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "problem_type" CASCADE;
DROP TABLE IF EXISTS "problem" CASCADE;
DROP TABLE IF EXISTS "voucher" CASCADE;
DROP TABLE IF EXISTS "user_voucher" CASCADE;
DROP TABLE IF EXISTS "job" CASCADE;

CREATE TABLE "role" (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL
);

CREATE TABLE "user" (
    email VARCHAR(100) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    birthdate DATE NOT NULL CHECK (birthdate <= CURRENT_DATE AND AGE(CURRENT_DATE, birthdate) >= INTERVAL '12 years'),
    phone_number VARCHAR(10) NOT NULL CHECK(LENGTH(phone_number) = 10),
    city_label VARCHAR(100) NOT NULL,
    postal_code NUMERIC(4, 0) NOT NULL,
    street_label VARCHAR(100) NOT NULL,
    street_number INTEGER NOT NULL CHECK(street_number > 0),
    points_number INTEGER DEFAULT 0,
    experience INTEGER DEFAULT 0,
    role_label VARCHAR(50),
    FOREIGN KEY (role_label) REFERENCES role(label)
);

CREATE TABLE "problem_type" (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    emergency_degree INT NOT NULL
);

CREATE TABLE "problem" (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    picture TEXT,
    status VARCHAR(20) DEFAULT 'En attente',
    report_date DATE,
    solved_date DATE,
    problem_type_label VARCHAR(50),
    user_email VARCHAR(100),
    FOREIGN KEY (problem_type_label) REFERENCES problem_type(label),
    FOREIGN KEY (user_email) REFERENCES "user"(email)
);


CREATE TABLE "voucher" (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    points_required INT NOT NULL,
    picture VARCHAR(200) NOT NULL
);

CREATE TABLE "user_voucher" (
    code VARCHAR(50) PRIMARY KEY,
    claim_date DATE,
    expiration_date DATE,
    user_email VARCHAR(100),
    voucher_label VARCHAR(50),
    FOREIGN KEY (user_email) REFERENCES "user"(email),
    FOREIGN KEY (voucher_label) REFERENCES voucher(label)
);

CREATE TABLE "job" (
    user_email VARCHAR(100),
    problem_id INT,
    job_date DATE,
    PRIMARY KEY (user_email, problem_id),
    FOREIGN KEY (user_email) REFERENCES "user"(email),
    FOREIGN KEY (problem_id) REFERENCES problem(id)
);

INSERT INTO "role" (label, description)
VALUES
    ('Admin', 'Administrateur'),
    ('Manager', 'Manager'),
    ('Employee', 'Employé');

INSERT INTO "user" (email, first_name, last_name, password, birthdate, phone_number, city_label, postal_code, street_label, street_number, points_number, experience, role_label) 
VALUES
    ('alice.smith@gmail.com', 'Alice', 'Smith', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1990-04-15', '0470111111', 'Namur', 5000, 'Rue Emile Cuvelier', 1, 150, 0, 'Admin'),
    ('Martin.smith@gmail.com', 'Martin', 'Smith', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1990-04-15', '0470222222', 'Namur', 5000, 'Rue de Fer', 1, 150, 0, 'Manager'),
    ('bob.johnson@hotmail.com', 'Bob', 'Johnson', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1985-12-01', '0470333333', 'Namur', 5000, 'Rue Godefroid', 1, 200,  0, 'Employee'),
    ('claire.davis@outlook.com', 'Claire', 'Davis', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1982-06-22', '0470444444', 'Namur', 5000, 'Boulevard de Bruxelles', 1, 180,  0, 'Employee'),
    ('john.miller@gmail.com', 'John', 'Miller', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1995-09-30', '0470555555', 'Namur', 5000, 'Rue Rogier', 1, 120,  0, 'Employee'),
    ('emily.brown@orange.be', 'Emily', 'Brown', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1988-11-18', '0470666666', 'Namur', 5000, 'Rue des Brasseurs', 1, 90,  500, NULL),
    ('michael.wilson@yahoo.be', 'Michael', 'Wilson', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1987-03-03', '0470777777', 'Namur', 5000, 'Avenue des Combattants', 1, 250,  1500, NULL),
    ('sophie.martin@free.be', 'Sophie', 'Martin', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1993-07-12', '0470888888', 'Namur', 5000, 'Rue Marie-Henriette', 1, 300 ,  2500, NULL);

INSERT INTO "problem_type" (label, description, emergency_degree)
VALUES
    ('water_leak', 'Fuite d''eau', 1),
    ('electricity_failure', 'Panne d''électricité', 2),
    ('road_deterioration', 'Détérioration de la route', 3),
    ('garbage_dump', 'Dépôt sauvage', 4),
    ('graffiti', 'Graffiti', 5);

INSERT INTO "problem" (id, description, latitude, longitude, picture, status, report_date, solved_date, problem_type_label, user_email)
VALUES
    (1, 'Fuite d''eau dans la rue Emile Cuvelier', 50.464508056640625, 4.866512775421143, '/uploads/reports/water_leak.jpg', 'En attente', '2024-12-10', NULL, 'water_leak', 'michael.wilson@yahoo.be'),
    (2, 'Panne d''électricité dans la rue de Fer', 50.4655684, 4.8651746, '/uploads/reports/electricity_failure.jpg', 'En attente', '2024-11-20', NULL, 'electricity_failure', 'sophie.martin@free.be');

INSERT INTO "voucher" (label, description, points_required, picture) 
VALUES
    ('cavo', 'Cavo est un restaurant de la ville de Namur', 1500, '/uploads/vouchers/cavo.jpg'),
    ('cameo', 'Cameo est un cinema de la ville de Namur', 500, '/uploads/vouchers/cameo.jpg'),
    ('walibi', 'Walibi est un parc de la ville de Wavre', 1400, '/uploads/vouchers/walibi.jpg'),
    ('laconfluence', 'La Confluence est un restaurant de la ville de Namur', 1500, '/uploads/vouchers/la-confluence.jpg'),
    ('acinapolis', 'Acinapolis est un cinema de la ville de Jambes', 500, '/uploads/vouchers/acinapolis.jpg');

INSERT INTO "user_voucher" (code, claim_date, expiration_date, user_email, voucher_label) 
VALUES
    (1, '2024-12-10', '2025-12-10', 'sophie.martin@free.be', 'cavo'),
    (2, '2024-11-20', '2025-11-20', 'sophie.martin@free.be', 'cameo'),
    (3, '2024-10-05', '2025-10-05', 'sophie.martin@free.be', 'walibi'),
    (4, '2024-09-15', '2025-09-15', 'sophie.martin@free.be', 'laconfluence'),
    (5, '2024-08-25', '2025-08-25', 'sophie.martin@free.be', 'acinapolis');  

INSERT INTO "job" (user_email, problem_id, job_date)
VALUES
    ('bob.johnson@hotmail.com', 1, '2024-12-10'),
    ('bob.johnson@hotmail.com', 2, '2024-11-20');