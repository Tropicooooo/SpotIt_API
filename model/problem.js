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
  let query = `
    SELECT Problem.*, ProblemType.Label AS problemTypeLabel, ProblemType.EmergencyDegree AS emergencyDegree
    FROM Problem
    JOIN ProblemType ON Problem.ProblemTypeLabel = ProblemType.Label
    WHERE Latitude BETWEEN $1 AND $2
    AND Longitude BETWEEN $3 AND $4
  `;

  const values = [latMin, latMax, lngMin, lngMax];

  if (status) {
    const statusArray = status.split(','); //
    query += ` AND Problem.Status IN (${statusArray.map((_, i) => `$${values.length + i + 1}`).join(",")})`;
    values.push(...statusArray);
  }

  if (type) {
    const typeArray = type.split(',').map(t => t.trim());
    query += ` AND ProblemType.Label IN (${typeArray.map((_, i) => `$${values.length + i + 1}`).join(",")})`;
    values.push(...typeArray);
}


  if (emergencyDegreeMin && emergencyDegreeMax) {
    query += ` AND ProblemType.EmergencyDegree BETWEEN $${values.length + 1} AND $${values.length + 2}`;
    values.push(emergencyDegreeMin, emergencyDegreeMax);
  }

  const { rows } = await SQLClient.query(query, values);
  return rows;
};