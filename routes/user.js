import Router from 'express-promise-router';
import {updateUser, getUser, createUser} from '../controler/user.js';
import {userValidatorMiddleware as PVM} from '../middleware/validation.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {user} from '../middleware/authorization/mustBe.js';

const router = Router();

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJ1c2VyIiwiZW1haWwiOiJhbGljZS5zbWl0aEBnbWFpbC5jb20ifQ.yFyNQXzwkykCqvmhTQByTzsSK2Hk66fUQivBcx9VCQ0
/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Retrieve the current user's information
 *     description: Retrieve the current user's information based on the JWT token.
 *     responses:
 *       200:
 *         description: The user's information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: "alice.smith@gmail.com"
 *                 status:
 *                   type: string
 *                   description: The user's status.
 *                   example: "user"
 */

/**
 * @swagger
 * /user/me:
 *   patch:
 *     summary: Update the current user's information
 *     description: Update the current user's information based on the JWT token.
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
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: The user's updated information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: "alice.smith@gmail.com"
 *                 status:
 *                   type: string
 *                   description: The user's status.
 *                   example: "user"
 */

/**
 * @swagger
 * /user/meWithoutPassword:
 *   patch:
 *     summary: Update the current user's information without changing the password
 *     description: Update the current user's information without changing the password based on the JWT token.
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
 *     responses:
 *       200:
 *         description: The user's updated information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                   example: "alice.smith@gmail.com"
 *                 status:
 *                   type: string
 *                   description: The user's status.
 *                   example: "user"
 */

router.get('/me', checkJWT, user, getUser);
router.patch('/me', checkJWT, user, PVM.user, updateUser);
router.patch('/meWithoutPassword', checkJWT, user, PVM.updateWithoutPassword, updateUser);
router.post('/create', PVM.user, createUser);
export default router;