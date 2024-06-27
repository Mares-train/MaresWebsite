import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Features = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Box sx={{ border: 1, borderRadius: 2, p: 2, textAlign: 'center',  margin: '30px 30px' }}>
          <VisibilityIcon sx={{ fontSize:30 }} />
          <Typography variant="h6" sx={{ mt: 2, color: 'mediumaquamarine' }}>
            الرؤية
          </Typography>
          <Typography variant="body1" sx={{fontFamily: 'Tajawal, sans-serif'}}>
            نرى مارس كمنصة رائدة تجمع بين الطلاب الطموحين والشركات الرائدة، لتحقيق أحلامهم المهنية والتميز في سوق العمل.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ border: 1, borderRadius: 2, p: 2, textAlign: 'center',  margin: '30px 30px'  }}>
          <MessageIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6" sx={{ mt: 2, color: 'mediumaquamarine' }}>
            الرسالة
          </Typography>
          <Typography variant="body1" sx={{fontFamily: 'Tajawal, sans-serif'}}>
            نحن هنا في مارس نسعى لتوفير بيئة تعليمية وتدريبية ملهمة ومحفزة، تمكن الطلاب من اكتساب المهارات والخبرات الضرورية لتحقيق نجاحهم المهني.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ border: 1, borderRadius: 2, p: 2, textAlign: 'center', margin: '30px 30px'  }}>
          <TrendingUpIcon sx={{ fontSize: 30 }} />
          <Typography variant="h6" sx={{ mt: 2, color: 'mediumaquamarine' }}>
            الطموح
          </Typography>
          <Typography variant="body1" sx={{fontFamily: 'Tajawal, sans-serif'}}>
            طموحنا في مارس هو أن نصبح الوجهة الأساسية للطلاب والشركات على حد سواء، حيث يأتون لبناء مستقبلهم المهني وتحقيق أهدافهم.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Features;



