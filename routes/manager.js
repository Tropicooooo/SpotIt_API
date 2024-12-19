// manager.js (routes)
import Router from "express-promise-router";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getUserByEmail,
  loginUser,
} from "../controler/manager.js";
import { managerValidatorMiddleware as MPV } from "../middleware/validation.js";

const router = Router();

router.get("/users", getUsers);
router.get("/user", getUser);
router.delete("/user", deleteUser);
router.patch("/user", MPV.user, updateUser);
router.post("/user", MPV.user, createUser);
router.get("/user/email", getUserByEmail);
router.post("/login", loginUser); // Nouvelle route pour la connexion

export default router;
