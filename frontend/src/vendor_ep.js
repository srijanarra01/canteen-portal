import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import MuiPhoneNumber from 'material-ui-phone-number';
import axios from "axios";
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';


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
// import ButtonAppBar from './components/user_nav';
import ButtonAppBarVendor from './components/vendor_nav';
import backend_base_url from "./config";
const theme = createTheme();
export default function VendorEditProfile() {
    const [manager_fname, setfname] = React.useState('');
    const [manager_lname, setlname] = React.useState('');
    // const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    // const [age, setAge] = React.useState(18);
    // const [user_batch, setBatch] = React.useState('UG1');
    // const [emailError, setEmailError] = React.useState('');
    const [contact_number, setContactNumber] = React.useState('');
    const [phError, setPhoneError] = React.useState('');
    const [shop_name, setShopName] = React.useState('');
    const [opth, setOpth] = React.useState(0);
    const [optm, setOptm] = React.useState(0);
    const [clth, setClth] = React.useState(0);
    const [cltm, setCltm] = React.useState(0);

    const navigate = useNavigate();

    const loadDetails = (event) => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/vendor/vendordetails`, { headers: { "auth-token": token } })
            .then(res => {
                setfname(res.data.manager_fname);
                setlname(res.data.manager_lname);
                // setPassword(res.data.password)
                setContactNumber(res.data.contact_number);
                setShopName(res.data.shop_name);
                setOpth(((res.data.opening_time) - ((res.data.opening_time) % 100)) / 100);
                setOptm(res.data.opening_time % 100);
                setClth(((res.data.closing_time) - ((res.data.closing_time) % 100)) / 100);
                setCltm(res.data.closing_time % 100);
            })
            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_user");
            })
    }

    const checkPage = (event) => {
        if (!(sessionStorage.getItem("token"))) {
            navigate("/signin_vendor");
        }
        loadDetails();
    }
    useEffect(() => {
        let ignore = false;

        if (!ignore) checkPage()
        return () => { ignore = true; }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem("token");

        axios
            .post(`${backend_base_url}/vendor/update`, {
                manager_fname: manager_fname,
                manager_lname: manager_lname,
                // email: email,
                password: password,
                contact_number: contact_number,
                shop_name: shop_name,
                opening_time: (opth * 100 + optm * 1),
                closing_time: (clth * 100 + cltm * 1)
            }, { headers: { "auth-token": token } })
            .then((res) =>
            // <MessagePopup open={true} severity="success" message="Signed Up successfully" /> 
            {
                alert("Details Edited Successfully. Please sign in with the new credentials")
                sessionStorage.removeItem("token");
                navigate("/signin_vendor");
                // callPopUp();
            }
            )
            .catch((err) => {
                navigate("/signin_vendor");
                if (err.response.status === 400) {
                    alert("Edit Unsuccessful. Please check the values provided. Make sure you have filled the password field with the new (old if change unnecessary) password.");
                }
                // callPopUp();
            }
                // <MessagePopup open={true} severity="error" message="Sign Up unsuccessful" /> 

            )
    };

    return (
        <div>
            <Container maxWidth="xl">

                {/* {checkPage} */}

                <ButtonAppBarVendor />

                <br></br>
                <br></br>
                <br></br>
            </Container>
            {/* <div align="center">
                <BasicMenu type="Buyer" />
            </div> */}
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
                        <EditTwoToneIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit Profile
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
                                        label="New First Name"
                                        value={manager_fname}
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
                                        label="New Last Name"
                                        name="lastName"
                                        value={manager_lname}
                                        onChange={(event) => { setlname(event.target.value) }}
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="New Password"
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
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        name="contact_number"
                                        label="New Contact Number"
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
                                        New Opening Time
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
                                        onChange={(event) => {
                                            event.target.value = (event.target.value < 0 || event.target.value > 23) ? (0) : event.target.value;
                                            setOpth(event.target.value);
                                        }
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
                                        onChange={(event) => {
                                            event.target.value = (event.target.value < 0 || event.target.value > 59) ? (0) : event.target.value;
                                            setOptm(event.target.value);
                                        }
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h5">
                                        New Closing Time
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
                                        onChange={(event) => {
                                            event.target.value = (event.target.value < 0 || event.target.value > 23) ? (0) : event.target.value;
                                            setClth(event.target.value);
                                        }
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
                                        onChange={(event) => {
                                            event.target.value = (event.target.value < 0 || event.target.value > 59) ? (0) : event.target.value;
                                            setCltm(event.target.value);
                                        }
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Update Details
                            </Button>

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