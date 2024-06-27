// import React from 'react';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

 



function OpportunityCard({ OpportunityID, OpportunityName, TrainingType, TrainingDuration, City, imageURL, numberOfTrainees }) {
    const currentDate = new Date();
    let status; // الحالة الافتراضية
     const startDate = new Date('2024-05-10');// تاريخ بدء التدريب - مو مسموح بعد يسجل
     const endDates = new Date('2024-04-01');
     const regDate = new Date('2024-03-01');// - مو مسموح قبله يسجل تاريخ بدء التسجيل
     let OppnumberOfTrainees = 20;//'2024-04-28',
     if ( currentDate>endDates )// منجز

    status = 'available'; // الحالة الافتراضية

    //  let date = new Date().toJSON();
    
    if (status)
    return (

      <Card sx={{ maxWidth: 345 , bgcolor: '#efefef' ,border: '3px solid #ccc', fontFamily:'Tajawal, sans-serif'}}>
        <CardMedia
          component="img"
          height="140"
          image={imageURL}
          alt="Computer"
        />
        <CardContent sx={{fontFamily:'Tajawal, sans-serif'}}>
          <Typography variant="body2" color="text.secondary">
            {OpportunityID}
          </Typography>
          <Typography sx={{fontFamily:'Tajawal, sans-serif'}} variant="h5" component="div">
            {OpportunityName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            نوع التدريب: {TrainingType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            مدة التدريب: {TrainingDuration}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            المدينة: {City}
          </Typography>
          <CardActions>
            <Button size="small">عرض التفاصيل</Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
  

export default function DisplayCompleted() {
    const opp = [
        { OpportunityID: '002', OpportunityName: 'محلل بيانات', TrainingType: 'عن بعد', TrainingDuration: '6 أشهر', City: 'جدة', imageURL: '/images/mm.jpg', numberOfTrainees:'19'},
        { OpportunityID: '003', OpportunityName: 'مطور ويب', TrainingType: 'حضوري', TrainingDuration: '4 أشهر', City: 'الدمام', imageURL: '/images/web_developer.jpg' , numberOfTrainees:'20'},
        { OpportunityID: '002', OpportunityName: 'مهندس بيانات', TrainingType: 'عن بعد', TrainingDuration: '10 أشهر', City: 'مكة', imageURL: '/images/mm.jpg' ,  numberOfTrainees:'5'},
    
      ];
    return (
        <div>
            <CompanyHeader />


        <Grid container  direction="column" justifyContent="flex-start" alignItems="center" style={{ height: '100vh' }}  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    
        
        <Typography
    style={{
        fontFamily: 'Tajawal, sans-serif',
        textAlign: 'center', // Center the text
        fontSize: '2rem',    // Set the font size to 2rem (adjust as needed)
        paddingLeft: '400px',
    }}
>
    الفرص المنجزة
</Typography>
     
      <Grid container spacing={2} sx={{ width: '80%', margin: 'auto', marginTop: '20px' ,   marginRight: '300px' , marginLeft: '500px'}}>
    
<br></br>
<br></br>


        {opp.map((r, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>

             <OpportunityCard
              OpportunityID={r.OpportunityID}
              OpportunityName={r.OpportunityName}
              TrainingType={r.TrainingType}
              TrainingDuration={r.TrainingDuration}
              City={r.City}
              imageURL={r.imageURL}
              numberOfTrainees={r.numberOfTrainees} //
              status={r.status} // 
            />
           </Grid>
            ))} 
            </Grid>
            </Grid>

        </div>
    );
};

