import Router from 'express-promise-router';
import {getUsers, getUser,updateUser, deleteUser, createUser, getEmployees, deleteEmployee,updateEmployee, getEmployee, getAllReports, getAllReport, updateReport, createReport,getJobs,getJob,updateJob, deleteReport, getReportType, getEmployeesName,updateReportType,createReportType, getAllReportType ,deleteReportType} from '../controler/manager.js';
import { managerValidatorMiddleware as MPV } from '../middleware/validation.js';
import { configureUpload } from '../upload/upload.js';
import path from 'path';


const REPORTS_FOLDER = path.join(new URL(import.meta.url).pathname, '../../uploads/reports');
const reportUpload = configureUpload(REPORTS_FOLDER);

const router = Router();

router.get('/users', getUsers);
router.get('/user', getUser)
router.delete('/user', deleteUser);
router.patch('/user', MPV.user, updateUser);
router.post('/user', MPV.user, createUser);

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