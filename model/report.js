import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { reverseGeocode , geocodeAddress} from '../util/geocode.js';

export const getAllReports = async (SQLClient, { page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;

  try {
    const { rows } = await SQLClient.query(
      `SELECT 
          P.id AS "id",
          TO_CHAR(P.report_date, 'YYYY-MM-DD') AS "report_date",
          P.status AS "status",
          CONCAT(P.latitude, ', ', P.longitude) AS "address",
          P.latitude AS "latitude",
          P.longitude AS "longitude",
          P.problem_type_label AS "problemtypelabel",
          P.user_email AS "userEmail",
          J.user_email AS "responsable",
          P.picture AS "picture",
          P.description AS "description",
          TO_CHAR(P.solved_date, 'YYYY-MM-DD') AS "solved_date"
       FROM problem P
       LEFT JOIN job J ON P.id = J.problem_id
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const reportsWithAddress = await Promise.all(
      rows.map(async (report) => {
        const { latitude, longitude } = report;
        const geocodedAddress = await reverseGeocode(latitude, longitude);
        return {
          ...report,
          geocodedaddress: geocodedAddress,
        };
      })
    );
    return reportsWithAddress;
  } catch (err) {
    console.error('Error fetching reports', err);
    return [];
  }
};

export const getAllReport = async (SQLClient, { id }) => {
  const searchId = `${id}%`;
  
  try {
    const { rows } = await SQLClient.query(
      `SELECT 
          P.id AS "id",
          TO_CHAR(P.report_date, 'YYYY-MM-DD') AS "report_date",
          P.status AS "status",
          CONCAT(P.latitude, ', ', P.longitude) AS "address",
          P.latitude AS "latitude",
          P.longitude AS "longitude",
          P.problem_type_label AS "problemtypelabel",
          P.user_email AS "userEmail",
          J.user_email AS "responsable",
          P.picture AS "picture",
          P.description AS "description",
          TO_CHAR(P.solved_date, 'YYYY-MM-DD') AS "solved_date"
       FROM problem P
       LEFT JOIN job J ON P.id = J.problem_id
       WHERE CAST(P.id AS TEXT) LIKE $1`,
      [searchId]
    );

    const reportsWithAddress = await Promise.all(
      rows.map(async (report) => {
        const { latitude, longitude } = report;
        const geocodedAddress = await reverseGeocode(latitude, longitude);
        return {
          ...report,
          geocodedaddress: geocodedAddress,
        };
      })
    );
    
    return reportsWithAddress;
  } catch (err) {
    console.error('Error fetching reports', err);
    return [];
  }
};

export const getReportsByRegion = async (SQLClient, { latMin, latMax, lngMin, lngMax, type, status, emergencyDegreeMin, emergencyDegreeMax }) => {
  const tolerance = 0.0005;

  let query = `
    SELECT 
      Problem.*, 
      Problem_Type.Label AS problemTypeLabel, 
      Problem_Type.Emergency_Degree AS emergencyDegree, 
      Problem_Type.Description AS problemTypeDescription 
    FROM 
      Problem 
    JOIN 
      Problem_Type ON Problem.problem_type_label = Problem_Type.label 
    WHERE 
      Latitude BETWEEN ${latMin - tolerance} AND ${latMax + tolerance} 
      AND Longitude BETWEEN ${lngMin - tolerance} AND ${lngMax + tolerance}
  `;

  const values = [];
  let placeholderIndex = 1;

  if (status) {
    const statusArray = status.split(',').map(s => s.trim());
    const statusPlaceholders = statusArray.map((_, i) => `$${placeholderIndex + i}`).join(', ');
    query += ` AND Problem.Status IN (${statusPlaceholders})`;
    values.push(...statusArray);
    placeholderIndex += statusArray.length;
  }

  if (type) {
    const typeArray = type.split(',').map(t => t.trim());
    const typePlaceholders = typeArray.map((_, i) => `$${placeholderIndex + i}`).join(', ');
    query += ` AND Problem_Type.Label IN (${typePlaceholders})`;
    values.push(...typeArray);
    placeholderIndex += typeArray.length;
  }

  if (emergencyDegreeMin && emergencyDegreeMax) {
    query += ` AND Problem_Type.Emergency_Degree BETWEEN $${placeholderIndex} AND $${placeholderIndex + 1}`;
    values.push(emergencyDegreeMin, emergencyDegreeMax);
  }

  try {
    const { rows } = await SQLClient.query(query, values);

    return rows;
  } catch (err) {
    console.error('Error fetching reports in region', err);
    return [];
  }
};

export const getOneReport = async (SQLClient, { id }) => {
  const { rows } = await SQLClient.query(
      "SELECT * FROM Problem WHERE id = $1", 
      [id]
  );
  return rows[0];
};

export const createReport = async (
  SQLClient,
  { status, userEmail, description, reportdate, problemtypelabel, picture, responsable, geocodedaddress }
) => {
  console.log('addReport model', { status, userEmail, description, reportdate, problemtypelabel, picture, responsable, geocodedaddress });

  reportdate = reportdate || new Date().toISOString();
  try {
    await SQLClient.query('BEGIN');

    const adresse = await geocodeAddress(geocodedaddress);
    const insertProblemQuery = `
      INSERT INTO Problem (Description, Latitude, Longitude, Problem_Type_Label, Status, Report_Date, Picture, User_Email) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING ID
    `;
    const insertProblemValues = [description, adresse?.latitude, adresse?.longitude ,problemtypelabel, status, reportdate, picture, userEmail];
    const result = await SQLClient.query(insertProblemQuery, insertProblemValues);

    const problemId = result.rows[0].id;

    if (responsable && responsable !== "null") {
      const insertJobQuery = `
        INSERT INTO Job (User_Email, Problem_ID, Job_Date) 
        VALUES ($1, $2, CURRENT_DATE)
      `;
      const insertJobValues = [responsable, problemId];
      await SQLClient.query(insertJobQuery, insertJobValues);
    }

    await SQLClient.query('COMMIT');

    return { success: true };
  } catch (error) {
    await SQLClient.query('ROLLBACK');
    console.error('Transaction failed:', error);
    return { success: false, error };
  }
};

export const updateReport = async (
  SQLClient,
  { id, report_date, solved_date, responsable, status, geocodedaddress, description, problemtypelabel }
) => {
  try {
    await SQLClient.query('BEGIN');

    const adresse = await geocodeAddress(geocodedaddress);

    if (status === 'Résolu' && (!solved_date || solved_date === null)) {
      solved_date = new Date().toISOString(); 
    } else if (status !== 'Résolu') {
      solved_date = null;
    }

    let query = `
      UPDATE Problem 
      SET Description = $1, Latitude = $2, Longitude = $3, Problem_Type_Label = $4, Status = $5, Report_Date = $6
    `;
    const values = [description, adresse?.latitude, adresse?.longitude, problemtypelabel, status, report_date];
    let paramIndex = 7;

    if (solved_date) {
      query += `, Solved_Date = $${paramIndex}`;
      values.push(solved_date);
      paramIndex += 1;
    }

    query += ` WHERE ID = $${paramIndex}`;
    values.push(id);

    await SQLClient.query(query, values);

    if (status === 'Résolu') {
      const userQuery = `
        SELECT user_email 
        FROM Problem 
        WHERE ID = $1
      `;
      const userResult = await SQLClient.query(userQuery, [id]);

      if (userResult.rows.length > 0) {
        const userEmail = userResult.rows[0].user_email;
        
        const updateUserQuery = `
          UPDATE "user" 
          SET points_number = points_number + 20, experience = experience + 10 
          WHERE email = $1
        `;
        await SQLClient.query(updateUserQuery, [userEmail]);
      }
    }

    if (responsable && responsable !== 'null') {
      const checkQuery = `SELECT User_Email FROM Job WHERE Problem_ID = $1`;
      const result = await SQLClient.query(checkQuery, [id]);

      if (result.rows.length > 0) {
        const updateJobQuery = `
          UPDATE Job 
          SET User_Email = $1, Job_Date = CURRENT_DATE 
          WHERE Problem_ID = $2
        `;
        await SQLClient.query(updateJobQuery, [responsable, id]);
      } else {
        const insertJobQuery = `
          INSERT INTO Job (User_Email, Problem_ID, Job_Date) 
          VALUES ($1, $2, CURRENT_DATE)
        `;
        await SQLClient.query(insertJobQuery, [responsable, id]);
      }
    }

    await SQLClient.query('COMMIT');
    return { success: true };
  } catch (error) {
    await SQLClient.query('ROLLBACK');
    console.error('Transaction failed:', error);
    return { success: false, error };
  }
};


export const deleteReport = async (SQLClient, { id }) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    await SQLClient.query('DELETE FROM job WHERE problem_id = $1', [id]);

    const result = await SQLClient.query('SELECT picture FROM Problem WHERE ID = $1', [id]);
    const picturePath = result.rows[0]?.picture;

    if (!picturePath) {
      console.warn(`No picture found for problem_id: ${id}`);
    } else {
      const fullPath = path.join(__dirname, '../../app/', picturePath);

      fs.unlink(fullPath, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.error(`File not found: ${fullPath}`);
          } else {
            console.error(`Failed to delete file: ${err.message}`);
          }
        }
      });
    }

    await SQLClient.query('DELETE FROM Problem WHERE ID = $1', [id]);
  } catch (error) {
    console.error('Database query or file deletion error:', error);
  }
};

export const getTotalReports = async (SQLClient) => {
  const result = await SQLClient.query('SELECT COUNT(*) AS total FROM problem');
  const total = result.rows[0].total;
  return total;
};
