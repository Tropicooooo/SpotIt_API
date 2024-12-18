import Router from 'express-promise-router';
import {default as managerRouter} from './manager.js';
import {default as userRouter} from './user.js';
import {default as reportRouter} from "./report.js";
import {default as leaderboardRouter} from "./leaderboard.js";
import {default as reportTypeRouter} from "./reportType.js";

const router = Router();

router.use('/manager', managerRouter);
router.use('/user', userRouter);
router.use("/report", reportRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/reportType", reportTypeRouter)

export default router