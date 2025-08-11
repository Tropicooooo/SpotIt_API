import { pool } from '../../database/database.js';
import * as reportTypeModel from '../../model/reportType.js';

export const getAllReportTypes = async (req, res) => {
    try {
        const problemType = await reportTypeModel.getAllReportTypes(pool, req.query);
        const total = await reportTypeModel.getTotalReportType(pool);

        if (!problemType) {
            return res.status(404).json({ message: '[REPORT_TYPE] Résultat de la recherche : 0 trouvé(s).' });
        }

        return res.send({ problemType, total });
    }
    catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const getAllReportType = async (req, res) => {
    try {
        const problemType = await reportTypeModel.getAllReportType(pool, req.query);
        
        if (!problemType) {
            return res.status(404).json({ message: '[REPORT_TYPE] Résultat de la recherche : 0 trouvé(s).' });
        }

        return res.send(problemType);
    }
    catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};

export const createReportType = async (req, res) => {
    try {
        await reportTypeModel.createReportType(pool, req.body?.currentReportType);
        
        return res.status(201).json({ message: '[REPORT_TYPE] Résultat de la création : Création réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const updateReportType = async (req, res) => {
    try {
        await reportTypeModel.updateReportType(pool, req.body?.currentReportType, req.body?.labelUpdate);
        
        return res.status(201).json({ message: '[REPORT_TYPE] Résultat de la mise à jour : Mise à jour réussie.' });
    } catch (err) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const deleteReportType = async (req, res) => {
    try {
        await reportTypeModel.deleteReportType(pool, req.query);
        
        return res.status(201).json({ message: '[REPORT_TYPE] Résultat de la suppression : Suppression réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}
