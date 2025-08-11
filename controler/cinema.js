import { pool } from '../database/database.js';
import * as cinemaModel from '../model/cinema.js';

export const getAllCinemas = async (req, res) => {
    try {     
        const cinemas = await cinemaModel.getAllCinemas(pool, req.query);

        if (cinemas === null) {
            return res.status(404).json({ message: '[CINEMA] Résultat de la recherche : 0 trouvé(s).' });
        }  

        return res.send({ cinemas });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};
