import React, { useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader/StudentHeader';
import Test from '../StudentHome/Test';
import ProfileHeroSection from './ProfileHeroSection'
import { useAuthContext } from '../../../../contexts/AuthContext';
import { useSystemContext } from '../../../../contexts/SystemContext';
const Profile = () => {
  const { hasLogin } = useAuthContext();
  const { goToPage } = useSystemContext();
  useEffect(() => {
    if (!hasLogin) {
      goToPage("/");
    }
  }, [goToPage, hasLogin]);


  return (<div>
    <StudentHeader />
    <ProfileHeroSection />


    <Test />
  </div>);
}

export default Profile;