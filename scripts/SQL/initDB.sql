DROP TABLE IF EXISTS "role" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "problem_type" CASCADE;
DROP TABLE IF EXISTS "problem" CASCADE;
DROP TABLE IF EXISTS "voucher" CASCADE;
DROP TABLE IF EXISTS "user_voucher" CASCADE;
DROP TABLE IF EXISTS "job" CASCADE;

CREATE TABLE "role" (
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
CREATE TABLE "problem_type" (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    emergency_degree INT NOT NULL
);

CREATE TABLE "problem" (
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
CREATE TABLE "voucher" (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    points_required INT NOT NULL,
    picture VARCHAR(200) NOT NULL
);

CREATE TABLE "user_voucher" (
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
CREATE TABLE "job" (
    user_email VARCHAR(100),
    problem_id INT,
    job_date DATE,
    PRIMARY KEY (user_email, problem_id),
    FOREIGN KEY (user_email) REFERENCES "user"(email),
    FOREIGN KEY (problem_id) REFERENCES problem(id)
);

INSERT INTO "role" (label, description) VALUES
INSERT INTO "role" (label, description) VALUES
    ('Admin', 'Administrateur'),
    ('Employee', 'Employé');

INSERT INTO "user" (email, first_name, last_name, password, birthdate, phone_number, city_label, postal_code, street_label, street_number, points_number, experience, role_label) 
VALUES
    ('alice.smith@gmail.com', 'Alice', 'Smith', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1990-04-15', '0123456789', 'Paris', 7500, 'Rue de Rivoli', 101, 150, 0, 'Admin'),
    ('bob.johnson@hotmail.com', 'Bob', 'Johnson', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1985-12-01', '0123456780', 'Lyon', 6900, 'Avenue des Brotteaux', 205, 200,  0, 'Employee'),
    ('claire.davis@outlook.com', 'Claire', 'Davis', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1982-06-22', '0123456790', 'Marseille', 1300, 'Boulevard de la Canebière', 150, 180,  0, 'Employee'),
    ('john.miller@gmail.com', 'John', 'Miller', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1995-09-30', '0123456791', 'Toulouse', 3100, 'Rue du Taur', 58, 120,  0, 'Employee'),
    ('emily.brown@orange.be', 'Emily', 'Brown', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1988-11-18', '0123456792', 'Bordeaux', 3300, 'Place de la Bourse', 102, 90,  500, NULL),
    ('michael.wilson@yahoo.be', 'Michael', 'Wilson', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1987-03-03', '0123456793', 'Nice', 6666, 'Avenue Jean Médecin', 89, 250,  1500, NULL),
    ('sophie.martin@free.be', 'Sophie', 'Martin', '$argon2id$v=19$m=65536,t=3,p=4$/6bIVl3vXsAw4PhoykaRug$kXcPi1lpiNHtdDHSXqGA5P3JWypI3VlN5FluRkfcHhE', '1993-07-12', '0123456794', 'Lille', 5900, 'Rue de la République', 44, 300 ,  2500, NULL);

INSERT INTO "problem_type" (label, description, emergency_degree) VALUES
INSERT INTO "problem_type" (label, description, emergency_degree) VALUES
    ('water_leak', 'Fuite d''eau', 1),
    ('electricity_failure', 'Panne d''électricité', 2),
    ('road_deterioration', 'Détérioration de la route', 3),
    ('garbage_dump', 'Dépôt sauvage', 4),
    ('graffiti', 'Graffiti', 5);

INSERT INTO "voucher" (label, description, points_required, picture) 
VALUES
    ('lepetitgourmet', 'Le Petit Gourmet est un restaurant de la ville de Namur', 500, '/uploads/vouchers/grogu.jpg'),
    ('cinemastar', 'Cinema Star est un cinema de la ville de Liège', 250, '/uploads/vouchers/grogu.jpg'),
    ('parcdesplaisirs', 'Parc des Plaisirs est un parc de la ville de Mons', 800, '/uploads/vouchers/grogu.jpg'),
    ('chezjuliette', 'Chez Juliette est un restaurant de la ville de Tournai', 500, '/uploads/vouchers/grogu.jpg'),
    ('cinemalumina', 'Cinema Lumina est un cinema de la ville de Bruxelles', 250, '/uploads/vouchers/grogu.jpg');

INSERT INTO "user_voucher" (code, claim_date, expiration_date, user_email, voucher_label) 
VALUES
    (1, '2024-12-10', '2025-12-10', 'alice.smith@gmail.com', 'lepetitgourmet'),
    (2, '2024-11-20', '2025-11-20', 'alice.smith@gmail.com', 'cinemastar'),
    (3, '2024-10-05', '2025-10-05', 'alice.smith@gmail.com', 'parcdesplaisirs'),
    (4, '2024-09-15', '2025-09-15', 'alice.smith@gmail.com', 'chezjuliette'),
    (5, '2024-08-25', '2025-08-25', 'alice.smith@gmail.com', 'cinemalumina');

    