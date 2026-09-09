import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '../node_modules/@mui/material/FormControlLabel';
// import Checkbox from '../node_modules/@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ResponsiveAppBar from './components/Navbar';
import BasicMenu from './components/Menu';
import validator from 'validator';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import backend_base_url from "./config";

const theme = createTheme();
export default function SignInUser() {

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      // email: data.get('email'),
      // password: data.get('password'),
    });

    axios
      .post(`${backend_base_url}/user_auth`, {
        // fname: fname,
        // lname: lname,
        email: email,
        password: password,
        // contact_number: contact_number,
        // age: age,
        // batch: user_batch,
        // wallet_balance: 0
      })
      .then((res) =>
      // <MessagePopup open={true} severity="success" message="Signed Up successfully" /> 
      {
        alert("Sign In Successful.");
        // console.log(res.data.token);
        // console.log(res.data.user.email);
        sessionStorage.setItem("token", res.data.token);
        console.log(sessionStorage.getItem("token"));
        // sessionStorage.
        navigate("/user_dashboard");
        // callPopUp();
      }
      )
      .catch((err) => {
        // navigate("/signup_user");
        // if (err.response.status === 400) {
        sessionStorage.removeItem("token");
        alert("Sign In Unsuccessful. Please check the values provided.");
        // }
        // callPopUp();
      }
        // <MessagePopup open={true} severity="error" message="Sign Up unsuccessful" /> 

      )
  };

  return (
    <div>
      <div>
        {/* <ResponsiveAppBar /> */}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div align="center">
        <BasicMenu type="Buyer" />
      </div>
      <ThemeProvider theme={theme}>
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LoginTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box  sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={email}
                    helperText={emailError}
                    onChange={
                      (event) => {
                        setEmail(event.target.value);
                        // if(event.target.value.match("[a-z0-9]+@[a-z].[a-z]") != null){
                        //     this.setEmail(event.target.value);
                        // }
                        if (validator.isEmail(event.target.value)) {
                          setEmailError('Valid Email :)')
                        } else {
                          setEmailError('Enter valid Email !')
                        }


                      }
                    }
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                    autoComplete="new-password"
                  />
                </Grid>
                {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid container>

                  <Grid item>
                    <Link href="/signup_user" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}