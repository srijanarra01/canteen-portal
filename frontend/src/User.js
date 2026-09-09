import * as React from 'react';
// import BasicCard from './components/card';
// import ResponsiveAppBar from './components/Navbar';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '../node_modules/@mui/material/FormControlLabel';
// import Checkbox from '../node_modules/@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ResponsiveAppBar from './components/Navbar';
// import BasicMenu from './components/Menu';
// import validator from 'validator';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import ButtonAppBar from './components/user_nav';
import backend_base_url from "./config";
// import FormDialog from './components/wallet_dialog';
// import WalletFormDialog from './components/wallet_dialog';

const theme = createTheme();
export default function UserDashboard() {
    const navigate = useNavigate();

    const [wallet_balance, setWalletBalance] = React.useState(0);

    const fetchBalance = (event) => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/user/userdetails`, { headers: { "auth-token": token } })
            .then(res => {
                setWalletBalance(res.data.wallet_balance);
                // console.log(res.data);
                // console.log({wallet_balance});
            })
            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_user");
            })
    }

    // const handleWallet = (event) => {
    //     let amount = prompt("Please enter the amount you want to add to your wallet:");
    //     if (amount === null || amount === "") {
    //         amount = 0;
    //     }
    //     amount = amount * 1;
    //     const token = sessionStorage.getItem("token");
    //     axios
    //         .post(`${backend_base_url}/user/addmoney`, {
    //             money_to_add: amount
    //         }, { headers: { "auth-token": token } })
    //         .then(res => {
    //             alert("Balance Update Authorised");
    //             fetchBalance();
    //         })
    //         .catch(err => {
    //             alert(err + ". Session Timed out");
    //             navigate("/signin_user");

    //         })

    // }

    const checkPage = (event) => {
        if (!(sessionStorage.getItem("token"))) {
            navigate("/signin_user");
        }
        fetchBalance();
    }
    useEffect(() => {
        let ignore = false;

        if (!ignore) checkPage()
        return () => { ignore = true; }
    }, []);

    return (
        // <Box>
        // <ResponsiveAppBar />
        // <BasicCard />
        // </Box>
        <div>

            <Container maxWidth="xl">

                {/* {checkPage} */}

                <ButtonAppBar />

                <br></br>
                <br></br>
                <br></br>
            </Container>


            {/* <Container style={{
                display: 'flex',
                flexDirection: 'column',
                // alignContent: 'flex-end',
                // direction: 'rtl'
            }}>
                <Typography
                    component="h1"
                    variant="h6"
                    style={{
                        flex: 1
                    }}>
                    Wallet Balance : Rs. {wallet_balance}
                </Typography>

                <Box
                    component="h1"
                    variant="h6"
                    style={{
                        flex: 1
                    }}
                >
                    <WalletFormDialog
                        func={fetchBalance}
                    />
                </Box>

            </Container > */}


            {/* <div align="center">
                <BasicMenu type="Buyer" />
            </div> */}

            <br></br>
            <br></br>
            <br></br>

        </div>
    );
}