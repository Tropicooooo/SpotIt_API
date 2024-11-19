import { Router } from 'express';
import { getProblem, addProblem, getProblemsInRegion } from "../controler/problem.js";

const router = Router();

// Route pour obtenir un seul rapport par ID
router.get("/:id", getProblem);

// Route pour récupérer les rapports dans une région donnée
router.get("/", getProblemsInRegion);

// Route pour ajouter un rapport
router.post("/", addProblem);

export default router;
