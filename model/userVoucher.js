export const getUserVouchers = async (SQLClient, { page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit; 
    const {rows} = await SQLClient.query('SELECT code AS "code", claim_date AS "claimDate", expiration_date AS "expirationDate", user_email AS "userEmail", voucher_label AS "voucherLabel" FROM "user_voucher" LIMIT $1 OFFSET $2', [limit, offset]);    
    return rows;
};

export const getUserVoucher = async (SQLClient, {code}) => {  //OK   
    const {rows} = await SQLClient.query('SELECT code AS "code", claim_date AS "claimDate", expiration_date AS "expirationDate", user_email AS "userEmail", voucher_label AS "voucherLabel" FROM "user_voucher" WHERE code = $1', [code]);
    return rows[0];
};

export const getTotalUserVouchers = async (SQLClient) => {  //OK
    const result = await SQLClient.query('SELECT COUNT(*) AS total FROM "user_voucher"');
    const total = result.rows[0].total;
    return total;
};

export const deleteUserVoucher = async (SQLClient, {code}) => {  //OK  
    return await SQLClient.query('DELETE FROM "user_voucher" WHERE code = $1', [code]);
}

export const createUserVoucher = async (SQLClient, { code, claimDate, expirationDate, userEmail, voucherLabel }) => {  //OK
    return await SQLClient.query('INSERT INTO "user_voucher" (code, claim_date, expiration_date, user_email, voucher_label) VALUES ($1, $2, $3, $4, $5)', [code, claimDate, expirationDate, userEmail, voucherLabel]);
}

export	const updateUserVoucher = async (SQLClient, { code, claimDate, expirationDate, userEmail, voucherLabel }, codeUpdate) => {   //OK
    let query = 'UPDATE "user_voucher" SET';
    const querySet = [];
    const queryValues = [];
    if(codeUpdate && code !== codeUpdate){
        queryValues.push(code);
        querySet.push(`code = $${queryValues.length}`);
    }
    if(claimDate){
        queryValues.push(claimDate);
        querySet.push(`claim_date = $${queryValues.length}`);
    }
    if(expirationDate){
        queryValues.push(expirationDate);
        querySet.push(`expiration_date = $${queryValues.length}`);
    }
    if(userEmail){
        queryValues.push(userEmail);
        querySet.push(`user_email = $${queryValues.length}`);
    }
    if(voucherLabel){
        queryValues.push(voucherLabel);
        querySet.push(`voucher_label = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(codeUpdate || code);
        query += `${querySet.join(', ')} WHERE code = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
}