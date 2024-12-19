export const getCinemas = async (SQLClient, { page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;

    const query = `
        SELECT 
            label AS "label", 
            description AS "description", 
            points_number AS "pointsNumber", 
            picture AS "picture" 
        FROM "voucher" 
        WHERE description ILIKE '%cinema%' 
        LIMIT $1 OFFSET $2
    `;

    const { rows } = await SQLClient.query(query, [limit, offset]);
    return rows;
};