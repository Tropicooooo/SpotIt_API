import { pool } from '../../database/database.js';
import * as jobModel from '../../model/job.js';

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.getAllJobs(pool, req.query);
        const total = await jobModel.getTotalJobs(pool, req.query);

        if (jobs === null) {
            return res.status(404).json({ message: '[JOB] Résultat de la recherche : 0 trouvé(s).' });
        }     

        return res.send({ jobs, total });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const getOneJob = async (req, res) => {
    try {
        const job = await jobModel.getOneJob(pool, req.query);

        if (!job) {
            return res.status(404).json({ message: '[JOB] Résultat de la recherche : 0 trouvé(s).' });
        } 

        return res.send(job);
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
}

export const updateJob = async (req, res) => {
    try {
        await jobModel.updateJob(pool, req.body);

        return res.status(201).json({ message: '[JOB] Résultat de la mise à jour : Mise à jour réussie.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};
