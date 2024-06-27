import React, { useEffect } from 'react';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';
import CompanySidebar from './CompanyHome/CompanySidebar';
import { Box, Link, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useOpportunityContext } from '../../../contexts/OpportunityContext';

function StudentCard({ name, profileLink }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid #ccc', borderRadius: '8px', mb: 2 }}>
      <Typography sx={{ flexGrow: 1 }}>{name}</Typography>
      <Link href={profileLink} >عرض الملف الشخصي</Link>
    </Box>
  );
}

const AcceptedStudent = () => {
  const { oppId } = useParams();
  const { getOpportunityRegistrations, registrations } = useOpportunityContext();

  useEffect(() => {
    if (oppId !== "") {
      getOpportunityRegistrations(oppId, "Accepted")
    }
  }, [oppId])

  return (
    <div>
      <CompanyHeader />
      <div className="container flex-column">
        <div className="row w-100">
          <div className="col">
            <Typography variant="h4" gutterBottom className='text-center mb-4' fontFamily='Tajawal' marginRight='200px' marginTop='30px' fontWeight='bold'>إدارة الطلبات</Typography>
            <Typography variant="h6" gutterBottom fontFamily='Tajawal, sans-serif' fontWeight='bold'>اختر الطالب المناسب:</Typography>
          </div>
        </div>
        <div className="row w-100 mt-5">
          <div className="col-12 col-md-8 mx-auto">
            <Box>
              {registrations?.map((item, i) => {
                return <StudentCard key={i} name={item?.studentId?.firstName} profileLink={`/view-student-details/${item?.studentId?._id}`} fontFamily='Tajawal, sans-serif' />
              })}
            </Box>
            {registrations.length == 0
              && <Box className="text-center fw-bold my-4">
                No record found
              </Box>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptedStudent;
