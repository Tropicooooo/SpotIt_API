import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import * as voucherModel from '../model/voucher.js';
import * as userVoucherModel from '../model/userVoucher.js';

// Gestion des utilisateurs
export const getUsers = async (req, res) => {
    try {     
        const users = await userModel.getUsers(pool, req.query);
        const total = await userModel.getTotalUsers(pool);
        if (users === null) {
            return res.sendStatus(404);
        }     
        return res.send({ users, total });
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userModel.getUser(pool, req.query);
        if (!user) {
            return res.sendStatus(404);
        } 
        return res.send(user);
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(pool, req.query);
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.val, req.body?.emailUpdate);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
};

export const createUser = async (req, res) => {
    try {        
        await userModel.createUser(pool, req.val, req.body?.emailUpdate);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}


// Gestion des vouchers
export const getVouchers = async (req, res) => {
    try {     
        const vouchers = await voucherModel.getVouchers(pool, req.query);  //OK
        const total = await voucherModel.getTotalVouchers(pool);
        if (vouchers === null) {
            return res.sendStatus(404);
        }     
        return res.send({ vouchers, total });
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getVoucher = async (req, res) => {
    try {
        const voucher = await voucherModel.getVoucher(pool, req.query);  //OK
        if (!voucher) {
            return res.sendStatus(404);
        } 
        return res.send(voucher);
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const deleteVoucher = async (req, res) => {
    try {
        await voucherModel.deleteVoucher(pool, req.query);  //OK
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const updateVoucher = async (req, res) => {
    try {
        console.log(req.body);
        await voucherModel.updateVoucher(pool, req.body, req.body?.labelUpdate);  //OK
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
};

export const createVoucher = async (req, res) => {
    try {        
        await voucherModel.createVoucher(pool, req.val, req.body?.labelUpdate);  //OK
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}

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