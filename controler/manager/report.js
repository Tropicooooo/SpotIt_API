import {pool} from '../../database/database.js';
import * as reportModel from '../../model/report.js';

// Gestion des signalements
export const getAllReports = async (req, res) => {
    try {     
        const reports = await reportModel.getAllReports(pool, req.query);
        const total = await reportModel.getTotalReports(pool);
        if (reports === null) {
            return res.sendStatus(404);
        }     
        return res.send({reports,total});
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getAllReport = async (req, res) => {
    try {
        const report = await reportModel.getAllReport(pool, req.query);
        if (!report) {
            return res.sendStatus(404);
        } 
        return res.send(report);
    } catch (e) {
        return res.sendStatus(500);
    }
}
export const updateReport = async (req, res) => {
     try {
        await reportModel.updateReport(pool, req.body);
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const createReport = async (req, res) => {
    try {
        const {status, report_date, userEmail, solved_date, description, problemtypelabel, responsable,geocodedaddress} = req.body;

        const picture = req.file ? `/uploads/reports/${req.file.filename}` : null;

        await reportModel.addReport(pool, {
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
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const deleteReport = async (req, res) => {

    try {
        await reportModel.deleteReport(pool, req.query);
        
        return res.sendStatus(201);
    } catch (e) {
        return res.sendStatus(500);
    }

};