import {pool} from '../database/database.js';
import * as amusementParkModel from '../model/amusementPark.js';

export const getAmusementParks = async (req, res) => {
    try {    
        const amusementParks = await amusementParkModel.getAmusementParks(pool, req.query);
        if (amusementParks === null) {
            return res.sendStatus(404);
        }     
        return res.send({ amusementParks });
    } catch (e) {
        return res.sendStatus(500);
    }
};