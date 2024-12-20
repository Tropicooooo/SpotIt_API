import Router from 'express-promise-router';
import { getUsers, getUser, updateUser, deleteUser, createUser } from '../controler/manager.js';
import { getVouchers, getVoucher, createVoucher, deleteVoucher, updateVoucher } from '../controler/manager.js';
import { getUserVouchers, getUserVoucher, createUserVoucher, deleteUserVoucher, updateUserVoucher } from '../controler/manager.js';
import { managerValidatorMiddleware as MPV } from '../middleware/validation.js';
import { checkJWT } from '../middleware/identification/jwt.js';
import { manager, employee, admin } from '../middleware/authorization/mustBe.js';
import { getEmployees, deleteEmployee, updateEmployee, getEmployee, getAllReports, getAllReport, updateReport, createReport, getJobs, getJob, updateJob, deleteReport, getReportTypes, getEmployeesName, updateReportType, createReportType, getAllReportType, deleteReportType, getUsersName } from '../controler/manager.js';
import { configureUpload } from '../upload/upload.js';
import path from 'path';

const router = Router();

const vouchersFolder = path.join(new URL(import.meta.url).pathname, '../../uploads/vouchers');
const voucherUpload = configureUpload(vouchersFolder);

const REPORTS_FOLDER = path.join(new URL(import.meta.url).pathname, '../../uploads/reports');
const reportUpload = configureUpload(REPORTS_FOLDER);

// Routes pour les utilisateurs

/**
 * @swagger
 * /manager/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                     example: "alice.smith@gmail.com"
 *                   status:
 *                     type: string
 *                     description: The user's status.
 *                     example: "user"
 */

router.get('/users', checkJWT, manager, getUsers);

/**
 * @swagger
 * /manager/user:
 *   get:
 *     summary: Retrieve a specific user
 *     description: Retrieve a specific user from the database.
 *     responses:
 *       200:
 *         description: A user object.
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

router.get('/user', checkJWT, manager, getUser);

/**
 * @swagger
 * /manager/user:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user from the database.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "User deleted successfully"
 */

router.delete('/user', checkJWT, manager, deleteUser);

/**
 * @swagger
 * /manager/userWithoutPassword:
 *   patch:
 *     summary: Update a user without changing the password
 *     description: Update a user's information without changing the password.
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
 *         description: User updated successfully.
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

router.patch('/userWithoutPassword', checkJWT, manager, MPV.updateWithoutPassword, updateUser);

/**
 * @swagger
 * /manager/user:
 *   patch:
 *     summary: Update a user
 *     description: Update a user's information.
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
 *         description: User updated successfully.
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

router.patch('/user', MPV.user, checkJWT, manager, updateUser);

/**
 * @swagger
 * /manager/user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database.
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
 *       201:
 *         description: User created successfully.
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

router.post('/user', MPV.user, checkJWT, manager, createUser);

/**
 * @swagger
 * /manager/userslist:
 *   get:
 *     summary: Retrieve a list of user names
 *     description: Retrieve a list of user names from the database.
 *     responses:
 *       200:
 *         description: A list of user names.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                     example: "Alice Smith"
 */

router.get('/userslist', checkJWT, manager, getUsersName);

// Routes pour les vouchers

/**
 * @swagger
 * /manager/vouchers:
 *   get:
 *     summary: Retrieve a list of vouchers
 *     description: Retrieve a list of vouchers from the database.
 *     responses:
 *       200:
 *         description: A list of vouchers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The voucher ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the voucher.
 *                     example: "Discount Voucher"
 *                   discount:
 *                     type: number
 *                     description: The discount percentage.
 *                     example: 10
 */

router.get('/vouchers', checkJWT, admin, getVouchers);

/**
 * @swagger
 * /manager/voucher:
 *   get:
 *     summary: Retrieve a specific voucher
 *     description: Retrieve a specific voucher from the database.
 *     responses:
 *       200:
 *         description: A voucher object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The voucher ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the voucher.
 *                   example: "Discount Voucher"
 *                 discount:
 *                   type: number
 *                   description: The discount percentage.
 *                   example: 10
 */

router.get('/voucher', checkJWT, admin, getVoucher);

/**
 * @swagger
 * /manager/voucher:
 *   post:
 *     summary: Create a new voucher
 *     description: Create a new voucher in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the voucher.
 *                 example: "Discount Voucher"
 *               discount:
 *                 type: number
 *                 description: The discount percentage.
 *                 example: 10
 *     responses:
 *       201:
 *         description: Voucher created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The voucher ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the voucher.
 *                   example: "Discount Voucher"
 *                 discount:
 *                   type: number
 *                   description: The discount percentage.
 *                   example: 10
 */

router.post('/voucher', checkJWT, admin, voucherUpload.single('picture'), createVoucher);

/**
 * @swagger
 * /manager/voucher:
 *   delete:
 *     summary: Delete a voucher
 *     description: Delete a voucher from the database.
 *     responses:
 *       200:
 *         description: Voucher deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Voucher deleted successfully"
 */

router.delete('/voucher', checkJWT, admin, deleteVoucher);

/**
 * @swagger
 * /manager/voucher:
 *   patch:
 *     summary: Update a voucher
 *     description: Update a voucher's information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the voucher.
 *                 example: "Discount Voucher"
 *               discount:
 *                 type: number
 *                 description: The discount percentage.
 *                 example: 10
 *     responses:
 *       200:
 *         description: Voucher updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The voucher ID.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the voucher.
 *                   example: "Discount Voucher"
 *                 discount:
 *                   type: number
 *                   description: The discount percentage.
 *                   example: 10
 */

router.patch('/voucher', checkJWT, admin, voucherUpload.single('picture'), updateVoucher);

// Routes pour les vouchers réclamés

export default router;