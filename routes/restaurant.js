import { Router } from 'express';
import { getRestaurants } from "../controler/restaurant.js";

const router = Router();

/**
 * @swagger
 * /restaurant:
 *   get:
 *     summary: Retrieve a list of restaurants
 *     description: Retrieve a list of restaurants from the database.
 *     responses:
 *       200:
 *         description: A list of restaurants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The restaurant ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the restaurant.
 *                     example: "Le Gourmet"
 *                   address:
 *                     type: string
 *                     description: The address of the restaurant.
 *                     example: "123 Main St, Cityville"
 *                   cuisine:
 *                     type: string
 *                     description: The type of cuisine the restaurant offers.
 *                     example: "French"
 */

router.get("/", getRestaurants);

export default router;