import { Router } from 'express';
import path from 'path';
import { getReport, addReport, getReportsInRegion } from "../controler/report.js";
import { configureUpload } from '../upload/upload.js';

const router = Router();

const REPORTS_FOLDER = path.join(new URL(import.meta.url).pathname, '../../uploads/reports');
const reportUpload = configureUpload(REPORTS_FOLDER);

// Routes pour obtenir un seul rapport par ID
router.get("/:id", getReport);

// Routes pour récupérer les rapports dans une région donnée
router.get("/", getReportsInRegion);

// Route pour ajouter un rapport avec une image
router.post("/", reportUpload.single('image'), addReport);

  

export default router;
