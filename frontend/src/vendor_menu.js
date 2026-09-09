import * as React from 'react';
import BasicCard from './components/card';
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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ResponsiveAppBar from './components/Navbar';
// import BasicMenu from './components/Menu';
// import validator from 'validator';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
// import ButtonAppBar from './components/user_nav';
import ButtonAppBarVendor from './components/vendor_nav';
import backend_base_url from "./config";
// import ChipInput from 'material-ui-chip-input'


const theme = createTheme();
export default function VendorMenu() {
    const navigate = useNavigate();

    const [items, storeItems] = React.useState('');

    const getItems = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/item/shop_items`, { headers: { "auth-token": token } })
            .then(res => {
                // const items_from_backend = res.data;
                // console.log(items_from_backend);
                storeItems(res.data);
                console.log(items);
                // checkPage()
            })
            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_vendor");
            })
    }

    const checkPage = (event) => {
        if (!(sessionStorage.getItem("token"))) {
            navigate("/signin_vendor");
        }
        // window.location.reload();
        // fetchBalance();
    }
    useEffect(() => {
        getItems();
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

                <ButtonAppBarVendor />

                <br></br>
                <br></br>
                <br></br>
            </Container>

            <Container style={{
                display: 'flex',
                flexDirection: 'column',
                // alignContent: 'flex-end',
                // direction: 'rtl'
            }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    style={{
                        flex: 1
                    }}>
                    Items Menu
                </Typography>

                <BasicCard
                items={items}
                >

                </BasicCard>

            </Container>


        </div>
    );
}