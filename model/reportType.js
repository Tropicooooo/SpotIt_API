export const getReportTypes = async (SQLClient, { page = 1, limit = 10 }) => {
    const { rows } = await SQLClient.query(
      'SELECT * FROM problem_type LIMIT $1 OFFSET $2', [limit, (page - 1) * limit]
    );
    return rows;
};

export const getAllReportType = async (SQLClient) => {
  const { rows } = await SQLClient.query(
    'SELECT * FROM problem_type'
  );
  return rows;
};


export const createReportType = async (SQLClient, { label, description,  emergency_degree}) => {
    try {
        console.log(label, description, emergency_degree);
        await SQLClient.query(`INSERT INTO problem_type(label, description, emergency_degree) VALUES ($1, $2, $3);`, [label, description, emergency_degree]);
        console.log('Report type has been successfully created.');
    } catch (err) {
        console.error('Failed to create report type', err);
    }
}

export const updateReportType = async (SQLClient, { label, description, emergency_degree }, labelUpdate) => {
    try {
        let query = `
            UPDATE problem_type
            SET 
                description = $1,
                emergency_degree = $2
        `;
        const values = [description, emergency_degree];

        // Si labelUpdate est fourni, on met aussi à jour le label
        if (labelUpdate) {
            query += `, label = $3 WHERE label = $4;`;
            values.push(label, labelUpdate);
        } else {
            query += ` WHERE label = $3;`;
            values.push(label);
        }

        await SQLClient.query(query, values);

        console.log(`Report type with label "${label}" has been successfully updated to "${labelUpdate || label}".`);
    } catch (err) {
        console.error('Failed to update report type', err);
    }
};



export const deleteReportType = async (SQLClient, { label }) => {
    try {
        await SQLClient.query(`
            DELETE FROM problem_type
            WHERE label = $1;
        `, [label]);

    } catch (err) {
        console.error('Failed to delete report type', err);
    }
}

export const getTotalReportType = async (SQLClient) => {
    const { rows } = await SQLClient.query(
      'SELECT COUNT(*) FROM problem_type'
    );
    return rows[0].count;
};