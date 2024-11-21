export const getUser = async (SQLClient, { email }) => {
    const { rows } = await SQLClient.query('SELECT * FROM "user" WHERE email = $1', [email]);
    return rows[0];
};
