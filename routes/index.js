import Router from 'express-promise-router';
import {default as managerRouter} from './manager.js';
import {default as userRouter} from './user.js';
import {default as restaurantRouter} from './restaurant.js';
import {default as cinemaRouter} from './cinema.js';
import {default as amusementParkRouter} from './amusementPark.js';
import {default as reportRouter} from "./report.js";
import {default as leaderboardRouter} from "./leaderboard.js";
import {default as reportTypeRouter} from "./reportType.js";
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

router.post("/login", getUser, (req, res) => {
    console.log("index.js req.body:",req.body);
  // Assurez-vous que getUser ajoute les infos utilisateur dans req.user

  if (!req?.user) {
    console.log("routes:", req?.body);
    return res.status(401).json({ error: "Invalid email or password" });
  }
  
  const { email, status} = req?.user;
  console.log("index req.user:", req?.user);
  let token;
    // Générer un token avec les informations utilisateur
  if(status){
    token = sign( {status})
  }else{
    token = sign( {status : "User", email});
  }

    // Renvoyer le token au client
    console.log("index.js token:",token);
  res.json({token});
});

export default router;