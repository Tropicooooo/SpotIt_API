import { Router } from 'express';
import { getLeaderboard } from "../controler/leaderboard.js";

const router = Router();

router.get("/", getLeaderboard);

export default router;
