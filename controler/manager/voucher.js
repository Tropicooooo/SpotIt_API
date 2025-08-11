import { pool } from '../../database/database.js';
import * as voucherModel from '../../model/voucher.js';

export const getAllVouchers = async (req, res) => {
    try {     
        const vouchers = await voucherModel.getAllVouchers(pool, req.query);
        const total = await voucherModel.getTotalVouchers(pool);

        if (vouchers === null) {
            return res.status(404).json({ message: '[VOUCHER] Résultat de la recherche : 0 trouvé(s).' });
        }     

        return res.send({ vouchers, total });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const getOneVoucher = async (req, res) => {
    try {
        const voucher = await voucherModel.getOneVoucher(pool, req.query);

        if (!voucher) {
            return res.status(404).json({ message: '[VOUCHER] Résultat de la recherche : 0 trouvé(s).' });
        } 

        return res.send(voucher);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const createVoucher = async (req, res) => {
    try {       
        const {
            label,
            description,
            pointsRequired
        } = req.body;

        const picture = req.file ? `/uploads/vouchers/${req.file.filename}` : null;

        await voucherModel.createVoucher(pool, {
            label,
            description,
            pointsRequired,
            picture
        });

        return res.status(201).json({ message: '[VOUCHER] Résultat de la création : Création réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const updateVoucher = async (req, res) => {
    try {
        await voucherModel.updateVoucher(pool, req.body, req.body?.labelUpdate);

        return res.status(201).json({ message: '[VOUCHER] Résultat de la mise à jour : Mise à jour réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const deleteVoucher = async (req, res) => {
    try {
        await voucherModel.deleteVoucher(pool, req.query);

        return res.status(201).json({ message: '[VOUCHER] Résultat de la suppression : Suppression réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}
