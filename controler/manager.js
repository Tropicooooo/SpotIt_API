// manager.js (controller)
import { pool } from "../database/database.js";
import * as userModel from "../model/user.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers(pool, req.query);
    const total = await userModel.getTotalUsers(pool);
    if (users === null) {
      res.sendStatus(404);
    }
    res.send({
      users,
      total,
    });
  } catch (e) {
    res.sendStatus(500);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.getUser(pool, req.query);
    if (user === null) {
      res.sendStatus(404);
    }
    res.send(user);
  } catch (e) {
    res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(pool, req.query);
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
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
    console.log(req, res);
    await userModel.createUser(pool, req.val);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const user = await userModel.getUserByEmail(pool, req.query);
    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.sendStatus(500);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(pool, { email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
