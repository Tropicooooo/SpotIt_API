import { pool } from "../database/database.js"; // Importer la connexion à la base de données
import * as reportModel from "../model/report.js"; // Importer les modèles

// Récupérer un problème par ID
export const getReport = async (req, res) => {
  try {
    const report = await reportModel.getReport(pool, { id: req.params.id }); // Utilise req.params.id pour récupérer l'ID

    if (report) {
      console.log(report);
      // Vérifie et formate la date
      if (report.reportdate) {
        const date = new Date(report.reportdate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        // Ajoute la date formatée dans la réponse
        report.reportdate = `${day}-${month}-${year}`;
      }

      res.json(report);
    } else {
      res.sendStatus(404); // Problème non trouvé
    }
  } catch (err) {
    console.error("Erreur lors de la récupération du problème :", err);
    res.sendStatus(500); // Erreur serveur
  }
};


// Ajouter un problème
export const addReport = async (req, res) => {
  try {
    const { description, latitude, longitude, status, problemTypeLabel, user} = req.body;

    if (!description || !latitude || !longitude || !problemTypeLabel || !status) {
      console.error("Champs manquants :", { description, latitude, longitude, problemTypeLabel, status });
      return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    const picture = req.file ? `/uploads/reports/${req.file.filename}` : null;

    // Passe directement `pool` au modèle
    await reportModel.addReport(pool, {
      description,
      latitude,
      longitude,
      problemTypeLabel,
      status,
      picture,
      user
    });

    res.status(201).json({ message: "Report ajouté avec succès", picture });
  } catch (err) {
    console.error('Erreur serveur dans addReport :', err);
    res.status(500).json({ error: 'Une erreur interne est survenue.' });
  }
};

// Récupérer les problèmes dans une région donnée
export const getReportsInRegion = async (req, res) => {
  const { latMin, latMax, lngMin, lngMax, type, status, emergencyDegreeMin, emergencyDegreeMax } = req.query;

  // Vérification des paramètres obligatoires
  if (!latMin || !latMax || !lngMin || !lngMax) {
    return res.status(400).json({ error: "Tous les paramètres de région sont requis." });
  }

  // Conversion des coordonnées en nombres
  const latMinNum = parseFloat(latMin);
  const latMaxNum = parseFloat(latMax);
  const lngMinNum = parseFloat(lngMin);
  const lngMaxNum = parseFloat(lngMax);

  if (isNaN(latMinNum) || isNaN(latMaxNum) || isNaN(lngMinNum) || isNaN(lngMaxNum)) {
    return res.status(400).json({ error: "Les coordonnées doivent être des nombres valides." });
  }

  try {
    // Appel au modèle pour récupérer les problèmes
    const reports = await reportModel.getReportsInRegion(pool, {
      latMin: latMinNum,
      latMax: latMaxNum,
      lngMin: lngMinNum,
      lngMax: lngMaxNum,
      type: type || null, // Passer null si aucun type n'est fourni
      status: status || null, // Passer null si aucun statut n'est fourni
      emergencyDegreeMin: emergencyDegreeMin || null, // Passer null si aucune importance minimale n'est fournie
      emergencyDegreeMax: emergencyDegreeMax || null // Passer null si aucune importance maximale n'est fournie
    });

    // Formate les dates dans chaque rapport
    const formattedReports = reports.map((report) => {
      if (report.reportdate) {
        const date = new Date(report.reportdate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return { ...report, reportdate: `${day}-${month}-${year}` }; // Remplace la date par la version formatée
      }
      return report; // Retourne le rapport sans modification s'il n'y a pas de date
    });

    res.json(formattedReports); // Envoi des rapports avec les dates formatées
  } catch (error) {
    console.error("Erreur lors de la récupération des problèmes :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};
