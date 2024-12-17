import { Router } from 'express';
import { getCinemas } from "../controler/cinema.js";

const router = Router();

router.get("/", getCinemas);

export default router;