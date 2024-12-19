import Router from 'express-promise-router';
import {updateUser, getUser} from '../controler/user.js';
import {userValidatorMiddleware as PVM} from '../middleware/validation.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {user} from '../middleware/authorization/mustBe.js';

const router = Router();

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJ1c2VyIiwiZW1haWwiOiJhbGljZS5zbWl0aEBnbWFpbC5jb20ifQ.yFyNQXzwkykCqvmhTQByTzsSK2Hk66fUQivBcx9VCQ0
router.get('/me', checkJWT ,user, getUser);
router.patch('/me',checkJWT ,user, PVM.user, updateUser);
router.patch('/meWithoutPassword',checkJWT ,user, PVM.updateWithoutPassword, updateUser);

export default router;