import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from "axios";
import { useEffect } from 'react';
// import ButtonAppBar from './user_nav';
import WalletFormDialog from './wallet_dialog';

import { createTheme, ThemeProvider } from '@mui/material/styles';

// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import backend_base_url from "../config";

const theme = createTheme();
export default function ButtonAppBar() {
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

    const handleFavourites = (event) => {
        navigate("/favourites");
    }

    const handleOrders = (event) => {
        navigate("/user_orders");
    }

    const handleGoWallet = (event) => {
        navigate("/user_dashboard");
    }

    const handleMenu = (event) => {
        navigate("/user_menu");
    }

    const handleProfile = (event) => {
        navigate("/user_editprofile")
    }

    const handleLogout = (event) => {

        sessionStorage.removeItem("token");
        navigate("/signin_user");
        alert("Logged out succesfully");

    }

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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Navigate
                    </Typography>
                    <Button color="inherit" onClick={handleGoWallet}>Wallet</Button>
                    <Button color="inherit" onClick={handleFavourites}>Favourites</Button>
                    <Button color="inherit" onClick={handleOrders}>Orders</Button>                    
                    <Button color="inherit" onClick={handleMenu}>Menu</Button>
                    <Button color="inherit" onClick={handleProfile}>Edit Profile</Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Container>
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

            </Container>
        </Box>
    );
}