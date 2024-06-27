import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StudentHeader.css';
import S_HeaderLeft from './S_HeaderLeft';
import S_HeaderRight from './S_HeaderRight';
import S_Navbar from './S_Navbar';

const StudentHeader = () => {
  // Define toggle and setToggle using useState
  const [toggle, setToggle] = useState(false);

  return (
    <div className="header bg-white shadow-sm">
      <S_HeaderRight />
      {/* Pass toggle and setToggle as props to S_Navbar */}
      <S_Navbar toggle={toggle} setToggle={setToggle} />
      <S_HeaderLeft />
    </div>
  );
};

export default StudentHeader;

