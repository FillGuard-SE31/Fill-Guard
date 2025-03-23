//IoTBackend/routes/reportRoutes.js
import express from "express";
import { generatePdfReport } from "../controllers/pdfReportController.js";

const router = express.Router();

// Route to generate PDF report.
router.get("/report/pdf", generatePdfReport);

export default router;