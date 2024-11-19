import express from "express";
import { default as Router } from "./route/index.js";

const app = express();
const port = 3001;

app.use(express.json({ limit: '10mb' }));

app.use(Router);

app.listen(port, () => {
    console.log(`SpotIt listening at http://localhost:${port}`);
});
