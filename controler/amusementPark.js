import { pool } from '../database/database.js';
import * as amusementParkModel from '../model/amusementPark.js';

export const getAllAmusementParks = async (req, res) => {
    try {    
        const amusementParks = await amusementParkModel.getAllAmusementParks(pool, req.query);

        if (amusementParks === null) {
            return res.status(404).json({ message: '[AMUSEMENT_PARK] Résultat de la recherche : 0 trouvé(s).' });
        }     

        return res.send({ amusementParks });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};
