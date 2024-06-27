import React, { useEffect } from 'react';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';
import { Box, Typography, Grid, Card, CardContent, CardActions, CardMedia, Button } from '@mui/material';
import { useOpportunityContext } from '../../../contexts/OpportunityContext';
import { useAuthContext } from '../../../contexts/AuthContext';

function OpportunityCard({ id, opportunityName, trainingType, trainingDuration, students, city, imageURL }) {
  return (
    <Card sx={{ bgcolor: '#efefef', border: '3px solid #ccc', fontFamily: 'Tajawal, sans-serif' }}>
      <CardMedia
        component="img"
        height="150"
        image={imageURL}
        alt="Computer"
      />
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
        </div>
      </CardContent>
    </Card>
  );
}


const DispalyOpportunities = () => {
  const { loadMyOpportunities, allOpportunities } = useOpportunityContext();

  useEffect(() => {
    loadMyOpportunities()
  }, [])

  const url = "http://localhost:5001/"


  return (
    <div>
      <CompanyHeader />

      <div className="container flex-column">
        <div className="row w-100 mt-5">
          <div className="col">
            <Typography style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 'bold' }}>
              الفرص المنشورة
            </Typography>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 w-100 mt-3 mb-5 g-4">
          {allOpportunities?.length > 0
            ? <>
              {allOpportunities?.map((r, index) => (
                <div className="col" key={index}>
                  <OpportunityCard
                    id={r._id}
                    opportunityName={r.opportunityName}
                    trainingType={r.trainingType}
                    trainingDuration={r.trainingDuration}
                    city={r.city}
                    students={r.students}
                    imageURL={url + r.img}
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



