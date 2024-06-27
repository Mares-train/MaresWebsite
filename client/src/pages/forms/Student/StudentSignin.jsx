import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '../../../components/header/header';
import { useSystemContext } from '../../../contexts/SystemContext';
import { useAuthContext } from '../../../contexts/AuthContext';




export default function StudentSignin() {
  const [email, setEamil] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn, isCompany, isStudent } = useAuthContext();
  const { goToPage } = useSystemContext();
  React.useEffect(() => {
    if (isCompany) {
      goToPage("company-home");
    }
    else if (isStudent) {
      goToPage("student-home");
    }
  }, [goToPage, isCompany, isStudent]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    signIn({
      role: "student",
      email: email,
      password: password,
    });
  };


  return (
    <>
      <Header />
      <Box  >
        <Container component="main" maxWidth="xs">

          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'mediumaquamarine;' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">تسجيل الدخول
            </Typography>
            <form noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                required
                margin='normal'
                fullWidth
                id="email"
                label="البريد الإلكتروني"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEamil(e.currentTarget.value);
                }}


              />
              <TextField
                margin='normal'
                required
                fullWidth
                name="password"
                label="كلمة المرور"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}


              />
              <Button

                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: 'mediumaquamarine', color: 'black' }}
              >
                <span> تسجيل الدخول</span>
              </Button>
            </form>
            <Grid container justifyContent="flex-end"  >
              <Grid item >
                <span >ليس لديك حساب في مارس؟ <a href="/student-sign-up">إنشاء حساب</a></span>
                <br></br>
                <span>نسيت كلمة المرور؟ <a href="/reset-password"> إعادة تعيين </a></span>

              </Grid>
            </Grid>

          </Box>

        </Container>

      </Box>
    </>


  );
}