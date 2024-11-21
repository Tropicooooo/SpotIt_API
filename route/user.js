import {Router} from 'express';
import {getUser} from "../controler/user.js";

const router = Router();

router.get("/:email", getUser);

export default router;