import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();

import {
    addOpportunity, updateOpportunity, deleteOpportunity,
    getStudentOpportunities, getCompanyOpportunities, getOpportunity, getAllOpportunities, registerOpportunity, searchOpportunity, acceptRegistration, rejectRegistration,
    uploadImage
} from '../controllers/opportunityController.js';

router.post('/', addOpportunity);
router.patch('/:id', updateOpportunity);
router.post('/delete', deleteOpportunity);
router.get('/getAllOpportunities', auth, getAllOpportunities);
router.post('/registerOpportunity', auth, registerOpportunity);
router.get('/searchOpportunity', auth, searchOpportunity);
router.put('/acceptRegistration', auth, acceptRegistration);
router.put('/rejectRegistration', auth, rejectRegistration);
router.get('/student/:studentId', getStudentOpportunities);
router.get('/company/:companyId', getCompanyOpportunities);
router.post('/upload', uploadImage);
router.get('/:id', auth, getOpportunity);

export default router;
