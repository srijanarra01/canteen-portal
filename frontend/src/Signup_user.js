import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import MuiPhoneNumber from 'material-ui-phone-number';
import axios from "axios";
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
// import {
//     BrowserRouter,
//     Switch,
//     Route,
//     Redirect,
// } from "react-router-dom";

// import NavBar from './components/Navbar';
// import SignIn from './SignIn_user';
// import ResponsiveAppBar from './components/Navbar';
import BasicMenu from './components/Menu';
import backend_base_url from "./config";
const theme = createTheme();
export default function SignUpUser() {
    const [fname, setfname] = React.useState('');
    const [lname, setlname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [age, setAge] = React.useState(18);
    const [user_batch, setBatch] = React.useState('UG1');
    const [emailError, setEmailError] = React.useState('');
    const [contact_number, setContactNumber] = React.useState('');
    const [phError, setPhoneError] = React.useState('');

    const navigate = useNavigate();
    // const [wallet_balance, setWallet] = React.useState(0)

    // function handlePhChange(event) {
    //     setContactNumber(
    //         event.target.value
    //     );
    // }

    // const callPopUp = (event) => {
    //     <MessagePopup open={true} severity="success" message="Signed Up successfully" />
    // }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${backend_base_url}/user/register`, {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                contact_number: contact_number,
                age: age,
                batch: user_batch,
                wallet_balance: 0
            })
            .then((res) =>
            {
                alert("Sign Up Successful. You will now be directed to the login page.")
                navigate("/signin_user");
                // callPopUp();
            }
            )
            .catch((err) => {
                navigate("/signup_user");
                if (err.response.status === 400) {
                    alert("Sign Up Unsuccessful. Please check the values provided and also make sure you're not already signed up");
                }
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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        {/* <MessagePopup /> */}
                        <Box  sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        type="string"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        value={fname}
                                        onChange={(event) => { setfname(event.target.value) }}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        type="string"
                                        label="Last Name"
                                        name="lastName"
                                        value={lname}
                                        onChange={(event) => { setlname(event.target.value) }}
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <ValidEmail 
                                    value={email}
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    /> */}
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
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        name="contact_number"
                                        label="Contact Number"
                                        // type="number"
                                        id="contact_number"
                                        value={contact_number}
                                        autoComplete="contact-number"
                                        helperText={phError}
                                        onChange={(event) => {
                                            setContactNumber(event.target.value);
                                            // if(event.target.value.match("[a-z0-9]+@[a-z].[a-z]") != null){
                                            //     this.setEmail(event.target.value);
                                            // }
                                            if (validator.isMobilePhone(event.target.value)) {
                                                setPhoneError('Valid Phone Number :)')
                                            } else {
                                                setPhoneError('Enter valid Phone Number !')
                                            }
                                        }
                                        }
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <MuiPhoneNumber
                                        required defaultCountry={'in'}
                                        autoComplete='phone-number'
                                        value={contact_number}
                                        onChange={(event) => { setContactNumber(event.target) }}
                                    />
                                </Grid> */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="age"
                                        label="Age"
                                        type="number"
                                        id="age"
                                        value={age}
                                        autoComplete="age"
                                        onChange={(event) => {
                                            event.target.value = event.target.value < 0 ? (0) : event.target.value;
                                            setAge(event.target.value)
                                        }
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* <UGMenu /> */}
                                    <FormControl sx={{ minWidth: 120 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={user_batch}
                                            label="Batch"
                                            required
                                            fullWidth
                                            onChange={(event) => {
                                                setBatch(event.target.value);
                                            }}
                                        >
                                            <MenuItem value="UG1">UG1</MenuItem>
                                            <MenuItem value="UG2">UG2</MenuItem>
                                            <MenuItem value="UG3">UG3</MenuItem>
                                            <MenuItem value="UG4">UG4</MenuItem>
                                            <MenuItem value="UG5">UG5</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>
                                {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin_user" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </Container>
                {/* <MessagePopup /> */}
            </ThemeProvider>
            <br></br>
            <br></br>
            <br></br>


        </div>
    );
}