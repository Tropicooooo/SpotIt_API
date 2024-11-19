export const getLeaderboard = async (SQLClient) => {
    const { rows } = await SQLClient.query(
      'SELECT * FROM "user" ORDER BY experience DESC LIMIT 10'
    );
    return rows;
  };
  