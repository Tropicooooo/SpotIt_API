import {Router} from 'express';
import {default as userRouter} from "./user.js";
import {default as problemRouter} from "./problem.js";
import {default as leaderboardRouter} from "./leaderboard.js";

const router = Router();

router.use("/user", userRouter);
router.use("/problem", problemRouter);
router.use("/leaderboard", leaderboardRouter);

export default router;