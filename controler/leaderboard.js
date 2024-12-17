import { pool } from "../database/database.js"; // Importer la connexion à la base de données
import * as leaderboardModel from "../model/leaderboard.js"; // Importer les modèles

// Récupérer un problème par ID
export const getLeaderboard = async (req, res) => {
  try {
    const problem = await leaderboardModel.getLeaderboard(pool, { id: req.params.id }); // Utilise req.params.id pour récupérer l'ID
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
