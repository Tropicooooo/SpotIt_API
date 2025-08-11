import { getAllReportType } from "../controler/reportType.js";

import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /reportType:
 *   get:
 *     summary: Retrieve a list of report types
 *     description: Retrieve a list of report types from the database.
 *     responses:
 *       200:
 *         description: A list of report types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The report type ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the report type.
 *                     example: "Bug Report"
 */

router.get("/", getAllReportType);

export default router;