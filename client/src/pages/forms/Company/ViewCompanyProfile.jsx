import React, { useEffect, useState } from 'react';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';

import { Box, Typography, Card, CardContent, Rating } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ChatIcon from '@mui/icons-material/Chat';
import PublishIcon from '@mui/icons-material/Publish';
import { useSystemContext } from '../../../contexts/SystemContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useEvaluationContext } from '../../../contexts/EvaluationContext';
import { Link } from 'react-router-dom';

function viewCard(company, comments, url) {
  return (
    <div className="row">
      <div className="col-3">
        <div className="card border-0 p-4 shadow">
          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', margin: '10px' }}>
            <img src={company?.user?.companyImage ? url + company?.user?.companyImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <Typography variant="h5" gutterBottom  >
              {company?.user?.companyName}
            </Typography>
          </Box>
        </div>
        <div className="card border-0 my-4 p-4 shadow">
          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>
            <Typography variant="h5" gutterBottom >
              <div>            عدد التدريبات التي تم نشرها</div>
              <div>
                {company?.activeOpportunities?.length}
              </div>
            </Typography>
          </Box>
        </div>
        <div className="card border-0 p-4 shadow">
          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>
            <Typography variant="h5" gutterBottom >
              <div>وسائل التواصل الإجتماعي</div>
              <div className='mt-3'>
                {company?.user?.facebook &&
                  <Link to={company?.user?.facebook} target='_blank'>
                    <img src="https://static-00.iconduck.com/assets.00/facebook-color-icon-2048x2048-bfly1vxr.png" width={30} height={30} alt="" />
                  </Link>
                }
                {company?.user?.instagram &&
                  <Link to={company?.user?.instagram} target='_blank' className='me-2'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" width={30} height={30} alt="" />
                  </Link>
                }
                {company?.user?.twitter &&
                  <Link to={company?.user?.twitter} target='_blank' className='me-2'>
                    <img src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_twitter-512.png" width={30} height={30} alt="" />
                  </Link>
                }
                {company?.user?.linkedIn &&
                  <Link to={company?.user?.linkedIn} target='_blank' className='me-2'>
                    <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" width={30} height={30} alt="" />
                  </Link>
                }
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
              <strong>تعريف بالشركة:</strong> {company?.user?.descriptionCompany}
            </Typography>
          </Box>
        </div>
        <div className="card border-0 my-4 p-4 shadow">
          <Box style={{ flex: 1, }}>
            <Typography variant="h6" gutterBottom >
              <PublishIcon color="disabled" style={{ fontSize: 50 }} />
              <strong>العروض التدربية التي تم نشرها:</strong>
              {/* {company?.user?.experiences} */}
            </Typography>
          </Box>
        </div>
        <div className="card border-0 p-4 shadow">
          <Box style={{ flex: 1, }} >
            <Typography variant="h6" gutterBottom >
              <ChatIcon color="disabled" style={{ fontSize: 50 }} />
              <strong>التعليقات:</strong>
              {!comments?.length
                ? <div>No comments found</div>
                : <>
                  {comments?.map((item, i) => {
                    return <div className="card mt-3 p-3">
                      <div className="d-flex">
                        <small className='ms-3 fw-bold'>{item?.studentId.firstName}</small>
                        <Rating
                          name="rating"
                          readOnly
                          value={item?.numOfStars}

                        />
                      </div>
                      <p>{item.comment}</p>
                    </div>
                  })}
                </>}
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}




export default function ViewCompanyProfile() {
  const { handleLoading } = useSystemContext()
  const { user, getCompany, userData } = useAuthContext();
  const { getCompanyComments, comments } = useEvaluationContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading && user) {
      setIsLoading(false)
      handleLoading(false)
    }
  }, [handleLoading, isLoading, user]);
  useEffect(() => {
    getCompany()
    getCompanyComments()
  }, [])

  if (isLoading) {
    handleLoading(true);
    return <Box></Box>
  }
  const url = "http://localhost:5001/"

  return (
    <div>
      <CompanyHeader />
      <div className="container">
        <div className="row w-100">
          <div className="col my-5">
            <Typography variant="h6" className='mb-4' gutterBottom >
              <strong>ملف الشركة</strong>
            </Typography>
            <div>
              {/* {viewCard(user)} */}
              {viewCard(userData, comments, url)}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
