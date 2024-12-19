DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "role" CASCADE;
DROP TABLE IF EXISTS "problem" CASCADE;
DROP TABLE IF EXISTS "problem_type" CASCADE;
DROP TABLE IF EXISTS "voucher" CASCADE;
DROP TABLE IF EXISTS "user_voucher" CASCADE;
DROP TABLE IF EXISTS "job" CASCADE;

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

CREATE TABLE "role" (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL
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

CREATE TABLE "problem_type" (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    emergency_degree INT NOT NULL
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

INSERT INTO "user" (email, first_name, last_name, password, birthdate, phone_number, city_label, postal_code, street_label, street_number, points_number, role_label) 
VALUES
    ('alice.smith@gmail.com', 'Alice', 'Smith', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1990-04-15', '0470123456', 'Namur', 5000, 'Rue du Ravioli', 101, 150, 'Admin'),
    ('bob.johnson@hotmail.com', 'Bob', 'Johnson', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1985-12-01', '0471123456', 'Bruxelles', 1000, 'Avenue des Brocolis', 205, 200, 'Employee'),
    ('claire.davis@outlook.com', 'Claire', 'Davis', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1982-06-22', '0472123456', 'Arlon', 6700, 'Boulevard de la Framboise', 150, 180, 'Employee'),
    ('john.miller@gmail.com', 'John', 'Miller', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1995-09-30', '0473123456', 'Mons', 7000, 'Rue du Beurre', 58, 120, 'Employee'),
    ('emily.brown@orange.fr', 'Emily', 'Brown', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1988-11-18', '0474123456', 'Bouillon', 6830, 'Place de la Frite', 102, 90, 'Employee');

INSERT INTO "role" (label, description) VALUES
    ('Admin', 'Administrateur'),
    ('Employee', 'Employé');

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