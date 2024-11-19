export const getUser = async (SQLClient, { id }) => {
    const { rows } = await SQLClient.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return rows[0];
};
