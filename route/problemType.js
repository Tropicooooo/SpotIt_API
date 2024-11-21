import { Router } from 'express';
import { getProblemType } from "../controler/problemType.js";

const router = Router();

router.get("/", getProblemType);

export default router;
