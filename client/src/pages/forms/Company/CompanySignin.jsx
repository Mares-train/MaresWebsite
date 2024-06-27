
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
import { useAuthContext } from '../../../contexts/AuthContext';
import { useSystemContext } from '../../../contexts/SystemContext';





export default function CompanySignin() {

  const { signIn, error, isCompany, isStudent } = useAuthContext();
  const { goToPage } = useSystemContext();
  const [email, setEamil] = React.useState("");
  const [password, setPassword] = React.useState("");

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
    const cred = new FormData(event.currentTarget);
    signIn({
      role: "company",
      email: email,
      password: password,
    });
  };

  return (
    <div>

      <Header />
      <Container sx={{ height: "80vh" }} component="main" maxWidth="xs">
        <Box
          sx={{
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'mediumaquamarine;' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <span>تسجيل الدخول</span>
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
              تسجيل الدخول
            </Button>
          </form>
          <Grid container justifyContent="flex-end"  >
            <Grid item >
              <span >ليس لديك حساب في مارس؟ <a href="/company-sign-up">إنشاء حساب</a></span>
              <br></br>
              <span>نسيت كلمة المرور؟ <a href="/reset-password"> إعادة تعيين </a></span>

            </Grid>
          </Grid>
        </Box>
      </Container>

    </div>


  );
}
