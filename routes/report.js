import { getOneReport, createReport, getAllReportsByRegion } from "../controler/report.js";

import { Router } from 'express';
import path from 'path';
import { configureUpload } from '../upload/upload.js';

const router = Router();

const REPORTS_FOLDER = path.join(new URL(import.meta.url).pathname, '../../uploads/reports');
const reportUpload = configureUpload(REPORTS_FOLDER);

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API pour gérer les rapports
 */

/**
 * @swagger
 * /reports/{id}:
 *   get:
 *     summary: Obtenir un rapport par ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rapport
 *     responses:
 *       200:
 *         description: Rapport obtenu avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Rapport non trouvé
 */

router.get("/:id", getOneReport);

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Récupérer les rapports dans une région donnée
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: region
 *         required: true
 *         schema:
 *           type: string
 *         description: Région des rapports
 *     responses:
 *       200:
 *         description: Liste des rapports obtenue
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */

router.get("/", getAllReportsByRegion);

/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Ajouter un rapport avec une image
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rapport ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Données invalides
 */

router.post("/", reportUpload.single('image'), createReport);

export default router;
