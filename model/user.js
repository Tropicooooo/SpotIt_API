import { hash } from '../util/index.js';

export const getAllUsers = async (SQLClient, { page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const { rows } = await SQLClient.query(
    'SELECT email AS "email", first_name AS "firstname", last_name AS "lastname", TO_CHAR(birthdate, \'YYYY-MM-DD\') AS "birthdate", phone_number AS "phone", city_label AS "cityLabel", postal_code AS "postalCode", street_label AS "streetLabel", street_number AS "streetNumber", points_number AS "pointsNumber", experience AS "experience", role_label AS "role" FROM "user" LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return rows;
};

export const getAllUsersByName = async (SQLClient) => {
  try {
    const { rows } = await SQLClient.query(`
      SELECT 
          email AS "email", 
          first_name AS "firstname", 
          last_name AS "lastname" 
      FROM "user"
    `);
    return rows;
  } catch (err) {
    console.error('Failed to get employees', err);
    return [];
  }
};

export const getOneUser = async (SQLClient, { email }) => {
  const { rows } = await SQLClient.query(
    'SELECT email AS "email", first_name AS "firstname", last_name AS "lastname", TO_CHAR(birthdate, \'YYYY-MM-DD\') AS "birthdate", phone_number AS "phone", city_label AS "cityLabel", postal_code AS "postalCode", street_label AS "streetLabel", street_number AS "streetNumber", points_number AS "pointsNumber", experience AS "experience", role_label AS "role" FROM "user" WHERE email = $1',
    [email]
  );
  return rows[0];
};

export const getUserByEmail = async (SQLClient, email) => {
  const { rows } = await SQLClient.query(
    `SELECT 
      email AS "email",
      first_name AS "firstname",
      last_name AS "lastname",
      TO_CHAR(birthdate, 'YYYY-MM-DD') AS "birthdate",
      phone_number AS "phone",
      city_label AS "cityLabel",
      postal_code AS "postalCode",
      street_label AS "streetLabel",
      street_number AS "streetNumber",
      points_number AS "pointsNumber",
      experience AS "experience",
      role_label AS "role",
      password  -- récupération du hash du mot de passe
    FROM "user"
    WHERE email = $1`,
    [email]
  );
  return rows[0];
};

export const createUser = async (
  SQLClient,
  { email, firstname, lastname, password, birthdate, phone, cityLabel, postalCode, streetLabel, streetNumber, pointsNumber }
) => {
  return await SQLClient.query(
    'INSERT INTO "user" (email, first_name, last_name, password, birthdate, phone_number, city_label, postal_code, street_label, street_number, points_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
    [email, firstname, lastname, await hash(password), birthdate, phone, cityLabel, postalCode, streetLabel, streetNumber, pointsNumber]
  );
};

export const updateUser = async (
  SQLClient,
  { email, firstname, lastname, password, birthdate, phone, cityLabel, postalCode, streetLabel, streetNumber, pointsNumber, experience, role }
) => {
  let query = 'UPDATE "user" SET ';
  const querySet = [];
  const queryValues = [];

  if (email) {
    queryValues.push(email);
    querySet.push(`email = $${queryValues.length}`);
  }
  if (firstname) {
    queryValues.push(firstname);
    querySet.push(`first_name = $${queryValues.length}`);
  }
  if (lastname) {
    queryValues.push(lastname);
    querySet.push(`last_name = $${queryValues.length}`);
  }
  if (password) {
    queryValues.push(await hash(password));
    querySet.push(`password = $${queryValues.length}`);
  }
  if (birthdate) {
    queryValues.push(birthdate);
    querySet.push(`birthdate = $${queryValues.length}`);
  }
  if (phone) {
    queryValues.push(phone);
    querySet.push(`phone_number = $${queryValues.length}`);
  }
  if (cityLabel) {
    queryValues.push(cityLabel);
    querySet.push(`city_label = $${queryValues.length}`);
  }
  if (postalCode) {
    queryValues.push(postalCode);
    querySet.push(`postal_code = $${queryValues.length}`);
  }
  if (streetLabel) {
    queryValues.push(streetLabel);
    querySet.push(`street_label = $${queryValues.length}`);
  }
  if (streetNumber) {
    queryValues.push(streetNumber);
    querySet.push(`street_number = $${queryValues.length}`);
  }
  if (pointsNumber) {
    queryValues.push(pointsNumber);
    querySet.push(`points_number = $${queryValues.length}`);
  }
  if (experience) {
    queryValues.push(experience);
    querySet.push(`experience = $${queryValues.length}`);
  }
  if (role) {
    queryValues.push(role);
    querySet.push(`role_label = $${queryValues.length}`);
  } else {
    querySet.push(`role_label = NULL`);
  }

  if (queryValues.length > 0 || !role) {
    queryValues.push(email);
    query += `${querySet.join(', ')} WHERE email = $${queryValues.length}`;
    return await SQLClient.query(query, queryValues);
  } else {
    throw new Error('No field given');
  }
};

export const deleteUser = async (SQLClient, { email }) => {
  try {
    await SQLClient.query('BEGIN');
    await SQLClient.query('DELETE FROM "job" WHERE user_email = $1', [email]);
    const result = await SQLClient.query('DELETE FROM "user" WHERE email = $1', [email]);
    await SQLClient.query('COMMIT');
    return result;
  } catch (error) {
    await SQLClient.query('ROLLBACK');
    throw error;
  }
};

export const getTotalUsers = async (SQLClient) => {
  const result = await SQLClient.query('SELECT COUNT(*) AS total FROM "user"');
  const total = result.rows[0].total;
  return total;
};