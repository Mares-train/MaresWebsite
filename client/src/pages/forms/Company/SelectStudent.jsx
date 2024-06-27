import React from 'react';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';
import CompanySidebar from './CompanyHome/CompanySidebar';
import { Box, Checkbox, Link, Typography } from '@mui/material';

function StudentCard({ name, profileLink }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid #ccc', borderRadius: '8px', mb: 2 }}>
      <Typography sx={{ flexGrow: 1 }}>{name}</Typography>
      <Link href={profileLink} target="_blank" rel="noopener noreferrer">عرض الملف الشخصي</Link>
      <Checkbox />
    </Box>
  );
}

const SelectStudent = () => {
  return (
    <div >
      <CompanyHeader />
      <div style={{ width: '50%', minHeight: '100px', fontFamily: 'Tajawal', marginBottom: '20px', marginRight: '400px' }}>
        <Box   >
          <Typography variant="h4" gutterBottom fontFamily='Tajawal' marginRight='200px' marginTop='20px' fontWeight='bold'>إدارة الطلبات</Typography>
          <Typography variant="h6" gutterBottom fontFamily='Tajawal, sans-serif'>اختر الطالب المناسب:</Typography>
          <StudentCard name="Ghaid Sam" profileLink="" fontFamily='Tajawal, sans-serif' />
          <StudentCard name="Salwa Musa" profileLink="" />
          <StudentCard name="Ghada Mohammed" profileLink="" />
          <StudentCard name="Manar Alkhattabi" profileLink="" />
          <StudentCard name="Idrees Alsolbi" profileLink="" />
          {/* Add more StudentCard components for additional students */}
        </Box>
      </div>
    </div>
  );
};

export default SelectStudent;

