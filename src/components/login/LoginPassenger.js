import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate, Redirect } from 'react-router-dom'
import { Formik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { CometChat } from '@cometchat-pro/chat';



const theme = createTheme();

export default function LoginPassenger() {

  const [formData, setformData] = React.useState()
  const [err, setErr] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false);


  async function auth() {
    try {
      const response = await axios.post('passager/auth', formData);
      console.log(response);
      localStorage.setItem('idp', JSON.stringify({ "id": response.data.id }))
      window.location.replace("/")
    } catch (error) {
      if (error.response.status == 400) {
        auth()
      }
      console.error(error);
    }
  }

  const validationSchema = yup.object({

    email: yup.string()
      .required('Obligatoire')
      .email('Invalid email'),
    password: yup.string()
      .required('Obligatoire')

  })

  return (
    <ThemeProvider theme={theme}>


      <Container style={{ backgroundColor: 'white' }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primery.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login PASSENGER
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setErr(false)
              setLoading(true)

              setformData({
                email: values.email,
                password: values.password,
              });
              axios.post('passager/auth', {
                email: values.email,
                password: values.password,
              })
                .then(response => {
                  console.log(response)
                  localStorage.setItem('idp', JSON.stringify(response.data.id))
                  const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
                  const uid = String(response.data.id) + 'p'

                  CometChat.login(uid, authKey).then(
                    user => {
                      console.log("User logged in successfully", { user });
                      setLoading(false)
                      window.location.replace("/")
                    },
                    error => {
                      setErr(true)
                      console.log("Login ailed", { error });
                    }
                  )

                })
                .catch(error => {
                  console.error(error)
                  setErr(true)
                })
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit} >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={props.values.email}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  error={props.touched.email && Boolean(props.errors.email)}
                  helperText={props.touched.email && props.errors.email}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={props.values.password}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  error={props.touched.password && Boolean(props.errors.password)}
                  helperText={props.touched.password && props.errors.password}
                  autoComplete="current-password"
                />
                {(err) ? (

                  <Typography color={'red'}> Email or Phone Exist!!</Typography>

                ) : ('')}

                <>
                  {(isLoading) ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  )}
                </>
                <Grid container>

                  <Grid item>
                    <Link to="/signUpPassenger">
                      {"Don't have an account?    Sign Up"}
                    </Link>
                  </Grid>
                  <Grid item style={{ marginBottom: '50px', marginTop: '20px' }}>
                    <Link style={{ textDecoration: 'none', color: '#3FCEA8' }} to="/loginDriver">
                      <Typography variant='button'>                      {"Are you a Driver?    Login"}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>

      </Container>
    </ThemeProvider >
  );
}
