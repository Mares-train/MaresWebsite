
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";


// import Student from "./pages/forms/Student/Student";

import StudentSignup from "./pages/forms/Student/StudentSignup";
import StudentSignin from "./pages/forms/Student/StudentSignin";
import ResetPassword from "./pages/forms/ResetPassword/ResetPassword"
import Footer from "./components/footer/Footer";
import HeroSection from "./pages/home/HeroSection/HeroSection";
//Student
import StudentHome from "./pages/forms/Student/StudentHome/StudentHome";
import Test from "./pages/forms/Student/StudentHome/Test";
import Profile from "./pages/forms/Student/StudentProfile/Profile";
import Resume from "./pages/forms/Student/StudentProfile/Resume";

//Company 
import Company from "./pages/forms/Company/Company";
import CompanySignin from "./pages/forms/Company/CompanySignin";
import CompanySignup from "./pages/forms/Company/CompanySignup";
////////////////
// Material UI imports

import CompanyHome from './pages/forms/Company/CompanyHome/CompanyHome';
import CreateOpportunity from './pages/forms/Company/CreateOpportunity';
import Cinfo from './pages/forms/Company/Cinfo';
import DispalyOpportunities from './pages/forms/Student/DispalyOpportunities';
import ManageRequests from './pages/forms/Company/ManageRequests';
import ViewRequests from './pages/forms/Student/ViewRequests';
import SelectStudent from './pages/forms/Company/SelectStudent';
import AcceptedStudent from './pages/forms/Company/AcceptedStudent';
import CommentBox from './pages/forms/Student/CommentBox';
import DisplayPublished from './pages/forms/Company/DisplayPublished';
import DisplayUnavailable from './pages/forms/Company/DisplayUnavailable';
import DisplayCompleted from './pages/forms/Company/DisplayCompleted';
import ViewCompanyProfile from './pages/forms/Company/ViewCompanyProfile';
import ViewStudentProfile from './pages/forms/Student/ViewStudentProfile';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSystemContext } from './contexts/SystemContext';
import Toast from './components/Toast';
import { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap';
import RejectedStudent from './pages/forms/Company/RejectedStudent';
import ViewStudentDetails from './pages/forms/Company/ViewStudentProfile';
import ViewCompanyDetails from './pages/forms/Student/ViewCompanyProfile';

function App() {
  const { toast, error, handleError, showToast, hideToast, loading } = useSystemContext();


  useEffect(() => {
    if (error) {
      showToast("error", error);
      handleError(null);
    }
  }, [error, handleError, showToast]);

  <HeroSection />

  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-sign-in" element={<StudentSignin />} />
        <Route path="/student-sign-up" element={<StudentSignup />} />
        {/* <Route path="/student" element={<Student />} /> */}
        <Route path="/company" element={<Company />} />
        <Route path="/company-sign-in" element={<CompanySignin />} />
        <Route path="/company-sign-up" element={<CompanySignup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/student-home" element={<StudentHome />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/company-home" element={<CompanyHome />} />
        <Route path="/create-opportunity" element={<CreateOpportunity />} />
        <Route path="/cinfo" element={<Cinfo />} />
        <Route path="/dispaly-opportunities" element={<DispalyOpportunities />} />
        <Route path="/manage-requests" element={<ManageRequests />} />
        <Route path="/view-requests" element={<ViewRequests />} />
        <Route path="/select-student" element={<SelectStudent />} />
        <Route path="/accepted-student/:oppId" element={<AcceptedStudent />} />
        <Route path="/rejected-student/:oppId" element={<RejectedStudent />} />
        <Route path="/display-published" element={<DisplayPublished />} />
        <Route path="/display-unavailable" element={<DisplayUnavailable />} />
        <Route path="/display-completed" element={<DisplayCompleted />} />
        <Route path="/view-company-profile" element={<ViewCompanyProfile />} />
        <Route path="/view-student-profile" element={<ViewStudentProfile />} />
        <Route path="/view-student-details/:id" element={<ViewStudentDetails />} />
        <Route path="/view-company-details/:id" element={<ViewCompanyDetails />} />

        <Route path="/comment-box/:companyId" element={<CommentBox />} />

      </Routes>
      <Footer />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toast
        toast={toast}
        hideToast={hideToast}
      />

    </div>


  );

}




export default App;
