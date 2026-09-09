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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import ResponsiveAppBar from './components/Navbar';
// import BasicMenu from './components/Menu';
// import validator from 'validator';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import ButtonAppBar from './components/user_nav';
// import ButtonAppBarVendor from './components/vendor_nav';
// import ChipInput from 'material-ui-chip-input'
// import BasicCardUser from './components/u_menu_card';
import FavCard from './components/fav_card';
import backend_base_url from "./config";


const theme = createTheme();
export default function Favourites() {
    const navigate = useNavigate();

    const [current_user, setCurrentUser] = React.useState('');

    const [items, storeItems] = React.useState([]);

    const getUser = (event) => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/user/userdetails`, { headers: { "auth-token": token } })
            .then(res => {
                setCurrentUser(res.data.email);
                console.log(current_user);
            })
    }

    const checkFaves = (items_to_check) => {
        const array = [];
        function myFunction(item, index) {
            // console.log(item);
            const favs = item.favourites;
            // console.log(favs);
            const count_index = favs.indexOf(current_user);
            console.log(count_index);
            if (count_index > -1) {
                // console.log(count_index);
                const temp = array.push(item);
                storeItems(temp);
                // console.log(temp);
            }
        }
        items_to_check.forEach(myFunction);
        // console.log(array);
        // storeItems(array);
    }

    const getItems = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/item/favourites`, { headers: { "auth-token": token } })
            .then(res => {
                // const items_from_backend = res.data;
                // console.log(items_from_backend);
                // checkFaves(res.data);
                storeItems(res.data);
                // console.log(items);
                // checkPage()
            })
            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_user");
            })
    }

    const checkPage = (event) => {
        if (!(sessionStorage.getItem("token"))) {
            navigate("/signin_user");
        }
        // fetchBalance();
        // getUser();
        
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

                <ButtonAppBar />

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

                <FavCard
                    items={items}
                >

                </FavCard >

            </Container>


        </div>
    );
}