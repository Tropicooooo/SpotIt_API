import "dotenv/config";
import pg from "pg";


const pgPool = new pg.Pool({
    user: process.env.DB_USER,           // Vérifie que ces valeurs existent
    host: process.env.DB_HOST,           // Le nom d'hôte est 'postgres' (nom du service dans Compose)
    database: process.env.DB_NAME,       // Nom de la base de données
    password: process.env.DB_PASSWORD,   // Mot de passe
    port: 5432
  });
  

export const pool = {
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

process.on("exit", () => {
    pgPool.end().then(() => console.log("pool closed"));
});