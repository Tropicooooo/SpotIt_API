import { pool } from '../../database/database.js';
import * as userVoucherModel from '../../model/userVoucher.js';

export const getAllUserVouchers = async (req, res) => {
    try {     
        const userVouchers = await userVoucherModel.getAllUserVouchers(pool, req.query);
        const total = await userVoucherModel.getTotalUserVouchers(pool);

        if (userVouchers === null) {
            return res.status(404).json({ message: '[USER_VOUCHER] Résultat de la recherche : 0 trouvé(s).' });
        }     

        return res.send({ userVouchers, total });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const getOneUserVoucher = async (req, res) => {
    try {
        const userVoucher = await userVoucherModel.getOneUserVoucher(pool, req.query);

        if (!userVoucher) {
            return res.status(404).json({ message: '[USER_VOUCHER] Résultat de la recherche : 0 trouvé(s).' });
        } 

        return res.send(userVoucher);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const createUserVoucher = async (req, res) => {
    try {        
        await userVoucherModel.createUserVoucher(pool, req.val, req.body?.codeUpdate);

        return res.status(201).json({ message: '[USER_VOUCHER] Résultat de la création : Création réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const updateUserVoucher = async (req, res) => {
    try {
        await userVoucherModel.updateUserVoucher(pool, req.val, req.body?.codeUpdate);

        return res.status(201).json({ message: '[USER_VOUCHER] Résultat de la mise à jour : Mise à jour réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const deleteUserVoucher = async (req, res) => {
    try {
        await userVoucherModel.deleteUserVoucher(pool, req.query);

        return res.status(201).json({ message: '[USER_VOUCHER] Résultat de la suppression : Suppression réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}
