import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {compare} from '../util/index.js';

export const getUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Récupérer l'utilisateur via le modèle
    const user = await userModel.getUserByEmail(pool, email);
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    console.log(user.password);
    console.log("password:",password);
   const isPasswordValid = compare(password, user.password);
    if (!isPasswordValid) {
        console.log("test2");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Ajouter les infos utilisateur à req pour le prochain middleware
    req.user = {
      email: user?.email,
      status: user?.role,
    };
    next(); // Passe au middleware suivant (génération du token)
  } catch (err) {
    console.error("Error in getUser:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        console.log(err);
        
        res.sendStatus(500);
    }
};

