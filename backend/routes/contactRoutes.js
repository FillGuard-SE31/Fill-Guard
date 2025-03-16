import express from "express";
const router = express.Router();

import { sendMail } from "../controllers/contactController.js";

router.post("/", sendMail);

export default router;
