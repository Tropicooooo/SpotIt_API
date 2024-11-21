export const getProblemType = async (SQLClient) => {
    const { rows } = await SQLClient.query(
      'SELECT * FROM problemtype'
    );
    return rows;
  };
  