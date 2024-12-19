import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';

export const updateUser = async (req, res) => {
    try {
          
        await userModel.updateUser(pool, {email : req?.session?.email ,...req?.body});
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userModel.getUser(pool, req?.session);
        if (!user) {
            return res.sendStatus(404);
        } 
        return res.send(user);
    } catch (err) {
        res.sendStatus(500);
    }
};