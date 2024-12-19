import {pool} from '../database/database.js';
import * as cinemaModel from '../model/cinema.js';

export const getCinemas = async (req, res) => {
    try {     
        const cinemas = await cinemaModel.getCinemas(pool, req.query);
        if (cinemas === null) {
            return res.sendStatus(404);
        }     
        return res.send({ cinemas });
    } catch (e) {
        return res.sendStatus(500);
    }
};