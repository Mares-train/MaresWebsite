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


export default function StudentSignup() {
  const { goToPage, handleError } = useSystemContext();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEamil] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { signUpStudent, isCompany, isStudent } = useAuthContext();
  React.useEffect(() => {
    if (isCompany) {
      goToPage("company-home");
    }
    else if (isStudent) {
      goToPage("student-home");
    }
  }, [goToPage, isCompany, isStudent]);


  function validateInput() {
    return password === confirmPassword;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validateInput()) {
        signUpStudent({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      }
      else {
        handleError("كلمات المرور غير متطابقة!");
      }

    } catch (error) {
      console.error('Error during fetch:', error);
    }

  };

  return (
    <div>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
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
                  name="firstName"
                  value={firstName}
                  required
                  fullWidth
                  id="firstName"
                  label="الإسم الأول"
                  autoFocus
                  onChange={(e) => {
                    setFirstName(e.currentTarget.value);
                  }}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={lastName}
                  id="lastName"
                  label="الإسم الأخير"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => {
                    setLastName(e.currentTarget.value);
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
                  لديك حساب في مارس؟ <a href="/student-sign-in">تسجيل الدخول</a>
                </span>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>

    </div>


  );
}