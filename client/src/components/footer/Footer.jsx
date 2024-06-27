import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const Footer = () => {
  const {hasLogin}= useAuthContext();
  if(!hasLogin){
    return <></>
  }
  return (
    <footer style={styles}>
      <div >
      <span style={{  marginRight: "500px"}}>جميع الحقوق محفوظة لشركة مارس التقنيه 2024</span>
      </div>
      <div className="followus">
        <a href="#" className="bi bi-facebook "></a>
        <a href="#" className="bi bi-twitter-x "></a>
        <a href="#" className="bi bi-instagram "></a>
      </div>
      
    </footer>
  );
};

const styles = {
  color: "var(--dark-color)",
  fontSize: "15px",
  backgroundColor: "var(--green-color)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "50px",
  padding: "40px", // Added padding for spacing between icons and text

};

export default Footer;




  
