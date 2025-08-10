import {pool} from '../../database/database.js';
import * as reportTypeModel from '../../model/reportType.js';

// Gestion des types de signalements
export const getAllReportType = async (req, res) => {
    try {
        const problemType = await reportTypeModel.getAllReportType(pool, req.query);
        if (!problemType) {
            return res.sendStatus(404);
        }
        return res.send(problemType);
    }
    catch (e) {
        return res.sendStatus(500);
    }
};

export const getReportTypes = async (req, res) => {
    try {
        const problemType = await reportTypeModel.getReportTypes(pool, req.query);
        const total = await reportTypeModel.getTotalReportType(pool);
        if (!problemType) {
            return res.sendStatus(404);
        }
        return res.send({problemType,total});
    }
    catch (e) {
        return res.sendStatus(500);
    }
}


export const updateReportType = async (req, res) => {
    try {
        await reportTypeModel.updateReportType(pool, req.body?.currentReportType, req.body?.labelUpdate);
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const createReportType = async (req, res) => {
    try {
        await reportTypeModel.createReportType(pool, req.body?.currentReportType);
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export const deleteReportType = async (req, res) => {
    try {
        await reportTypeModel.deleteReportType(pool, req.query);
        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(500);
    }
}


