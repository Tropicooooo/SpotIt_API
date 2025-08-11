import { pool } from '../database/database.js';
import * as userVoucherModel from '../model/userVoucher.js';

export const getAllUserVouchers = async (req, res) => {
    try {
        const userVouchers = await userVoucherModel.getUserVouchersByEmail(pool, req.query);

        if (userVouchers === null) {
            return res.status(404).json({ message: '[USER_VOUCHER] Résultat de la recherche : 0 trouvé(s).' });
        }

        return res.send({ userVouchers });
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const createUserVoucher = async (req, res) => {
    try {
        const {
            label,
            description,
            points_number,
            picture
        } = req.body;

        if (!label || !description || !points_number || !picture) {
            return res.status(400).json({ message: '[USER_VOUCHER] Non-autorisé.' });
        }

        const newVoucher = await userVoucherModel.createUserVoucher(pool, req.body);
        
        return res.status(201).json({ message: '[USER_VOUCHER] Résultat de la création : Création réussie.' });
    } catch (err) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};
