import Router from 'express-promise-router';
import { default as managerRouter } from './manager.js';
import { default as userRouter } from './user.js';
import { default as restaurantRouter } from './restaurant.js';
import { default as cinemaRouter } from './cinema.js';
import { default as amusementParkRouter } from './amusementPark.js';
import { default as reportRouter } from "./report.js";
import { default as leaderboardRouter } from "./leaderboard.js";
import { default as reportTypeRouter } from "./reportType.js";
import { default as userVoucherRouter } from './userVoucher.js';
import { loginUser } from '../controler/user.js';
import { sign } from "../util/jwt.js";

const router = Router();

// Routeurs montés
router.use('/user', userRouter);
router.use('/manager', managerRouter);
router.use('/restaurant', restaurantRouter);
router.use('/cinema', cinemaRouter);
router.use('/amusement-park', amusementParkRouter);
router.use("/report", reportRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/reportType", reportTypeRouter);
router.use("/user-voucher", userVoucherRouter);

// Route POST /login avec middleware loginUser
router.post("/login", loginUser, (req, res) => {
  if (!req?.user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const { email, status } = req.user;
  const token = sign({ status: status || "User", email });

  res.json({ token, email, status });
});

export default router;