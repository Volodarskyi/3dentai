import { Router } from 'express';

import patientController from "@/controllers/patient.controller";

const router = Router();

// 📌 Get all scans for the current user (patient)
router.get("/doctor", patientController.getDoctorDataByUserId);

export default router;
