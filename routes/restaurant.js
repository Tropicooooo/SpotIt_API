import { Router } from 'express';
import { getRestaurants } from "../controler/restaurant.js";

const router = Router();

router.get("/", getRestaurants);

export default router;