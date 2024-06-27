import { Button, Card, CardContent, Typography,Grid,CardActions ,CardMedia } from "@mui/material"
import Sidebar from './StudentHome/Sidebar';
import StudentHeader from './StudentHome/StudentHeader/StudentHeader';
import { Link } from "react-router-dom";

function OpportunityCard({ OpportunityID,OpportunityName,TrainingType,TrainingDuration,City,imageURL }) {
    return (
      <Card sx={{ maxWidth: 345 }}>
           <CardMedia
        component="img"
        height="140"
        image={imageURL}
        alt="Computer"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
           {OpportunityID}
          </Typography>

          <Typography variant="h5" component="div">
        {OpportunityName}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
          نوع التدريب :{TrainingType}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            مدةالتدريب: {TrainingDuration}
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


  export default function DispalyOpportunities() {
    const opp = [
      { OpportunityID: '001', OpportunityName: 'مهندس تكنولوجيا المعلومات', TrainingType: 'حضوري', TrainingDuration: '3 أشهر', City: 'الرياض', imageURL: '/images/engineer.jpg' },
      { OpportunityID: '002', OpportunityName: 'محلل بيانات', TrainingType: 'عن بعد', TrainingDuration: '6 أشهر', City: 'جدة', imageURL: '/images/mm.jpg' },
      { OpportunityID: '003', OpportunityName: 'مطور ويب', TrainingType: 'حضوري', TrainingDuration: '4 أشهر', City: 'الدمام', imageURL: '/images/web_developer.jpg' },
      { OpportunityID: '004', OpportunityName: 'مهندس شبكات', TrainingType: 'حضوري', TrainingDuration: '5 أشهر', City: 'الخبر', imageURL: '/images/network_engineer.jpg' },
      { OpportunityID: '005', OpportunityName: 'مهندس تقنية معلومات', TrainingType: 'عن بعد', TrainingDuration: '3 أشهر', City: 'مكة', imageURL: '/images/it_engineer.jpg' },
      { OpportunityID: '006', OpportunityName: 'مهندس برمجيات', TrainingType: 'حضوري', TrainingDuration: '6 أشهر', City: 'المدينة المنورة', imageURL: '/images/software_engineer.jpg' },
    ];
  
    
  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <StudentHeader />
      </Grid>

      <Grid item xs={3}>
        <Sidebar />
      </Grid>

      <Grid item xs={9}>
        <Grid container spacing={2}>
          {opp.map((r, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <OpportunityCard
                OpportunityID={r.OpportunityID}
                OpportunityName={r.OpportunityName}
                TrainingType={r.TrainingType}
                TrainingDuration={r.TrainingDuration}
                City={r.City}
                imageURL={r.imageURL}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
  }
  