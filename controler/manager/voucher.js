import {pool} from '../../database/database.js';
import * as voucherModel from '../../model/voucher.js';

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
        return res.sendStatus(201);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const updateVoucher = async (req, res) => {
    try {
        await voucherModel.updateVoucher(pool, req.body, req.body?.labelUpdate);  //OK
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
};

export const createVoucher = async (req, res) => {
    try {       

        const {label, description, pointsRequired} = req.body;

        const picture = req.file ? `/uploads/vouchers/${req.file.filename}` : null;

        await voucherModel.createVoucher(pool, {
            label,
            description,
            pointsRequired,
            picture
        });
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
}