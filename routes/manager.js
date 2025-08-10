import Router from 'express-promise-router';
import { getUsers, getUser,updateUser, deleteUser, createUser, getUsersName } from '../controler/manager/user.js';
import { getVouchers, getVoucher, createVoucher, deleteVoucher, updateVoucher } from '../controler/manager/voucher.js';
import { getUserVouchers, getUserVoucher, createUserVoucher, deleteUserVoucher, updateUserVoucher } from '../controler/manager/userVoucher.js';
import { managerValidatorMiddleware as MPV } from '../middleware/validation.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager, employee, admin} from '../middleware/authorization/mustBe.js';
import { getEmployees, deleteEmployee, updateEmployee, getEmployee, getEmployeesName } from '../controler/manager/employee.js';
import { getAllReports, getAllReport, updateReport, createReport, deleteReport } from '../controler/manager/report.js';
import { getJobs, getJob, updateJob } from '../controler/manager/job.js';
import { getReportTypes, getAllReportType, updateReportType, createReportType, deleteReportType } from '../controler/manager/reportType.js';
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
router.get('/users', checkJWT , manager,  getUsers);

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
router.get('/user', checkJWT , manager,  getUser)

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
router.delete('/user', checkJWT , manager,  deleteUser);

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


router.patch('/user', MPV.user,  checkJWT , manager, updateUser);
router.post('/user', MPV.user,  checkJWT , manager, createUser);
router.get('/userslist',checkJWT , manager, getUsersName);
// Routes pour les vouchers
router.get('/vouchers',checkJWT , admin, getVouchers);
router.get('/voucher',checkJWT , admin, getVoucher);
//router.post('/voucher', voucherUpload.single('picture'), MPV.voucher, createVoucher);
router.post('/voucher',checkJWT , admin, voucherUpload.single('picture'), createVoucher);
router.delete('/voucher',checkJWT , admin, deleteVoucher);
router.patch('/voucher',checkJWT , admin, voucherUpload.single('picture'), updateVoucher);
//router.patch('/voucher', voucherUpload.single('picture'), MPV.voucher, updateVoucher);

// Routes pour les vouchers réclamés
router.get('/user-vouchers', checkJWT , admin, getUserVouchers);
router.get('/user-voucher', checkJWT , admin, getUserVoucher);
router.post('/user-voucher', checkJWT , admin, MPV.userVoucher, createUserVoucher);
router.delete('/user-voucher', checkJWT , admin, deleteUserVoucher);
router.patch('/user-voucher', checkJWT , admin, MPV.userVoucher, updateUserVoucher);

router.get('/employees', checkJWT , manager, getEmployees);
router.get('/employee', checkJWT , manager,  getEmployee);
router.delete('/employee', checkJWT , manager, deleteEmployee);
router.patch('/employee', checkJWT , manager,  MPV.employee, updateEmployee);
router.get('/employeeslist', checkJWT , manager, getEmployeesName);

router.get('/all-reports',checkJWT , manager, getAllReports);
router.delete('/all-reports',checkJWT , manager, deleteReport);
router.get('/all-report',checkJWT , manager, getAllReport);
//router.patch('/all-report',reportUpload.single('picture'), MPV.report, updateReport);
router.patch('/all-report',checkJWT , manager,reportUpload.single('picture'), updateReport);
//router.post('/all-report',reportUpload.single('picture'), MPV.report, createReport);
router.post('/all-report',checkJWT , manager,reportUpload.single('picture'), createReport);

router.get('/jobs',checkJWT , employee, getJobs);
router.get('/job',checkJWT , employee, getJob);
router.patch('/job',checkJWT , employee, reportUpload.single('picture'), updateJob);

router.get('/reporttype',checkJWT , employee, getAllReportType);

router.get('/all-report-types', checkJWT , admin, getReportTypes);
router.patch('/all-report-type', checkJWT , admin, MPV.reportType,updateReportType);
router.post('/all-report-type', checkJWT , admin,MPV.reportType, createReportType);
router.delete('/all-report-type',checkJWT , admin, deleteReportType);

export default router;