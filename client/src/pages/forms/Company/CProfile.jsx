import React, { useEffect } from 'react';
//import StudentHeader from '../StudentHome/StudentHeader/StudentHeader';
//import Sidebar from '../StudentHome/Sidebar';
import Cinfo from './Cinfo';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useSystemContext } from '../../../contexts/SystemContext';
//import ProfileHeroSection from './ProfileHeroSection'


const CProfile = () => {
    const { hasLogin} = useAuthContext();
    const {goToPage} = useSystemContext();
    useEffect(() => {
      if(!hasLogin){
        goToPage("/");
      }
    }, [goToPage, hasLogin]);
  
  
    return (<div>
        <CompanyHeader />
        <Cinfo />
    </div>);
}
 
export default CProfile;