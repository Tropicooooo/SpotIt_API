import Router from 'express-promise-router';
import {default as managerRouter} from './manager.js';
import {default as userRouter} from './user.js';
import {default as restaurantRouter} from './restaurant.js';
import {default as cinemaRouter} from './cinema.js';
import {default as amusementParkRouter} from './amusementPark.js';
import {default as reportRouter} from "./report.js";
import {default as leaderboardRouter} from "./leaderboard.js";
import {default as reportTypeRouter} from "./reportType.js";

const router = Router();
//manager eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJtYW5hZ2VyIn0.Qz0fmEFxEX0BODyxTmIq1G9utZHQClt6VeuLm3OvEGo
//employee eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJlbXBsb3llZSJ9.0s0KE1EPYW3UtRJAm-y2vY2HWMxC0BCpZnNPt6k3lyg
//admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhZG1pbiJ9.s3iHEHUT5cAX_JTtHC5f3HY2jt0692mVPM5JctndWQM
router.use('/manager', managerRouter);
router.use('/user', userRouter);
router.use('/restaurant', restaurantRouter);
router.use('/cinema', cinemaRouter);
router.use('/amusement-park', amusementParkRouter);
router.use("/report", reportRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/reportType", reportTypeRouter)

export default router