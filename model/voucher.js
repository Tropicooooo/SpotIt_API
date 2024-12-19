export const getVouchers = async (SQLClient, { page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit; 
    const {rows} = await SQLClient.query('SELECT label AS "label", description AS "description", points_required AS "pointsNumber", picture AS "picture" FROM "voucher" LIMIT $1 OFFSET $2', [limit, offset]);    
    return rows;
};

export const getVoucher = async (SQLClient, {label}) => { 
    const {rows} = await SQLClient.query('SELECT label AS "label", description AS "description", points_required AS "pointsNumber", picture AS "picture" FROM "voucher" WHERE label = $1', [label]);
    return rows[0];
};

export const getTotalVouchers = async (SQLClient) => {
    const result = await SQLClient.query('SELECT COUNT(*) AS total FROM "voucher"');
    const total = result.rows[0].total;
    return total;
};

export const deleteVoucher = async (SQLClient, {label}) => { 
    return await SQLClient.query('DELETE FROM "voucher" WHERE label = $1', [label]);
}

export const createVoucher = async (SQLClient, { label, description, pointsNumber, picture }) => {
    return await SQLClient.query('INSERT INTO "voucher" (label, description, points_number, picture) VALUES ($1, $2, $3, $4)', [label, description, pointsNumber, picture]);
}

export	const updateVoucher = async (SQLClient, { label, description, pointsNumber, picture }, labelUpdate) => {
    let query = 'UPDATE "voucher" SET ';
    const querySet = [];
    const queryValues = [];
    if(labelUpdate && label !== labelUpdate){
        queryValues.push(label);
        querySet.push(`label = $${queryValues.length}`);
    }
    if(description){
        queryValues.push(description);
        querySet.push(`description = $${queryValues.length}`);
    }
    if(pointsNumber){
        queryValues.push(pointsNumber);
        querySet.push(`points_number = $${queryValues.length}`);
    }
    if(picture){
        queryValues.push(picture);
        querySet.push(`picture = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(labelUpdate || label);
        query += `${querySet.join(', ')} WHERE label = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
}