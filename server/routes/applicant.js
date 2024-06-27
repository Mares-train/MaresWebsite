import express from 'express';
const router = express.Router();

import { addApplicant, deleteApplicant, getApplicants, getStudentApplicants, getOpportunityApplicants, updateApplicant } from '../controllers/applicantController.js';

router.post('/', addApplicant);
router.post('/delete/:_id', deleteApplicant);
router.get('/', getApplicants);
router.get('/student/:studentId', getStudentApplicants);
router.get('/', getApplicants);
router.post("/reset-password", resetPassword);
router.patch('/:id', updateProfileCV);//CreateProfile/updateProfile
router.post('/delete-account', deleteAccount);
router.get('/view-profile', ViewProfile);
router.get('/view-student-page', ViewStudentPage);
router.post('/add-opportunities', AddOpportunities);
router.post('/select-students', SelectStudents);

export default router;
