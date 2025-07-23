import express from "express";
import upload from "../middleware/upload.js";

import {
    createPatient,
    viewAllPatients,
    viewOnePatient,
    updatePatient,
    deletePatient
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", upload.single("gramaSewakaCertificate"), createPatient);
router.get("/", viewAllPatients);
router.get("/:id", viewOnePatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
