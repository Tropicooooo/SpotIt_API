import Router from 'express-promise-router';
import {default as managerRouter} from './manager.js';
import {default as userRouter} from './user.js';
import {default as restaurantRouter} from './restaurant.js';
import {default as cinemaRouter} from './cinema.js';
import {default as amusementParkRouter} from './amusementPark.js';
import {default as reportRouter} from "./report.js";
import {default as leaderboardRouter} from "./leaderboard.js";
import {default as reportTypeRouter} from "./reportType.js";
import {default as userVoucherRouter} from './userVoucher.js';
import { getUser } from '../controler/user.js';
import {sign} from "../util/jwt.js";


const router = Router();

router.use('/manager', managerRouter);
router.use('/user', userRouter);
router.use('/restaurant', restaurantRouter);
router.use('/cinema', cinemaRouter);
router.use('/amusement-park', amusementParkRouter);
router.use("/report", reportRouter);
router.use("/leaderboard", leaderboardRouter);
router.use("/reportType", reportTypeRouter);
router.use("/user-voucher", userVoucherRouter);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: "alice.smith@gmail.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: "alice.smith@gmail.com"
 *                 status:
 *                   type: string
 *                   description: The user's status.
 *                   example: "user"
 *       401:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid email or password"
 */
router.post("/login", getUser, (req, res) => {
  // Assurez-vous que getUser ajoute les infos utilisateur dans req.user
  if (!req?.user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  
  const { email, status} = req?.user;
  let token;
    // Générer un token avec les informations utilisateur
    if(status){
      token = sign( {status, email});
    }else{
      token = sign( {status : "User", email});
    }

    // Renvoyer le token au client
  res.json({token, email, status});
});

export default router;