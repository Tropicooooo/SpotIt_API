-- node scripts/JS/initDB.js

CREATE TABLE ProblemType (
    Label VARCHAR(50) PRIMARY KEY,
    Description TEXT NOT NULL,
    EmergencyDegree INT NOT NULL
);

CREATE TABLE Problem (
    ID SERIAL PRIMARY KEY,
    Description TEXT NOT NULL,
    Latitude DOUBLE PRECISION,
    Longitude DOUBLE PRECISION,
    Picture TEXT,
    Status VARCHAR(20),
    ReportDate DATE,
    SolvedDate DATE,
    ProblemTypeLabel VARCHAR(50),
    FOREIGN KEY (ProblemTypeLabel) REFERENCES ProblemType(Label)
);

CREATE TABLE Role (
    Label VARCHAR(50) PRIMARY KEY,
    Description TEXT NOT NULL
);

CREATE TABLE "user" (
    Email VARCHAR(100) PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Password TEXT NOT NULL,
    BirthDate DATE,
    PhoneNumber VARCHAR(20),
    CityLabel VARCHAR(50),
    PostalCode VARCHAR(20),
    StreetNumber INT,
    StreetLabel VARCHAR(100),
    PointsNumber INT DEFAULT 0,
    RoleLabel VARCHAR(50),
    FOREIGN KEY (RoleLabel) REFERENCES Role(Label)
);

CREATE TABLE Voucher (
    Label VARCHAR(50) PRIMARY KEY,
    Description TEXT NOT NULL,
    PointsNumber INT NOT NULL
);

CREATE TABLE UserVoucher (
    Code VARCHAR(50) PRIMARY KEY,
    ClaimDate DATE,
    ExpirationDate DATE,
    UserEmail VARCHAR(100),
    VoucherLabel VARCHAR(50),
    FOREIGN KEY (UserEmail) REFERENCES "User"(Email),
    FOREIGN KEY (VoucherLabel) REFERENCES Voucher(Label)
);

CREATE TABLE Job (
    UserEmail VARCHAR(100),
    ProblemID INT,
    JobDate DATE,
    PRIMARY KEY (UserEmail, ProblemID),
    FOREIGN KEY (UserEmail) REFERENCES "User"(Email),
    FOREIGN KEY (ProblemID) REFERENCES Problem(ID)
);

INSERT INTO ProblemType (Label, Description, EmergencyDegree) VALUES
('WaterLeak', 'Fuite d eau', 3),
('ElectricIssue', 'Probleme electrique', 4),
('RoadDamage', 'Dommage a la chaussee', 2);

INSERT INTO Problem (Description, Latitude, Longitude, Picture, Status, ReportDate, SolvedDate, ProblemTypeLabel) VALUES
('Fuite d eau importante', 50.8466, 4.3528, 'waterleak.jpg', 'Open', '2024-11-01', NULL, 'WaterLeak'),
('Panne electrique dans le quartier', 50.8503, 4.3517, 'electric.jpg', 'In Progress', '2024-11-05', NULL, 'ElectricIssue'),
('Trou profond sur la route', 50.8472, 4.3495, 'road.jpg', 'Closed', '2024-11-07', '2024-11-10', 'RoadDamage');

INSERT INTO Role (Label, Description) VALUES
('Admin', 'Administrateur ayant acces total'),
('User', 'Utilisateur simple'),
('Technician', 'Technicien pour resoudre les problemes');

INSERT INTO "User" (Email, FirstName, LastName, Password, BirthDate, PhoneNumber, CityLabel, PostalCode, StreetNumber, StreetLabel, PointsNumber, RoleLabel) VALUES
('admin@example.com', 'Alice', 'Admin', '$2b$10$hashpassword', '1990-01-01', '0489123456', 'Bruxelles', '1000', 12, 'Rue Centrale', 100, 'Admin'),
('user1@example.com', 'Bob', 'User', '$2b$10$hashpassword', '1995-05-15', '0489345678', 'Liège', '4000', 5, 'Rue de la Paix', 20, 'User'),
('tech1@example.com', 'Charlie', 'Tech', '$2b$10$hashpassword', '1985-09-09', '0489567890', 'Namur', '5000', 3, 'Rue du Travail', 10, 'Technician');

INSERT INTO Voucher (Label, Description, PointsNumber) VALUES
('CoffeeVoucher', 'Bon pour un cafe gratuit', 10),
('MealVoucher', 'Bon pour un repas gratuit', 30),
('GiftCard', 'Bon pour une carte cadeau', 50);

INSERT INTO UserVoucher (Code, ClaimDate, ExpirationDate, UserEmail, VoucherLabel) VALUES
('VCH001', '2024-10-01', '2025-01-01', 'user1@example.com', 'CoffeeVoucher'),
('VCH002', '2024-11-01', '2025-02-01', 'user1@example.com', 'MealVoucher'),
('VCH003', '2024-11-05', '2025-03-05', 'tech1@example.com', 'GiftCard');

INSERT INTO Job (UserEmail, ProblemID, JobDate) VALUES
('tech1@example.com', 1, '2024-11-02'),
('tech1@example.com', 2, '2024-11-06');
