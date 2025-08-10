import { pool } from '../database/database.js';
import * as userModel from '../model/user.js';
import { sign } from '../util/jwt.js';
import { compare } from '../util/index.js'; 

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const user = await userModel.getUserByEmail(pool, email);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    delete user.password;

    // Création du token JWT (ajuster selon ta payload)
    const token = sign({ email: user.email, status: user.role || "User" }, { expiresIn: '30d' });

    // Tu peux soit renvoyer directement la réponse ici,
    // soit la passer à next() avec req.user/token (selon ton flow)
    return res.json({ message: "Login successful", user, token });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res, next) => {
  const { email } = req.session;
  try {
    const user = await userModel.getUserByEmail(pool, email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.send(user);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    await userModel.updateUser(pool, req.val);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const createUser = async (req, res) => {
  try {
    if (typeof req.val.pointsNumber === "undefined") {
      req.val.pointsNumber = 0;
    }
    await userModel.createUser(pool, req.val);
    const token = sign(
      { email: req.val.email, status: "User" },
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: "User created successfully",
      user: req.val,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};