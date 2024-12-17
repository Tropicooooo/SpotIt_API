import { Router } from 'express';
import { getAmusementParks } from "../controler/amusementPark.js";

const router = Router();

router.get("/", getAmusementParks);

export default router;