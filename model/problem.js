export const getProblem = async (SQLClient, { id }) => {
  const { rows } = await SQLClient.query(
      "SELECT * FROM Problem WHERE id = $1", 
      [id]
  );
  return rows[0];
};

export const addProblem = async (SQLClient, { description, latitude, longitude, picture, problemTypeLabel }) => {
  await SQLClient.query(
      `INSERT INTO Problem (Description, Latitude, Longitude, Picture, ProblemTypeLabel) 
       VALUES ($1, $2, $3, $4, $5)`,
      [description, latitude, longitude, picture, problemTypeLabel]
  );
};


export const getProblemsInRegion = async (SQLClient, { latMin, latMax, lngMin, lngMax, type, status, emergencyDegreeMin, emergencyDegreeMax }) => {
  // Construire la base de la requête avec une jointure vers ProblemType
  let query = `
    SELECT Problem.*, ProblemType.Label AS problemTypeLabel, ProblemType.EmergencyDegree AS emergencyDegree
    FROM Problem
    JOIN ProblemType ON Problem.ProblemTypeLabel = ProblemType.Label
    WHERE Latitude BETWEEN $1 AND $2
    AND Longitude BETWEEN $3 AND $4
  `;

  const values = [latMin, latMax, lngMin, lngMax];

  // Ajouter une clause pour le statut si un statut est fourni
  if (status) {
    query += ` AND Status = $${values.length + 1}`;
    values.push(status);
  }

  // Ajouter une clause pour le type si un type est fourni
  if (type) {
    query += ` AND ProblemType.Label = $${values.length + 1}`;
    values.push(type);
  }

  // Ajouter une clause pour l'emergencyDegree si des valeurs minimales et maximales sont fournies
  if (emergencyDegreeMin && emergencyDegreeMax) {
    query += ` AND ProblemType.EmergencyDegree BETWEEN $${values.length + 1} AND $${values.length + 2}`;
    values.push(emergencyDegreeMin);
    values.push(emergencyDegreeMax);
  }

  // Exécuter la requête et récupérer les résultats
  const { rows } = await SQLClient.query(query, values);
  return rows;
};
