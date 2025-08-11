import { pool } from '../database/database.js';
import * as userModel from '../model/user.js';
import { sign } from '../util/jwt.js';
import { compare } from '../util/index.js'; 

export const getUserByEmail = async (req, res) => {
  const email = req.session;

  try {
    const user = await userModel.getUserByEmail(pool, email);

    if (!user) {
      return res.status(404).json({ message: '[USER] Résultat de la recherche : 0 trouvé(s).' });
    }

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

export const createUser = async (req, res) => {
  try {
    if (typeof req.val.pointsNumber === "undefined") {
      req.val.pointsNumber = 0;
    }

    await userModel.createUser(pool, req.val);
   
    const token = sign({ email: req.val.email, status: "User" }, { expiresIn: '30d' });

    return res.status(201).json({ message: '[USER] Résultat de la création : Création réussie.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

export const updateUser = async (req, res) => {
  try {
    await userModel.updateUser(pool, req.val);

    return res.status(201).json({ message: '[USER] Résultat de la mise à jour : Mise à jour réussie.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

export const loginUser = async (req, res) => {
  const { 
    email,
    password
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '[USER] Synthaxe incorrecte.' });
  }

  try {
    const user = await userModel.getUserByEmail(pool, email);

    if (!user) {
      return res.status(401).json({ message: '[USER] Non-autorisé.' });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: '[USER] Non-autorisé.' });
    }

    delete user.password;

    const token = sign({ email: user.email, status: user.role || "User" }, { expiresIn: '30d' });

    return res.json({ message: "[USER] Connexion réussie.", user, token });
  } catch (e) {
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};
