import React, { useEffect } from 'react';
import './StudentHome.css'
import StudentHeader from './StudentHeader/StudentHeader'
import StudentHeroSection from './StudentHeroSection/StudentHeroSection';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useSystemContext } from '../../../../contexts/SystemContext';



const StudentHome = () => {
  const { hasLogin} = useAuthContext();
  const {goToPage} = useSystemContext();
  useEffect(() => {
    if(!hasLogin){
      goToPage("/");
    }
  }, [goToPage, hasLogin]);

  return (
    <div >
      
      <StudentHeader />
      <StudentHeroSection />
    
    
      <br></br>
      <br></br>
    </div>
  );
}
export default StudentHome;