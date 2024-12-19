import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers(pool, req.query);
        const total = await userModel.getTotalUsers(pool);
        if (users === null) {
            return res.sendStatus(404);
        }     
        return res.send({users,total});
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await userModel.getUser(pool, req.query);
        if (!user) {
            return res.sendStatus(404);
        } 
        return res.send(user);
    } catch (e) {
        return res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(pool, req.query);
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
}

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.val);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
};

export const createUser = async (req, res) => {
    try {        
        await userModel.createUser(pool, req.val);
        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(500);
    }
}
