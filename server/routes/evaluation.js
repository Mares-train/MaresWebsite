import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();

import {
    addEvaluation,
    getEvaluations
} from '../controllers/evolutionController.js';

router.post('/add-evaluation', auth, addEvaluation);
router.get('/get-evaluations/:companyId', auth, getEvaluations);





export default router;
