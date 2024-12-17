export const getLeaderboard = async (SQLClient) => {
    const { rows } = await SQLClient.query(
      "SELECT * FROM Users ORDER BY experience DESC LIMIT 10"
    );
    return rows;
  };
  