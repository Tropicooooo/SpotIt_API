export const getProblem = async (SQLClient, { id }) => {
  const { rows } = await SQLClient.query(
      "SELECT * FROM Problem WHERE ProblemID = $1", 
      [id]
  );
  return rows[0];
};

export const addProblem = async (SQLClient, { description, latitude, longitude, picture }) => {
  await SQLClient.query(
      `INSERT INTO Problem (Description, Latitude, Longitude, Picture) 
       VALUES ($1, $2, $3, $4)`,
      [description, latitude, longitude, picture]
  );
};


export const getProblemsInRegion = async (SQLClient, { latMin, latMax, lngMin, lngMax, type, status, importanceMin, importanceMax }) => {
  // Construire la base de la requête
  let query = `
    SELECT * FROM Problem
    WHERE Latitude BETWEEN $1 AND $2
    AND Longitude BETWEEN $3 AND $4
  `;

  const values = [latMin, latMax, lngMin, lngMax];

  // Ajouter une clause pour le statut si un statut est fourni
  if (status) {
    query += ` AND Status = $5`;
    values.push(status);
  }

  // Ajouter une clause pour le type si un type est fourni
  if (type) {
    query += ` AND Type = $${values.length + 1}`;
    values.push(type);
  }

  // Ajouter une clause pour l'importance si une importance minimale et maximale sont fournies
  if (importanceMin && importanceMax) {
    query += ` AND Importance BETWEEN $${values.length + 1} AND $${values.length + 2}`;
    values.push(importanceMin);
    values.push(importanceMax);
  }

  const { rows } = await SQLClient.query(query, values);
  return rows;
};
