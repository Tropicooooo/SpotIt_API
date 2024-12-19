import {pool} from '../database/database.js';
import * as restaurantModel from '../model/restaurant.js';

export const getRestaurants = async (req, res) => {
    try {     
        const restaurants = await restaurantModel.getRestaurants(pool, req.query);
        if (restaurants === null) {
            return res.sendStatus(404);
        }     
        return res.send({ restaurants });
    } catch (e) {
        return res.sendStatus(500);
    }
};