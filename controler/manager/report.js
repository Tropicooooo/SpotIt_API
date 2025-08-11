import { pool } from '../../database/database.js';
import * as reportModel from '../../model/report.js';

export const getAllReports = async (req, res) => {
    try {     
        const reports = await reportModel.getAllReports(pool, req.query);
        const total = await reportModel.getTotalReports(pool);

        if (reports === null) {
            return res.status(404).json({ message: '[REPORT] Résultat de la recherche : 0 trouvé(s).' });
        }

        return res.send({ reports, total });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const getAllReport = async (req, res) => {
    try {
        const report = await reportModel.getAllReport(pool, req.query);

        if (!report) {
            return res.status(404).json({ message: '[REPORT] Résultat de la recherche : 0 trouvé(s).' });
        } 

        return res.send(report);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const createReport = async (req, res) => {
    try {
        const {
            status,
            report_date,
            geocodedaddress,
            userEmail,
            solved_date,
            description,
            problemtypelabel,
            responsable
        } = req.body;

        const picture = req.file ? `/uploads/reports/${req.file.filename}` : null;

        await reportModel.createReport(pool, {
            status,
            report_date,
            geocodedaddress,
            userEmail,
            solved_date,
            description,
            problemtypelabel,
            picture,
            responsable
        });

        return res.status(201).json({ message: '[REPORT] Résultat de la création : Création réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const updateReport = async (req, res) => {
     try {
        await reportModel.updateReport(pool, req.body);
        
        return res.status(201).json({ message: '[REPORT] Résultat de la mise à jour : Mise à jour réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const deleteReport = async (req, res) => {
    try {
        await reportModel.deleteReport(pool, req.query);
        
        return res.status(201).json({ message: '[REPORT] Résultat de la suppression : Suppression réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};
