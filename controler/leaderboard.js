import { pool } from "../database/database.js";
import * as leaderboardModel from "../model/leaderboard.js";

export const getLeaderboard = async (req, res) => {
  try {
    const problem = await leaderboardModel.getLeaderboard(pool, { id: req.params.id });
    
    if (problem) {
      res.json(problem);
    } else {
      return res.status(404).json({ message: '[LEADERBOARD] Résultat de la recherche : 0 trouvé(s).' });
    }
  } catch (e) {
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};
