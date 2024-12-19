import { pool } from "../database/database.js";
import * as userModel from "../model/user.js";

export const getUser = async (req, res) => {
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
