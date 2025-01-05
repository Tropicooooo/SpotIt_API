import {pool} from "../database/database.js";
import * as reportTypeModel from "../model/reportType.js";

export const getReportType = async (req, res)=> {
   try {
       const type = await reportTypeModel.getAllReportType(pool, req.params);
       if (type) {
           res.send(type);
       } else {
           res.sendStatus(404);
       }
   } catch (err) {
       res.sendStatus(500);
   }
};

