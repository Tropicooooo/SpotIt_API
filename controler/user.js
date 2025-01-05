import { log } from 'console';
import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';

export const getUser = async (req, res, next) => {
  const { email} = req.session;
  try {
    const user = await userModel.getUserByEmail(pool, email);
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }
    return res.send(user);
  } catch (err) {
    console.error("Error in getUser:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        
        res.sendStatus(500);
    }
};


