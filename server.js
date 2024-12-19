import express from "express";
import { default as Router } from './routes/index.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3001;

// Résolution de __dirname pour ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware CORS pour permettre la communication frontend-backend
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Chemin pour les fichiers uploadés
const UPLOADS_FOLDER = path.join(__dirname, './uploads');

// Middleware pour servir les fichiers statiques (images)
app.use('/uploads', express.static(UPLOADS_FOLDER));


app.use(Router);

// Démarre le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});