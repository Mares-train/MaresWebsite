import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';


import {
    signin, signup, test, resetPassword, updateStudent, deleteStudent,
    ViewProfile, FilterTheOpp, SearchForTheOpp, RegistrationInTheOpp,
    DiscoverLocation, ViewRequest, getCurrentUser, uploadPDF, deleteCV, uploadCertificates, deleteCertificate, uploadImage
} from '../controllers/studentController.js';
router.post('/sign-in', signin);
router.post('/sign-up', signup);
router.get('/test', test);
router.post('/reset-password', resetPassword);
router.put('/:id', updateStudent);
router.get('/delete', deleteStudent);
router.post('/view-profile', ViewProfile);
router.post('/filter-the-opp', FilterTheOpp);
router.post('/search-for-the-opp', SearchForTheOpp);
router.post('/registration-in-the-Opp', RegistrationInTheOpp);
router.post('/discover-location', DiscoverLocation);
router.post('/view-request', ViewRequest);
router.get('/get-current-user/:id', getCurrentUser);
router.post('/upload', auth, uploadPDF);
router.post('/uploadCertificate', auth, uploadCertificates);
router.post('/deleteCV', auth, deleteCV);
router.post('/deleteCertificate', auth, deleteCertificate);
router.post('/uploadImage', auth, uploadImage);





export default router;
