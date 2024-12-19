import Router from 'express-promise-router';
import {getUsers, getUser,updateUser, deleteUser, createUser} from '../controler/manager.js';
import {managerValidatorMiddleware as MPV} from '../middleware/validation.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager} from '../middleware/authorization/mustBe.js';

const router = Router();

router.get('/users',checkJWT ,manager ,getUsers);
router.get('/user', checkJWT ,manager, getUser)
router.delete('/user', checkJWT ,manager,deleteUser);
router.patch('/userWithoutPassword', checkJWT ,manager,MPV.updateWithoutPassword, updateUser);
router.patch('/user', checkJWT , manager,MPV.user, updateUser);
router.post('/user', checkJWT ,manager,MPV.user, createUser);

export default router;