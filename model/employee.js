export const getEmployees = async (SQLClient, {page = 1, limit = 10}) => {
    const offset = (page - 1) * limit;

    try {
        const { rows } = await SQLClient.query(`
            SELECT 
                email AS "email",
                first_name AS "firstname",
                last_name AS "lastname",
                TO_CHAR(birthdate, 'YYYY-MM-DD') AS "birthdate",
                phone_number AS "phone_number",
                city_label AS "cityLabel",
                postal_code AS "postalCode",
                street_label AS "streetLabel",
                street_number AS "streetNumber",
                points_number AS "pointsNumber",
                role_label AS "role"
            FROM "user"
            INNER JOIN role ON "user".role_label = role.label
            WHERE role.label = $1
            LIMIT $2 OFFSET $3;
        `, ["Technician", limit, offset]);

        return rows;
    } catch (err) {
        console.error('Failed to get employees', err);
        return [];
    }
};


export const getEmployee = async (SQLClient, { email }) => {
    const searchEmail = `${email}%`;

    try {
        const { rows } = await SQLClient.query(`
            SELECT 
                u.email AS "email", 
                u.first_name AS "firstname", 
                u.last_name AS "lastname", 
                u.city_label AS "cityLabel", 
                u.postal_code AS "postalCode", 
                u.street_label AS "streetLabel", 
                u.street_number AS "streetNumber", 
                u.role_label AS "role", 
                u.phone_number AS "phoneNumber",
                r.description AS "roleDescription"
            FROM "user" AS u
            INNER JOIN role AS r ON u.role_label = r.label
            WHERE u.email LIKE $1 
              AND u.role_label IS NOT NULL;
        `, [searchEmail]);

        return rows[0] || null; 
    } catch (err) {
        console.error('Failed to get employee', err);
        return null;
    }
};

export const getTotalEmployees = async (SQLClient) => {
    try {
        const { rows } = await SQLClient.query(`
            SELECT COUNT(u.email) AS total 
            FROM "user" AS u
            INNER JOIN role AS r ON u.role_label = r.label
            WHERE u.role_label = $1;
        `, ["Technician"]);

        return parseInt(rows[0].total, 10);
    } catch (err) {
        console.error('Failed to get total employees', err);
        return 0;
    }
};


export const deleteEmployee = async (SQLClient, { email }) => {
    try {
        await SQLClient.query(`
            UPDATE "user" 
            SET role_label = NULL 
            WHERE email = $1;
        `, [email]);

        console.log(`Employee with email ${email} has been successfully updated.`);
    } catch (err) {
        console.error('Failed to delete employee', err);
    }
};


export const updateEmployee = async (SQLClient, { email, firstname, lastname, phone, cityLabel, postalCode, streetLabel, streetNumber, role }) => {
    try {
        await SQLClient.query(`
            UPDATE "user" 
            SET 
                first_name = $1, 
                last_name = $2, 
                phone_number = $3, 
                city_label = $4, 
                postal_code = $5, 
                street_label = $6, 
                street_number = $7, 
                role_label = $8 
            WHERE email = $9;
        `, [firstname, lastname, phone, cityLabel, postalCode, streetLabel, streetNumber, role, email]);

        console.log(`Employee with email ${email} has been successfully updated.`);
    } catch (err) {
        console.error('Failed to update employee', err);
    }
};


export const getEmployeesName = async (SQLClient) => {
    try {
        const { rows } = await SQLClient.query(`
            SELECT 
                email AS "email", 
                first_name AS "firstname", 
                last_name AS "lastname" 
            FROM "user" 
            WHERE role_label = $1;
        `, ["Technician"]);

        return rows;
    } catch (err) {
        console.error('Failed to get employees', err);
        return [];
    }
};
