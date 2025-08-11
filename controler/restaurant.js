import { pool } from '../database/database.js';
import * as restaurantModel from '../model/restaurant.js';

export const getAllRestaurants = async (req, res) => {
    try {     
        const restaurants = await restaurantModel.getAllRestaurants(pool, req.query);

        if (restaurants === null) {
            return res.status(404).json({ message: '[RESTAURANT] Résultat de la recherche : 0 trouvé(s).' });
        }     

        return res.send({ restaurants });
    } catch (e) {
        return res.status(500).json({ message: 'Erreur du serveur.' });
    }
};
