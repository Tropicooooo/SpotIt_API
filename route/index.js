import {Router} from 'express';
import {default as userRouter} from "./user.js";
import {default as problemRouter} from "./problem.js";
import {default as leaderboardRouter} from "./leaderboard.js";
import {default as problemTypeRouter} from "./problemType.js";

const router = Router();

router.use("/user", userRouter);
router.use("/problem", problemRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/problemType", problemTypeRouter)

export default router;