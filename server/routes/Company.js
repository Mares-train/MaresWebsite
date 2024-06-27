import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import {
    signinCompany, signupCompany, testCompany, resetPassword,
    updateCompany, deleteAccount, ViewProfile, SelectStudents, getCurrentUser, uploadImage
} from '../controllers/companyController.js';

router.post('/sign-in', signinCompany);
router.post('/sign-up', signupCompany);
router.get('/testCompany', testCompany);
router.post("/reset-password", resetPassword);
router.put('/:id', updateCompany);//CreateProfile/updateProfile
router.post('/delete-account', deleteAccount);
router.get('/view-profile', ViewProfile);
router.post('/select-students', SelectStudents);
router.get('/get-current-user/:id', getCurrentUser);
router.post('/upload', auth, uploadImage);

export default router;
