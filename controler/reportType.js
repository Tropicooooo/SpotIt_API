import { pool } from "../database/database.js";
import * as reportTypeModel from "../model/reportType.js";

export const getAllReportType = async (req, res)=> {
   try {
       const type = await reportTypeModel.getAllReportType(pool, req.params);

       if (type) {
           return res.send(type);
       } else {
           return res.status(404).json({ message: '[REPORT_TYPE] Résultat de la recherche : 0 trouvé(s).' });
       }
   } catch (e) {
       return res.status(500).json({ message: 'Erreur du serveur.' });
   }
};
