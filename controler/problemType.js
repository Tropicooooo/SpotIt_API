import {pool} from "../database/database.js";
import * as problemTypeModel from "../model/problemType.js";

export const getProblemType = async (req, res)=> {
   try {
       const user = await problemTypeModel.getProblemType(pool, req.params);
       if (user) {
           res.send(user);
       } else {
           res.sendStatus(404);
       }
   } catch (err) {
       res.sendStatus(500);
   }
};

