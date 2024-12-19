import Router from 'express-promise-router';
import {default as managerRouter} from './manager.js';
import {default as userRouter} from './user.js';

const router = Router();

router.use('/manager', managerRouter);
router.use('/user', userRouter);

export default router