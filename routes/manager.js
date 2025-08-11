import { getAllUsers, getAllUsersByName, getOneUser, createUser, updateUser, deleteUser } from '../controler/manager/user.js';
import { getAllVouchers, getOneVoucher, createVoucher, updateVoucher, deleteVoucher } from '../controler/manager/voucher.js';
import { getAllUserVouchers, getOneUserVoucher, createUserVoucher, updateUserVoucher, deleteUserVoucher } from '../controler/manager/userVoucher.js';
import { getAllEmployees, getAllEmployeesByName, getOneEmployee, updateEmployee, deleteEmployee } from '../controler/manager/employee.js';
import { getAllReports, getAllReport, createReport, updateReport, deleteReport } from '../controler/manager/report.js';
import { getAllJobs, getOneJob, updateJob } from '../controler/manager/job.js';
import { getAllReportTypes, getAllReportType, createReportType, updateReportType, deleteReportType } from '../controler/manager/reportType.js';

import Router from 'express-promise-router';
import { managerValidatorMiddleware as MPV } from '../middleware/validation.js';
import { checkJWT } from '../middleware/identification/jwt.js';
import { manager, employee, admin } from '../middleware/authorization/mustBe.js';
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

router.get('/users', checkJWT , manager, getAllUsers);

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

router.get('/user', checkJWT , manager, getOneUser)

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

router.delete('/user', checkJWT , manager, deleteUser);

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

router.patch('/userWithoutPassword', checkJWT , manager, MPV.updateWithoutPassword, updateUser);

router.get('/userslist',checkJWT , manager, getAllUsersByName);
router.post('/user', MPV.user,  checkJWT , manager, createUser);
router.patch('/user', MPV.user,  checkJWT , manager, updateUser);

router.get('/vouchers',checkJWT , admin, getAllVouchers);
router.get('/voucher',checkJWT , admin, getOneVoucher);
router.post('/voucher',checkJWT , admin, voucherUpload.single('picture'), createVoucher);
router.patch('/voucher',checkJWT , admin, voucherUpload.single('picture'), updateVoucher);
router.delete('/voucher',checkJWT , admin, deleteVoucher);

router.get('/user-vouchers', checkJWT , admin, getAllUserVouchers);
router.get('/user-voucher', checkJWT , admin, getOneUserVoucher);
router.post('/user-voucher', checkJWT , admin, MPV.userVoucher, createUserVoucher);
router.patch('/user-voucher', checkJWT , admin, MPV.userVoucher, updateUserVoucher);
router.delete('/user-voucher', checkJWT , admin, deleteUserVoucher);

router.get('/employees', checkJWT , manager, getAllEmployees);
router.get('/employeeslist', checkJWT , manager, getAllEmployeesByName);
router.get('/employee', checkJWT , manager,  getOneEmployee);
router.patch('/employee', checkJWT , manager,  MPV.employee, updateEmployee);
router.delete('/employee', checkJWT , manager, deleteEmployee);

router.get('/all-reports',checkJWT , manager, getAllReports);
router.get('/all-report',checkJWT , manager, getAllReport);
router.post('/all-report',checkJWT , manager,reportUpload.single('picture'), createReport);
router.patch('/all-report',checkJWT , manager,reportUpload.single('picture'), updateReport);
router.delete('/all-reports',checkJWT , manager, deleteReport);

router.get('/jobs',checkJWT , employee, getAllJobs);
router.get('/job',checkJWT , employee, getOneJob);
router.patch('/job',checkJWT , employee, reportUpload.single('picture'), updateJob);

router.get('/reporttype',checkJWT , employee, getAllReportType);

router.get('/all-report-types', checkJWT , admin, getAllReportTypes);
router.post('/all-report-type', checkJWT , admin,MPV.reportType, createReportType);
router.patch('/all-report-type', checkJWT , admin, MPV.reportType,updateReportType);
router.delete('/all-report-type',checkJWT , admin, deleteReportType);

export default router;
