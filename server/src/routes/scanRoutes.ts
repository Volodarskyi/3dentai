import { Router } from 'express';

import scanController from '../controllers/scanController';

const router = Router();

// Get scan by ID
router.get('/:id', scanController.getScanByIdController);

// Get scans by doctor_id
router.get('/doctor/:doctorId', scanController.getScansByDoctorIdController);

// Get scans by user_id
router.get('/user/:userId', scanController.getScansByUserIdController);

// Create a new scan
router.post('/', scanController.createScanController);

export default router;
