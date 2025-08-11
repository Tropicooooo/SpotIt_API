import { getAllCinemas } from "../controler/cinema.js";

import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /cinema:
 *   get:
 *     summary: Retrieve a list of cinemas
 *     description: Retrieve a list of cinemas from the database.
 *     responses:
 *       200:
 *         description: A list of cinemas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The cinema ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the cinema.
 *                     example: "Cinema Paradiso"
 *                   location:
 *                     type: string
 *                     description: The location of the cinema.
 *                     example: "456 Movie Blvd, Film City"
 *                   screens:
 *                     type: integer
 *                     description: The number of screens in the cinema.
 *                     example: 10
 */

router.get("/", getAllCinemas);

export default router;
