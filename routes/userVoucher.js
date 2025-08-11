import { getAllUserVouchers } from "../controler/userVoucher.js";

import { Router } from 'express';
import { createUserVoucher } from '../model/userVoucher.js';
import { managerValidatorMiddleware as PVM } from '../middleware/validation.js';

const router = Router();

/**
 * @swagger
 * /userVoucher:
 *   get:
 *     summary: Retrieve a list of vouchers asked by the user.
 *     description: Retrieve a list of vouchers from the database.
 *     responses:
 *       200:
 *         description: A list of vouchers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   label:
 *                     type: string
 *                     description: Name of the voucher.
 *                     example: "Cavo"
 *                   description:
 *                     type: string
 *                     description: Description of the voucher.
 *                     example: "Restaurant de la ville de Namur"
 *                   points_number:
 *                     type: integer
 *                     description: Number of points required to claim the voucher.
 *                     example: 800
 *                   picture:
 *                     type: string
 *                     format: uri
 *                     description: URL of the image of the voucher.
 * 
 *   post:
 *     summary: Create a new user voucher.
 *     description: Creates a new user voucher and stores it in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 description: Name of the voucher.
 *                 example: "Cinema Ticket"
 *               description:
 *                 type: string
 *                 description: Description of the voucher.
 *                 example: "Cinema ticket for a movie in Namur"
 *               points_number:
 *                 type: integer
 *                 description: Points required to claim the voucher.
 *                 example: 500
 *               picture:
 *                 type: string
 *                 format: uri
 *                 description: URL of the voucher's picture.
 *                 example: "http://example.com/cinema-ticket.jpg"
 *     responses:
 *       201:
 *         description: Voucher created successfully.
 *       400:
 *         description: Invalid input or data validation error.
 */

router.get("/", getAllUserVouchers);
router.post("/", PVM.userVoucher, createUserVoucher);

export default router;
