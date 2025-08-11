import { pool } from "../database/database.js";
import * as reportModel from "../model/report.js";

export const getAllReportsByRegion = async (req, res) => {
  const {
    latMin,
    latMax,
    lngMin,
    lngMax,
    type,
    status,
    emergencyDegreeMin,
    emergencyDegreeMax
  } = req.query;

  if (!latMin || !latMax || !lngMin || !lngMax) {
    return res.status(400).json({ message: '[REPORT] Synthaxe incorrecte.' });
  }

  const latMinNum = parseFloat(latMin);
  const latMaxNum = parseFloat(latMax);
  const lngMinNum = parseFloat(lngMin);
  const lngMaxNum = parseFloat(lngMax);

  if (isNaN(latMinNum) || isNaN(latMaxNum) || isNaN(lngMinNum) || isNaN(lngMaxNum)) {
    return res.status(400).json({ message: '[REPORT] Synthaxe incorrecte.' });
  }

  try {
    const reports = await reportModel.getAllReportsByRegion(pool, {
      latMin: latMinNum,
      latMax: latMaxNum,
      lngMin: lngMinNum,
      lngMax: lngMaxNum,
      type: type || null,
      status: status || null,
      emergencyDegreeMin: emergencyDegreeMin || null,
      emergencyDegreeMax: emergencyDegreeMax || null
    });

    const formattedReports = reports.map((report) => {
      if (report.reportdate) {
        const date = new Date(report.reportdate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return { ...report, reportdate: `${day}-${month}-${year}` }; 
      }

      return report;
    });

    res.json(formattedReports);
  } catch (e) {
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

export const getOneReport = async (req, res) => {
  try {
    const report = await reportModel.getOneReport(pool, { id: req.params.id });

    if (report) {
      if (report.reportdate) {
        const date = new Date(report.reportdate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        report.reportdate = `${day}-${month}-${year}`;
      }

      res.json(report);
    } else {
      return res.status(404).json({ message: '[REPORT] Résultat de la recherche : 0 trouvé(s).' });
    }
  } catch (e) {
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

export const createReport = async (req, res) => {
  try {
    const {
      status,
      userEmail,
      description,
      reportdate,
      problemtypelabel,
      responsable,
      geocodedaddress
    } = req.body;

    const picture = req.file ? `/uploads/reports/${req.file.filename}` : null;

    await reportModel.createReport(pool, {
      status,
      userEmail,
      description,
      reportdate,
      problemtypelabel,
      picture,
      responsable,
      geocodedaddress
    });

    return res.status(400).json({ message: '[REPORT] Réponse de la création : Création réussie.' });
  } catch (e) {
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};
