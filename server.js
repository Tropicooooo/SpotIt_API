import express from "express";
import {default as Router} from './routes/index.js';
import cors from 'cors';
const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(Router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});