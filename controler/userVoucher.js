import { pool } from '../database/database.js';
import * as userVoucherModel from '../model/userVoucher.js';
import * as userModel from '../model/user.js'
import * as voucherModel from '../model/voucher.js'

export const getUserVouchers = async (req, res) => {
    try {
        const userVouchers = await userVoucherModel.getUserVouchersByEmail(pool, req.query);
        if (userVouchers === null) {
            return res.sendStatus(404);
        }
        return res.send({ userVouchers });
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const createUserVoucher = async (req, res) => {
    try {
        const { code, claimDate, expirationDate, userEmail, voucherLabel } = req.body;

        if (!code || !claimDate || !expirationDate || !userEmail || !voucherLabel) {
            return res.status(400).json({ message: 'Données manquantes dans la requête.' });
        }

        const user = await userModel.getUserByEmail(pool, userEmail);
        const voucher = await voucherModel.getVoucher(pool, voucherLabel);

        if (user.pointsNumber < voucher.pointsNumber) {
            return res.status(401).json({ error: "Nombre de points insuffisant." });
        }

        await userVoucherModel.createUserVoucher(pool, { code, claimDate, expirationDate, userEmail, voucherLabel });

        user.pointsNumber -= voucher.pointsNumber;

        await userModel.updateUserPoints(pool, user.email, user.pointsNumber);

        return res.status(201).json({ message: 'Voucher créé avec succès' });
    } catch (err) {
        console.error('Erreur lors de la création du voucher:', err);
        return res.sendStatus(500);
    }
};