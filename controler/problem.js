import { pool } from "../database/database.js"; // Importer la connexion à la base de données
import * as problemModel from "../model/problem.js"; // Importer les modèles

// Récupérer un problème par ID
export const getProblem = async (req, res) => {
  try {
    const problem = await problemModel.getProblem(pool, { id: req.params.id }); // Utilise req.params.id pour récupérer l'ID
    if (problem) {
      res.json(problem);
    } else {
      res.sendStatus(404); // Problème non trouvé
    }
  } catch (err) {
    console.error("Erreur lors de la récupération du problème :", err);
    res.sendStatus(500); // Erreur serveur
  }
};

// Ajouter un problème
export const addProblem = async (req, res) => {
  try {
    console.log("Données reçues :", req.body); // Debug

    const { description, latitude, longitude, picture, problemTypeLabel } = req.body;

    if (!description || !latitude || !longitude || !problemTypeLabel) {
      console.error("Champs manquants :", { description, latitude, longitude, problemTypeLabel });
      return res.status(400).json({ error: "Champs obligatoires manquants" });
    }

    // Ajouter le problème dans la base de données
    await problemModel.addProblem(pool, { description, latitude, longitude, picture, problemTypeLabel });

    res.sendStatus(201); // Problème créé avec succès
  } catch (err) {
    console.error("Erreur dans addProblem :", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Récupérer les problèmes dans une région donnée
export const getProblemsInRegion = async (req, res) => {
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
    // Appel au modèle pour récupérer les problèmes, en tenant compte du statut (si fourni)
    const problems = await problemModel.getProblemsInRegion(pool, {
      latMin: latMinNum,
      latMax: latMaxNum,
      lngMin: lngMinNum,
      lngMax: lngMaxNum,
      type: type || null, // Passer null si aucun type n'est fourni
      status: status || null, // Passer null si aucun statut n'est fourni
      emergencyDegreeMin: emergencyDegreeMin || null, // Passer null si aucune importance minimale n'est fournie
      emergencyDegreeMax: emergencyDegreeMax || null // Passer null si aucune importance maximale n'est fournie
    });

    res.json(problems); // Envoi des problèmes récupérés
  } catch (error) {
    console.error("Erreur lors de la récupération des problèmes :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};