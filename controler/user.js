import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';

export const getUser = async (req, res)=> {
   try {
       const user = await userModel.getUser(pool, req.params);
       if (user) {
           res.send(user);
       } else {
           res.sendStatus(404);
       }
   } catch (err) {
       res.sendStatus(500);
   }
};

export const getUserInfo = async (req, res) => {
    try {
        const info = await userModel.getUserInfo(pool);
        console.log(info);
        
        res.send(info);
    } catch (e) {
        res.sendStatus(500);
    }
};

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        
        res.sendStatus(500);
    }
};