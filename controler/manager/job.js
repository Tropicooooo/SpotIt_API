import {pool} from '../../database/database.js';
import * as jobModel from '../../model/job.js';

// Gestion des emplois
export const getJobs = async (req, res) => {
    try {
        const jobs = await jobModel.getJobs(pool, req.query);
        const total = await jobModel.getTotalJobs(pool, req.query);
        if (jobs === null) {
            return res.sendStatus(404);
        }     
        return res.send({jobs,total});
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const getJob = async (req, res) => {
    try {
        const job = await jobModel.getJob(pool, req.query);
        if (!job) {
            return res.sendStatus(404);
        } 
        return res.send(job);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const updateJob = async (req, res) => {
    try {
        await jobModel.updateJob(pool, req.body);
        return res.sendStatus(204);
    } catch (err) {
        console.error("Erreur dans le contrôleur updateJob :", err);
        return res.sendStatus(500);
    }
};

