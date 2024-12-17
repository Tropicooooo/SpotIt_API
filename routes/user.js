import Router from 'express-promise-router';
import {updateUser} from '../controler/user.js';
import {userValidatorMiddleware as PVM} from '../middleware/validation.js';

const router = Router();

router.patch('/me', PVM.user, updateUser);

export default router;