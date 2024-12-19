import Router from 'express-promise-router';
import { getUsers, getUser,updateUser, deleteUser, createUser } from '../controler/manager.js';
import { getVouchers, getVoucher, createVoucher, deleteVoucher, updateVoucher } from '../controler/manager.js';
import { getUserVouchers, getUserVoucher, createUserVoucher, deleteUserVoucher, updateUserVoucher } from '../controler/manager.js';
import { managerValidatorMiddleware as MPV } from '../middleware/validation.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager} from '../middleware/authorization/mustBe.js';
import { getEmployees, deleteEmployee, updateEmployee, getEmployee, getAllReports, getAllReport, updateReport, createReport,getJobs,getJob,updateJob, deleteReport, getReportType, getEmployeesName,updateReportType,createReportType, getAllReportType ,deleteReportType} from '../controler/manager.js';
import { configureUpload } from '../upload/upload.js';
import path from 'path';

const router = Router();

const vouchersFolder = path.join(new URL(import.meta.url).pathname, '../../uploads/vouchers');
const voucherUpload = configureUpload(vouchersFolder);

const REPORTS_FOLDER = path.join(new URL(import.meta.url).pathname, '../../uploads/reports');
const reportUpload = configureUpload(REPORTS_FOLDER);

// Routes pour les utilisateurs
router.get('/users', checkJWT , manager,  getUsers);
router.get('/user', checkJWT , manager,  getUser)
router.delete('/user', checkJWT , manager,  deleteUser);
router.patch('/userWithoutPassword', checkJWT , manager, MPV.updateWithoutPassword, updateUser);
router.patch('/user', MPV.user,  checkJWT , manager, updateUser);
router.post('/user', MPV.user,  checkJWT , manager, createUser);

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

router.get('/employees', getEmployees);
router.get('/employee', getEmployee);
router.delete('/employee', deleteEmployee);
router.patch('/employee', MPV.employee, updateEmployee);
router.get('/employeeslist', getEmployeesName);

router.get('/all-reports', getAllReports);
router.delete('/all-reports', deleteReport);
router.get('/all-report', getAllReport);
//router.patch('/all-report',reportUpload.single('picture'), MPV.report, updateReport);
router.patch('/all-report',reportUpload.single('picture'), updateReport);
//router.post('/all-report',reportUpload.single('picture'), MPV.report, createReport);
router.post('/all-report',reportUpload.single('picture'), createReport);

router.get('/jobs', getJobs);
router.get('/job', getJob);
router.patch('/job', reportUpload.single('picture'), updateJob);

router.get('/reporttype', getAllReportType);

router.get('/all-report-type', getReportType);
router.patch('/all-report-type', MPV.reportType,updateReportType);
router.post('/all-report-type',MPV.reportType, createReportType);
router.delete('/all-report-type',deleteReportType);

export default router;