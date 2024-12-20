import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import argon2 from "argon2";

export const getUser = async (req, res, next) => {

  const { email, password } = req.body;
  const hashFromDatabase = '$argon2id$v=19$m=65536,t=3,p=4$bGVzb3JyYW5nZXNzb250b3JyYW5nZXM$4Vdt3kolOcK6azuxSrVZNA'; // Hash d'exemple généré

  try {
    // Récupérer l'utilisateur via le modèle
    const user = await userModel.getUserByEmail(pool, email);
    if (!user) {
        console.log("test1");
      return res.status(404).json({ error: "Invalid email or password" });
    }


    // Vérifier le mot de passe (bcrypt si hashé)
    console.log(hashFromDatabase , password);
   // const isPasswordValid = await argon2.verify(hashFromDatabase, password); // Si password n'est pas hashé, remplace par une simple comparaison.
   const isPasswordValid = false;

    if (!isPasswordValid) {
        console.log("test2");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Ajouter les infos utilisateur à req pour le prochain middleware

    req.user = {
      email: user.email,
      role: user.role_label,
    };
    console.log("controler:",req.user);


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

