
import { reverseGeocode , geocodeAddress} from '../util/geocode.js';

export const getAllJobs = async (SQLClient, { page = 1, limit = 10, email }) => {
    const offset = (page - 1) * limit;

    try {
        const { rows } = await SQLClient.query(
            `SELECT 
                j.problem_id AS "id",
                TO_CHAR(p.report_date, 'YYYY-MM-DD') AS "report_date",
                TO_CHAR(p.solved_date, 'YYYY-MM-DD') AS "solved_date",
                p.status AS "status",
                P.latitude AS "latitude",
                P.longitude AS "longitude",
                p.problem_type_label AS "problemtypelabel",
                p.user_email AS "userEmail",
                p.picture AS "picture",
                p.description AS "description"
            FROM job j
            JOIN problem p ON j.problem_id = p.id 
            WHERE j.user_email = $1
            LIMIT $2 OFFSET $3`,
            [email, limit, offset]
        );
        const jobsWithAddress = await Promise.all(
             rows.map(async (job) => {
               const { latitude, longitude } = job;
               const geocodedAddress = await reverseGeocode(latitude, longitude);
               return {
                 ...job,
                 geocodedaddress: geocodedAddress,
               };
             })
           );
           return jobsWithAddress;
         } catch (err) {
           console.error('Error fetching reports', err);
           return [];
         }
};

export const getOneJob = async (SQLClient, { id }) => {
  const searchId = `${id}%`;
  
  try {
    const { rows } = await SQLClient.query(
      `SELECT 
          p.id AS "id",
          TO_CHAR(p.report_date, 'YYYY-MM-DD') AS "report_date",
          p.status AS "status",
          CONCAT(p.latitude, ', ', p.longitude) AS "address",
          p.latitude AS "latitude",
          p.longitude AS "longitude",
          p.problem_type_label AS "problemtypelabel",
          p.user_email AS "userEmail",
          j.user_email AS "responsable",
          p.picture AS "picture",
          p.description AS "description",
          TO_CHAR(p.solved_date, 'YYYY-MM-DD') AS "solved_date"
       FROM job j
       JOIN problem p ON j.problem_id = p.id
       WHERE CAST(j.problem_id AS TEXT) LIKE $1`,
      [searchId]
    );

    const jobsWithAddress = await Promise.all(
      rows.map(async (job) => {
        const { latitude, longitude } = job;
        const geocodedAddress = await reverseGeocode(latitude, longitude);
        return {
          ...job,
          geocodedaddress: geocodedAddress,
        };
      })
    );
    
    return jobsWithAddress;
  } catch (err) {
    console.error('Error fetching jobs', err);
    return [];
  }
};


export const updateJob = async (SQLClient, { id, report_date, status, solved_date, geocodedaddress, problemtypelabel, userEmail, description }) => {

  try {
    const adresse = await geocodeAddress(geocodedaddress);

    let query = `
      UPDATE Problem 
      SET Status = $1, Problem_Type_Label = $2, Description = $3, Latitude = $4, Longitude = $5, User_Email = $6, Report_Date = $7
    `;
    const values = [
      status,
      problemtypelabel,
      description,
      adresse?.latitude,
      adresse?.longitude,
      userEmail,
      report_date,
    ];
    let paramIndex = 8;

    if (solved_date) {
      query += `, Solved_Date = $${paramIndex}`;
      values.push(solved_date);
      paramIndex += 1;
    } else if (status === "Résolu") {
      query += `, Solved_Date = CURRENT_DATE`;
    } else if (status === "En cours" || status === "En attente") {
      query += `, Solved_Date = NULL`;
    }

    query += ` WHERE ID = $${paramIndex}`;
    values.push(id);

    await SQLClient.query(query, values);

    return { success: true };
  } catch (error) {
    console.error('Update failed:', error);
    return { success: false, error };
  }
};

export const getTotalJobs = async (SQLClient, {email}) => {
    const result = await SQLClient.query('SELECT COUNT(*) AS total FROM job where user_email = $1 ', [email]);
    const total = result.rows[0].total
    return total;
};  
