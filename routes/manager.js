import Router from 'express-promise-router';
import { getUsers, getUser,updateUser, deleteUser, createUser } from '../controler/manager.js';
import { getVouchers, getVoucher, createVoucher, deleteVoucher, updateVoucher } from '../controler/manager.js';
import { getUserVouchers, getUserVoucher, createUserVoucher, deleteUserVoucher, updateUserVoucher } from '../controler/manager.js';
import { managerValidatorMiddleware as MPV } from '../middleware/validation.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager, employee, admin} from '../middleware/authorization/mustBe.js';
import { getEmployees, deleteEmployee, updateEmployee, getEmployee, getAllReports, getAllReport, updateReport, createReport,getJobs,getJob,updateJob, deleteReport, getReportTypes, getEmployeesName,updateReportType,createReportType, getAllReportType ,deleteReportType, getUsersName} from '../controler/manager.js';
import { configureUpload } from '../upload/upload.js';
import path from 'path';

const router = Router();

const vouchersFolder = path.join(new URL(import.meta.url).pathname, '../../uploads/vouchers');
const voucherUpload = configureUpload(vouchersFolder);

const REPORTS_FOLDER = path.join(new URL(import.meta.url).pathname, '../../uploads/reports');
const reportUpload = configureUpload(REPORTS_FOLDER);
//Admin TOUT    USER RIEN       MANAGER EMPLOYEE TOUT SIGNALEMENTS RECOMPENSES    EMPLOYEE SIGNALEMENTS
// Routes pour les utilisateurs
router.get('/users', checkJWT , manager,  getUsers);
router.get('/user', checkJWT , manager,  getUser)
router.delete('/user', checkJWT , manager,  deleteUser);
router.patch('/userWithoutPassword', checkJWT , manager, MPV.updateWithoutPassword, updateUser);
router.patch('/user', MPV.user,  checkJWT , manager, updateUser);
router.post('/user', MPV.user,  checkJWT , manager, createUser);
router.get('/userslist', getUsersName);
// Routes pour les vouchers
router.get('/vouchers', getVouchers);
router.get('/voucher', getVoucher);
//router.post('/voucher', voucherUpload.single('picture'), MPV.voucher, createVoucher);
router.post('/voucher', voucherUpload.single('picture'), createVoucher);
router.delete('/voucher', deleteVoucher);
router.patch('/voucher', voucherUpload.single('picture'), updateVoucher);
//router.patch('/voucher', voucherUpload.single('picture'), MPV.voucher, updateVoucher);

// Routes pour les vouchers réclamés
router.get('/user-vouchers', getUserVouchers);
router.get('/user-voucher', getUserVoucher);
router.post('/user-voucher', MPV.userVoucher, createUserVoucher);
router.delete('/user-voucher', deleteUserVoucher);
router.patch('/user-voucher', MPV.userVoucher, updateUserVoucher);

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