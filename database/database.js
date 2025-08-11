import 'dotenv/config';
import pg from 'pg';

const pgPool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
});

export const pool = {
    connect: async () => {
        try {
            const client = await pgPool.connect();
            return {
                query : async (query, params) => {
                    try {
                        return await client.query(query, params);
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                },
                release : () => {
                    return client.release();
                }
            };
        } catch (e){
            console.error(e);
            throw e;
        }
    },
    query: async (query, params) => {
        try {
            return await pgPool.query(query, params);
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    end : () => {
        return pgPool.end();
    }
};

process.on('exit', () => {
    pgPool.end();
});
