import React, { useEffect } from 'react';
import StudentHeader from './StudentHome/StudentHeader/StudentHeader';
import { Box, Typography, Card, CardContent } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useSystemContext } from '../../../contexts/SystemContext';
import { useAuthContext } from '../../../contexts/AuthContext';


function viewCard(student, url) {
  let jobRelatedSkills = student?.user?.jobRelatedSkills.map(item => item.label)
  let technicalSkills = student?.user?.technicalSkills.map(item => item.label)
  let administrativeSkills = student?.user?.administrativeSkills.map(item => item.label)
  let tools = student?.user?.tools.map(item => item.label)
  return (
    <>
      {/* <Card style={{ fontFamily: 'Tajawal, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
      <div className="row">
        <div className="col-3">
          <div className="card border-0 p-4 shadow">
            <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', margin: '10px' }}>
              <img src={student?.user?.profilePic ? url + student?.user?.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

              <Typography variant="h5" gutterBottom  >
                {student?.user?.firstName} {student?.user?.lastName}
              </Typography>
            </Box>
          </div>
          <div className="card border-0 my-4 p-4 shadow">
            <Box style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>
              <Typography variant="h5" gutterBottom >
                <div>الطلبات التي تم إنشائها</div>
                <div>
                  {student?.activeRegistrations?.length}
                </div>
              </Typography>
            </Box>
          </div>
          <div className="card border-0 p-4 shadow">
            <Box style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>
              <Typography variant="h5" gutterBottom >
                <div>التدريبات المنتهية</div>
                <div>
                  {student?.completedRegistrations?.length}
                </div>
              </Typography>
            </Box>
          </div>
        </div>


        <div className="col-9">
          <div className="card border-0 p-4 shadow">
            <Box style={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom >
                <ContactPageIcon color="disabled" style={{ fontSize: 50 }} />
                <strong>الوصف:</strong> {student?.user?.description}
              </Typography>
            </Box>
          </div>
          <div className="card border-0 my-4 p-4 shadow">
            <Box style={{ flex: 1, }}>
              <div className="row">
                <div className="col-1">
                  <AssessmentIcon color="disabled" style={{ fontSize: 50 }} />
                </div>
                <div className="col">
                  <Typography variant="h6" gutterBottom >
                    <div><strong>الخبرات</strong></div>
                    <div>
                      <small><strong>اسم الشركة: </strong>{student?.user?.companyName}</small>
                    </div>
                    <div>
                      <small><strong>موقع الشركة: </strong>{student?.user?.companyLocation}</small>
                    </div>
                    <div>
                      <small><strong>مسمى وظيفي: </strong>{student?.user?.jobTitle}</small>
                    </div>
                    <div>
                      <small><strong>نوع العمل: </strong>{student?.user?.typeOfTheJob}</small>
                    </div>
                  </Typography>
                </div>
              </div>
            </Box>
          </div>
          <div className="card border-0 p-4 shadow">
            <Box style={{ flex: 1, }} >
              <div className="row">
                <div className="col-1">
                  <MenuBookIcon color="disabled" style={{ fontSize: 50 }} />
                </div>
                <div className="col">
                  <Typography variant="h6" gutterBottom >
                    <strong>مهارات متعلقة بالعمل:</strong>                    
                    {jobRelatedSkills?.join(', ')}
                    <br />
                    <strong>مهارات تقنية:</strong>
                    {technicalSkills?.join(', ')}                 
                    <br />
                    <strong>المهارات الإدارية:</strong>
                    {administrativeSkills?.join(', ')}                                     
                    <br />
                    <strong>الأدوات والبرامج:</strong>
                    {tools?.join(', ')}                                                         
                    <br />
                  </Typography>
                </div>
              </div>
            </Box>
          </div>
          {(student?.user?.cv && student?.user?.cv !== "") &&
            <div className="card border-0 p-4 shadow my-4" style={{ height: '700px' }}>
              <h4 className='mb-2'>السيرة الذاتية للطالب</h4>
              <iframe
                src={url + student?.user?.cv}
                title="PDF Viewer"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </div>
          }
          {(student?.user?.certificates && student?.user?.certificates !== "") &&
            <div className="card border-0 p-4 shadow" style={{ height: '700px' }}>
              <h4 className='mb-2'>شهادات الطالب</h4>
              <iframe
                src={url + student?.user?.certificates}
                title="PDF Viewer"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </div>
          }
        </div>
      </div>
    </>

  );
}

export default function ViewStudentProfile() {
  const { handleLoading } = useSystemContext()
  const { user, getUser, userData } = useAuthContext();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (user && isLoading) {
      setIsLoading(false)
      handleLoading(false)
    }
  }, [handleLoading, isLoading, user]);

  useEffect(() => {
    getUser()
  }, [])

  if (isLoading) {
    handleLoading(true);
  }
  const url = "http://localhost:5001/"


  return (
    <div>
      <StudentHeader />
      <div className="container">
        <div className="row w-100">
          <div className="col my-5">
            <Typography variant="h6" className='mb-4' gutterBottom >
              <strong>الملف الشخصي</strong>
            </Typography>
            <div>
              {viewCard(userData, url)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



