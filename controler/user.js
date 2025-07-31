import { log } from 'console';
import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import { sign } from '../util/jwt.js';

export const getUser = async (req, res, next) => {
  const { email} = req.session;
  try {
    const user = await userModel.getUserByEmail(pool, email);
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }
    return res.send(user);
  } catch (err) {
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

export const createUser = async (req, res) => {
    try {
        await userModel.createUser(pool, req.val);
        const token = sign(
          { email: req.val.email, status: "User" },
          { expiresIn: '30d' }
        );

        res.status(201).json({
            message: "User created successfully",
            user: req.val,
            token
        });
    } catch (err) {
-        res.status(500).json({ error: err.message || "Internal server error" });
    }
}


