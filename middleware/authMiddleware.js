// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const SECRET_KEY = "votre_cle_secrete"; // Remplacez par votre propre clé secrète

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.userRole = decoded.role;
    next();
  });
};
