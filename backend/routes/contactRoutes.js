// import express from "express";
// const router = express.Router();

// import { sendMail } from "../controllers/contactController.js";

// router.post("/", sendMail);

// export default router;

import express from "express";
import { sendContactMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", sendContactMessage);

export default router;