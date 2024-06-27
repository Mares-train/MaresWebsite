import './Company.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '../../../components/header/header';
import { useSystemContext } from '../../../contexts/SystemContext';
import { useAuthContext } from '../../../contexts/AuthContext';



export default function CompanySignup() {
  const [name, setName] = React.useState("");
  const [commercialNum, setCommercialNum] = React.useState("");
  const [email, setEamil] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { goToPage } = useSystemContext();
  const { signUpCompany, isCompany, isStudent } = useAuthContext();
  React.useEffect(() => {
    if (isCompany) {
      goToPage("company-home");
    }
    else if (isStudent) {
      goToPage("student-home");
    }
  }, [goToPage, isCompany, isStudent]);


  function validateInput(cred) {
    console.log({
      companyName: cred.get('companyName'),
      commercialRegistrationNumber: cred.get('commercialRegistrationNumber'),
      email: cred.get('email'),
      password: cred.get('password'),
      confirmpassword: cred.get('confirmpassword'),
    });

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const cred = new FormData(event.currentTarget);
      validateInput(cred);
      signUpCompany({
        companyName:name,
        commercialRegistrationNumber: commercialNum,
        email: email,
        password: password,
      })


    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };


  return (
    <Box sx={{height:"100vh"}} flexDirection={"column"}>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            my:2,
            height:1,
            justifyContent:'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'mediumaquamarine;' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <span>تسجيل جديد</span>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="companyName"
                  required
                  fullWidth
                  value={name}
                  id="companyName"
                  label={"إسم الشركة"}
                  autoFocus
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={commercialNum}
                  id="commercialRegistrationNumber"
                  label={"رقم السجل التجاري"}
                  name="commercialRegistrationNumber"
                  autoComplete="family-name"
                  onChange={(e) => {
                    setCommercialNum(e.currentTarget.value);
                  }}

                />
                
                </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="البريد الإلكتروني"
                placeholder="البريد الإلكتروني"
                value={email}
                name="email"
                type="email"
                autoComplete='email'
                onChange={(e) => {
                  setEamil(e.currentTarget.value);
                }}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={password}
                name="password"
                label="كلمة المرور "
                id="password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmpassword"
                label="تأكيد كلمة المرور"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                }}
              />
            </Grid>
            </Grid>
            
            <Button

              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: 'mediumaquamarine', color: 'black' }}
            >
              <span>إنشاء حساب</span>
            </Button>
            <Grid container justifyContent="flex-end"  >
              <Grid item >
                <span >
                  لديك حساب في مارس؟ <a href="/company-sign-in">تسجيل الدخول</a>
                </span>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </Box>


  );
}