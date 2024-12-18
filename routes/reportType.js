import { Router } from 'express';
import { getReportType } from "../controler/reportType.js";

const router = Router();

router.get("/", getReportType);

export default router;
