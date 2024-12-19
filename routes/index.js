import Router from 'express-promise-router';
import {default as managerRouter} from './manager.js';
import {default as userRouter} from './user.js';
import {default as restaurantRouter} from './restaurant.js';
import {default as cinemaRouter} from './cinema.js';
import {default as amusementParkRouter} from './amusementPark.js';

const router = Router();

router.use('/manager', managerRouter);
router.use('/user', userRouter);
router.use('/restaurant', restaurantRouter);
router.use('/cinema', cinemaRouter);
router.use('/amusement-park', amusementParkRouter);

export default router