import { pool } from '../database/database.js';
import * as userVoucherModel from '../model/userVoucher.js';

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
        // Validation des données de la requête
        const { label, description, points_number, picture } = req.body;

        if (!label || !description || !points_number || !picture) {
            return res.status(400).json({ message: 'Données manquantes dans la requête.' });
        }

        // Appel au modèle pour créer un nouveau voucher
        const newVoucher = await userVoucherModel.createUserVoucher(pool, req.body);
        
        // Retourner une réponse avec le voucher créé
        return res.status(201).json({
            message: 'Voucher créé avec succès',
            voucher: newVoucher,
        });
    } catch (err) {
        console.error('Erreur lors de la création du voucher:', err);
        return res.sendStatus(500);
    }
};