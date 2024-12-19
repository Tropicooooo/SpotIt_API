import Router from 'express-promise-router';
import { getUsers, getUser,updateUser, deleteUser, createUser } from '../controler/manager.js';
import { getVouchers, getVoucher, createVoucher, deleteVoucher, updateVoucher } from '../controler/manager.js';
import { getUserVouchers, getUserVoucher, createUserVoucher, deleteUserVoucher, updateUserVoucher } from '../controler/manager.js';
import { managerValidatorMiddleware as MPV } from '../middleware/validation.js';

import path from 'path';
import { configureUpload } from '../upload/upload.js';

const router = Router();

const vouchersFolder = path.join(new URL(import.meta.url).pathname, '../../uploads/vouchers');
const voucherUpload = configureUpload(vouchersFolder);

// Routes pour les utilisateurs
router.get('/users', getUsers);
router.get('/user', getUser)
router.delete('/user', deleteUser);
router.patch('/user', MPV.user, updateUser);
router.post('/user', MPV.user, createUser);

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

export default router;