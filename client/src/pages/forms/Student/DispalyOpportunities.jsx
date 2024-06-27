import React, { useEffect, useState } from 'react';
import Sidebar from './StudentHome/Sidebar';
import StudentHeader from './StudentHome/StudentHeader/StudentHeader';
import Search from './Search'
import { Box, Typography, Grid, Card, CardContent, CardActions, CardMedia, Button } from '@mui/material';
import { useOpportunityContext } from '../../../contexts/OpportunityContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function OpportunityCard({ id, opportunityName, companyId, trainingType, trainingDuration, students, city, imageURL, userId }) {
  const { registerOpportunity } = useOpportunityContext();

  const handleRegisterOpportunity = id => {
    registerOpportunity(id)
  }
  let alreadyApplied = students?.some(item => item._id == userId)
  console.log(alreadyApplied);
  return (
    <Card sx={{ bgcolor: '#efefef', border: '3px solid #ccc', fontFamily: 'Tajawal, sans-serif' }}>
      <Link className='text-decoration-none' to={`/view-company-details/${companyId._id}`}>
        <CardMedia
          component="img"
          height="140"
          image={imageURL}
          alt="Computer"
        />
      </Link>
      <CardContent sx={{ fontFamily: 'Tajawal, sans-serif' }}>
        <Typography sx={{ fontFamily: 'Tajawal, sans-serif' }} variant="h5" component="div">
          {opportunityName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>نوع التدريب: </b>{trainingType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>مدة التدريب: </b>{trainingDuration}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>المدينة: </b>{city}
        </Typography>
        <div className="row mt-5 w-100">
          <div className="col text-center ">
            <Button size="small">عرض التفاصيل</Button>
          </div>
          <div className="col text-center border-secondary border-end">
            <Button size="small" onClick={() => handleRegisterOpportunity(id)}>
              {alreadyApplied
                ? "مُطبَّق"
                : "يتقدم"
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


const DispalyOpportunities = () => {
  const { getAllOpportunities, allOpportunities, searchOpportunity } = useOpportunityContext();
  const { user } = useAuthContext();
  const [search, setSearch] = useState("")

  useEffect(() => {
    getAllOpportunities()
  }, [])


  useEffect(() => {
    searchOpportunity(search)

  }, [search])

  const url = "http://localhost:5001/"


  return (
    <div>


      <StudentHeader />
      <Search setSearch={setSearch} search={search} />

      <div className="container flex-column">
        <div className="row w-100 mt-5">
          <div className="col">
            <Typography style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>
              الفرص التدريبية:
            </Typography>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 w-100 mt-3 mb-5 g-4">
          {allOpportunities?.length > 0
            ? <>
              {allOpportunities?.map((r, index) => (
                <div className="col" key={index}>
                  <OpportunityCard
                    id={r?._id}
                    opportunityName={r?.opportunityName}
                    trainingType={r?.trainingType}
                    trainingDuration={r?.trainingDuration}
                    city={r?.city}
                    students={r?.students}
                    companyId={r?.companyId}
                    imageURL={url + r?.img}
                    userId={user?._id}
                  />
                </div>
              ))}
            </>
            : <div className="col">
              <h3>لم يتم العثور على الفرص</h3>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default DispalyOpportunities;



