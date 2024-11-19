import {Router} from 'express';
import {getUser} from "../controler/user.js";

const router = Router();

router.get("/:id", getUser);

export default router;