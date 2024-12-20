import { Router } from 'express';
import { getLeaderboard } from "../controler/leaderboard.js";

const router = Router();

/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Retrieve the leaderboard
 *     description: Retrieve the leaderboard with user rankings.
 *     responses:
 *       200:
 *         description: A list of users with their rankings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   username:
 *                     type: string
 *                     description: The username.
 *                     example: "john_doe"
 *                   points:
 *                     type: integer
 *                     description: The user's points.
 *                     example: 1500
 */

router.get("/", getLeaderboard);

export default router;