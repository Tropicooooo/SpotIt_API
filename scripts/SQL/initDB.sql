CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    experience INTEGER DEFAULT 0 NOT NULL
);


CREATE TABLE IF NOT EXISTS Problem (
    ProblemID SERIAL PRIMARY KEY,       -- Identifiant unique du problème
    Description TEXT,                   -- Description du problème (optionnel)
    Latitude DECIMAL(10, 8) NOT NULL,   -- Latitude (coordonnée géographique)
    Longitude DECIMAL(11, 8) NOT NULL,  -- Longitude (coordonnée géographique)
    Picture TEXT,                       -- Chemin ou URL de l'image (optionnel)
    Status VARCHAR(50) DEFAULT 'En attente' NOT NULL, -- Statut par défaut
    ReportDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, -- Date actuelle par défaut
    SolvedDate TIMESTAMP                -- Date de résolution du problème (optionnel)
);