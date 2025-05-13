import { Router } from 'express';

import scanController from '../controllers/scan.controller';

const router = Router();

// Get scan by ID
router.post('/save', scanController.saveScan);

export default router;
