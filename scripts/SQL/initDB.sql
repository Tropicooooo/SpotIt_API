DROP TABLE IF EXISTS role CASCADE;
CREATE TABLE role (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL
);

DROP TABLE IF EXISTS "user" CASCADE;
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
    role_label VARCHAR(50),
    FOREIGN KEY (role_label) REFERENCES role(label)
);

INSERT INTO "user" (email, first_name, last_name, password, birthdate, phone_number, city_label, postal_code, street_label, street_number, points_number) 
VALUES
    ('alice.smith@gmail.com', 'Alice', 'Smith', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1990-04-15', '0123456789', 'Paris', 7500, 'Rue de Rivoli', 101, 150),
    ('bob.johnson@hotmail.com', 'Bob', 'Johnson', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1985-12-01', '0123456780', 'Lyon', 6900, 'Avenue des Brotteaux', 205, 200),
    ('claire.davis@outlook.com', 'Claire', 'Davis', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1982-06-22', '0123456790', 'Marseille', 1300, 'Boulevard de la Canebière', 150, 180),
    ('john.miller@gmail.com', 'John', 'Miller', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1995-09-30', '0123456791', 'Toulouse', 3100, 'Rue du Taur', 58, 120),
    ('emily.brown@orange.fr', 'Emily', 'Brown', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1988-11-18', '0123456792', 'Bordeaux', 3300, 'Place de la Bourse', 102, 90),
    ('michael.wilson@yahoo.fr', 'Michael', 'Wilson', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1987-03-03', '0123456793', 'Nice', 6666, 'Avenue Jean Médecin', 89, 250),
    ('sophie.martin@free.fr', 'Sophie', 'Martin', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1993-07-12', '0123456794', 'Lille', 5900, 'Rue de la République', 44, 300),
    ('david.moore@gmail.com', 'David', 'Moore', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1991-02-27', '0123456795', 'Paris', 7501, 'Rue de la Paix', 73, 50),
    ('lucy.martinez@hotmail.fr', 'Lucy', 'Martinez', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1990-08-21', '0123456796', 'Strasbourg', 6700, 'Place Kléber', 15, 120),
    ('mark.taylor@live.com', 'Mark', 'Taylor', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1980-01-11', '0123456797', 'Nantes', 4400, 'Quai de la Fosse', 256, 75),
    ('lisa.anderson@gmail.com', 'Lisa', 'Anderson', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1992-05-14', '0123456798', 'Montpellier', 3400, 'Avenue du Peyrou', 93, 130),
    ('kevin.thompson@gmail.com', 'Kevin', 'Thompson', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1989-04-10', '0123456799', 'Rennes', 3500, 'Place de la République', 203, 200),
    ('chloe.white@outlook.fr', 'Chloe', 'White', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1994-10-05', '0123456800', 'Grenoble', 3800, 'Rue Félix Viallet', 82, 180),
    ('oliver.harris@orange.fr', 'Oliver', 'Harris', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1986-02-28', '0123456801', 'Lyon', 6901, 'Rue Victor Hugo', 140, 100),
    ('isabelle.garcia@aol.com', 'Isabelle', 'Garcia', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1983-11-17', '0123456802', 'Le Havre', 7660, 'Boulevard de Strasbourg', 67, 70),
    ('andrew.jackson@outlook.com', 'Andrew', 'Jackson', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1990-12-02', '0123456803', 'Lille', 5910, 'Rue Faidherbe', 89, 90),
    ('sarah.clark@live.fr', 'Sarah', 'Clark', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1992-01-30', '0123456804', 'Marseille', 1301, 'Cours Julien', 120, 50),
    ('peter.lewis@yahoo.fr', 'Peter', 'Lewis', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1985-05-25', '0123456805', 'Paris', 7502, 'Rue de Charonne', 54, 60),
    ('amelia.king@gmail.com', 'Amelia', 'King', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1993-07-06', '0123456806', 'Nice', 6666, 'Rue du Vieux-Nice', 67, 140),
    ('james.walker@hotmail.com', 'James', 'Walker', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1987-10-03', '0123456807', 'Paris', 7500, 'Place des Vosges', 22, 300),
    ('anna.taylor@free.fr', 'Anna', 'Taylor', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1989-09-16', '0123456808', 'Lyon', 6902, 'Place Bellecour', 77, 180),
    ('nathan.martin@live.com', 'Nathan', 'Martin', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1981-12-05', '0123456809', 'Bordeaux', 3301, 'Cours de l''Intendance', 88, 120),
    ('martha.jones@aol.com', 'Martha', 'Jones', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1994-04-20', '0123456810', 'Toulouse', 3101, 'Boulevard Lascrosses', 99, 80),
    ('charles.moore@outlook.fr', 'Charles', 'Moore', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1984-08-14', '0123456811', 'Strasbourg', 6701, 'Rue de l''Église', 45, 250),
    ('susan.lee@gmail.com', 'Susan', 'Lee', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1982-02-01', '0123456812', 'Paris', 7504, 'Rue de la Montagne Sainte-Geneviève', 34, 100),
    ('victor.williams@outlook.com', 'Victor', 'Boudin', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1991-01-23', '0123456813', 'Marseille', 1302, 'Rue de la République', 67, 200),
    ('carol.green@hotmail.com', 'Carol', 'Green', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1983-06-17', '0123456814', 'Nice', 0602, 'Avenue Félix Faure', 53, 250),
    ('ethan.adams@gmail.com', 'Ethan', 'Adams', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1987-03-11', '0123456815', 'Toulouse', 3102, 'Place du Capitole', 10, 220),
    ('michael.martinez@aol.com', 'Michael', 'Martinez', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1990-05-05', '0123456816', 'Lille', 5900, 'Rue Nationale', 32, 80),
    ('lily.evans@gmail.com', 'Lily', 'Evans', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1986-09-09', '0123456817', 'Bordeaux', 3302, 'Quai des Chartrons', 101, 170),
    ('ryan.hernandez@outlook.com', 'Ryan','Reynolds', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1995-04-21', '0123456818', 'Marseille', 1303, 'Place de la Joliette', 59, 250),
    ('olivia.perez@orange.fr', 'Olivia', 'Perez', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1988-10-16', '0123456819', 'Rennes', 3500, 'Rue de la Visitation', 12, 90),
    ('jackson.rodriguez@gmail.com', 'Jackson', 'Rodriguez', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1992-06-09', '0123456820', 'Strasbourg', 6700, 'Place de la République', 99, 50),
    ('lucas.carter@hotmail.com', 'Lucas', 'Carter', '$argon2id$v=19$m=65536,t=3,p=4$ej/iYfi2zoqQyJkwcRkJNQ$NNfjIghgqDsVNUOMDlKGFZ1jDz2poHMfkD34i6WgT6c', '1985-11-02', '0123456821', 'Lyon', 6900, 'Boulevard de la Croix-Rousse', 35, 200);

DROP TABLE IF EXISTS problem_type CASCADE;
CREATE TABLE problem_type (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    emergency_degree INT NOT NULL
);

DROP TABLE IF EXISTS problem CASCADE;
CREATE TABLE problem (
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


DROP TABLE IF EXISTS voucher CASCADE;
CREATE TABLE voucher (
    label VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    points_required INT NOT NULL
);

DROP TABLE IF EXISTS user_voucher CASCADE;
CREATE TABLE user_voucher (
    code VARCHAR(50) PRIMARY KEY,
    claim_date DATE,
    expiration_date DATE,
    user_email VARCHAR(100),
    voucher_label VARCHAR(50),
    FOREIGN KEY (user_email) REFERENCES "user"(email),
    FOREIGN KEY (voucher_label) REFERENCES voucher(label)
);

DROP TABLE IF EXISTS job CASCADE;
CREATE TABLE job (
    user_email VARCHAR(100),
    problem_id INT,
    job_date DATE,
    PRIMARY KEY (user_email, problem_id),
    FOREIGN KEY (user_email) REFERENCES "user"(email),
    FOREIGN KEY (problem_id) REFERENCES problem(id)
);
