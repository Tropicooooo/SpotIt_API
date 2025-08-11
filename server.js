import { default as Router } from './routes/index.js';
import { fileURLToPath } from 'url';

import express from "express";
import cors from 'cors';
import path from 'path';

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

const UPLOADS_FOLDER = path.join(__dirname, './uploads');

app.use('/uploads', express.static(UPLOADS_FOLDER));
app.use("/v1", Router);

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
