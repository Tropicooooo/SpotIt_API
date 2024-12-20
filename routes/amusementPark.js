import { Router } from 'express';
import { getAmusementParks } from "../controler/amusementPark.js";

const router = Router();

/**
 * @swagger
 * /amusementPark:
 *   get:
 *     summary: Retrieve a list of amusement parks
 *     description: Retrieve a list of amusement parks from the database.
 *     responses:
 *       200:
 *         description: A list of amusement parks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The amusement park ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the amusement park.
 *                     example: "Wonderland"
 *                   location:
 *                     type: string
 *                     description: The location of the amusement park.
 *                     example: "123 Fun St, Adventure City"
 *                   attractions:
 *                     type: array
 *                     description: List of attractions in the amusement park.
 *                     items:
 *                       type: string
 *                       example: "Roller Coaster"
 */

router.get("/", getAmusementParks);

export default router;