import {pool} from '../../database/database.js';
import * as userVoucherModel from '../../model/userVoucher.js';

// Gestion des vouchers réclamés
export const getUserVouchers = async (req, res) => {
    try {     
        const userVouchers = await userVoucherModel.getUserVouchers(pool, req.query);  //OK
        const total = await userVoucherModel.getTotalUserVouchers(pool);
        if (userVouchers === null) {
            return res.sendStatus(404);
        }     
        return res.send({ userVouchers, total });
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getUserVoucher = async (req, res) => {
    try {
        const userVoucher = await userVoucherModel.getUserVoucher(pool, req.query);  //OK
        if (!userVoucher) {
            return res.sendStatus(404);
        } 
        return res.send(userVoucher);
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const deleteUserVoucher = async (req, res) => {
    try {
        await userVoucherModel.deleteUserVoucher(pool, req.query);  //OK
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const updateUserVoucher = async (req, res) => {
    try {
        await userVoucherModel.updateUserVoucher(pool, req.val, req.body?.codeUpdate);  //OK
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
};

export const createUserVoucher = async (req, res) => {
    try {        
        await userVoucherModel.createUserVoucher(pool, req.val, req.body?.codeUpdate);  //OK
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}