import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
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
// import ValidEmail from './components/valid_email';
// import MuiPhoneNumber from 'material-ui-phone-number';
// import BasicTimePicker from './components/timepicker';

const theme = createTheme();
export default function SignUpVendor() {

    const [fname, setfname] = React.useState('');
    const [lname, setlname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [contact_number, setContactNumber] = React.useState('');
    const [phError, setPhoneError] = React.useState('');
    const [shop_name, setShopName] = React.useState('');
    const [opth, setOpth] = React.useState(0);
    const [optm, setOptm] = React.useState(0);
    const [clth, setClth] = React.useState(0);
    const [cltm, setCltm] = React.useState(0);

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        // console.log({
        //     manager_fname: fname,
        //         manager_lname: lname,
        //         email: email,
        //         password: password,
        //         contact_number: contact_number,
        //         shop_name: shop_name,
        //         opening_time: (opth*100 + optm*1),
        //         closing_time: (clth*100 + cltm*1)
        // });

        axios
            .post(`${backend_base_url}/vendor/register`, {
                manager_fname: fname,
                manager_lname: lname,
                email: email,
                password: password,
                contact_number: contact_number,
                shop_name: shop_name,
                opening_time: (opth*100 + optm*1),
                closing_time: (clth*100 + cltm*1)
            })
            .then((res) =>
            // <MessagePopup open={true} severity="success" message="Signed Up successfully" /> 
            {
                alert("Sign Up Successful. You will now be directed to the login page.")
                navigate("/signin_vendor");
                // callPopUp();
            }
            )
            .catch((err) => {
                navigate("/signup_vendor");
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
                <BasicMenu type="Vendor" />
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
                        <Box   sx={{ mt: 3 }}>
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
                                        label="Last Name"
                                        name="lastName"
                                        value={lname}
                                        onChange={(event) => { setlname(event.target.value) }}
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <ValidEmail /> */}
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
                                        autoComplete="shop-name"
                                        name="shopName"
                                        required
                                        fullWidth
                                        id="shopName"
                                        value={shop_name}
                                        onChange={(event) => { setShopName(event.target.value) }}
                                        label="Shop Name"

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <MuiPhoneNumber required defaultCountry={'in'} autoComplete='phone-number' /> */}
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
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h5">
                                        Opening Time
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="opening_time_hours"
                                        label="Opening Time Hours"
                                        type="number"
                                        id="opening_time_hours"
                                        value={opth}
                                        autoComplete="hours"
                                        onChange={(event) =>
                                            {event.target.value = (event.target.value < 0 || event.target.value > 23) ? (0) : event.target.value;
                                            setOpth(event.target.value);}
                                            // (event.target.value < 0 || event.target.value > 23)
                                            //     ? (event.target.value = 0)
                                            //     : event.target.value
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="opening_time_minutes"
                                        label="Opening Time Minutes"
                                        type="number"
                                        id="opening_time_minutes"
                                        autoComplete="minutes"
                                        value={optm}
                                        onChange={(event) =>
                                            {event.target.value = (event.target.value < 0 || event.target.value > 59) ? (0) : event.target.value;
                                                setOptm(event.target.value);}
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h5">
                                        Closing Time
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="closing_time_hours"
                                        label="Closing Time Hours"
                                        type="number"
                                        id="closing_time_hours"
                                        autoComplete="hours"
                                        value={clth}
                                        onChange={(event) =>
                                            {event.target.value = (event.target.value < 0 || event.target.value > 23) ? (0) : event.target.value;
                                                setClth(event.target.value);}
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="closing_time_minutes"
                                        label="Closing Time Minutes"
                                        type="number"
                                        id="closing_time_minutes"
                                        autoComplete="minutes"
                                        value={cltm}
                                        onChange={(event) =>
                                            {event.target.value = (event.target.value < 0 || event.target.value > 59) ? (0) : event.target.value;
                                                setCltm(event.target.value);}
                                        }
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <BasicTimePicker />
                                </Grid> */}
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
                                    <Link href="/signin_vendor" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </Container>
            </ThemeProvider>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}