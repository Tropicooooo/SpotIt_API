import Router from 'express-promise-router';
import {updateUser} from '../controler/user.js';
import {userValidatorMiddleware as PVM} from '../middleware/validation.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {user} from '../middleware/authorization/mustBe.js';

const router = Router();

router.patch('/me',checkJWT ,user, PVM.user, updateUser);

export default router;