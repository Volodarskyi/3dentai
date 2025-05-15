import { Router } from 'express';

import scanController from '../controllers/scan.controller';

const router = Router();

// 📌 Create new scan
router.post("/add", scanController.add);

// 📌 Get all scans for the current user (patient)
router.get("/user", scanController.getAllByUser);

// 📌 Get all scans for the current doctor (optionally filter by userId, status)
router.get("/doctor", scanController.getAllByDoctor);

// 📌 Get single scan by ID !!! should be last of all routes
router.get("/:id", scanController.getById);

export default router;
