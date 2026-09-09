import * as React from 'react';
// import BasicCard from './components/card';
// import ResponsiveAppBar from './components/Navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '../node_modules/@mui/material/FormControlLabel';
// import Checkbox from '../node_modules/@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
// import ChipInput from 'material-ui-chip-input';
import TagsInput from './components/tags';
import FoodBankTwoToneIcon from '@mui/icons-material/FoodBankTwoTone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddonDialog from './components/addon';
import backend_base_url from "./config";



const theme = createTheme();
export default function VendorAddItem() {
    const navigate = useNavigate();

    const [item_name, setItemName] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [shop_name, setShopName] = React.useState('');
    const [veg, setVeg] = React.useState("veg");
    const [addon, setAddon] = React.useState([]);
    const [mychips, setChips] = React.useState([]);

    const handleAddonCallback = (addon_name, addon_price) => {

        console.log("reach: " + addon_name, addon_price);
        addon.push([addon_name, addon_price]);
        console.log(addon);

    }

    const getShop = (event) => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/vendor/vendordetails`, { headers: { "auth-token": token } })
            .then(res => {
                setShopName(res.data.shop_name);
                console.log(shop_name);
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem("token");
        console.log(token);

        // axios
        // .get(`${backend_base_url}/vendor/vendordetails`, { headers: { "auth-token": token } })


        axios
            .post(`${backend_base_url}/item/register`, {
                shop_name: shop_name,
                item_name: item_name,
                price: price,
                veg: veg,
                tags: mychips,
                addons: addon
            }, { headers: { "auth-token": token } })
            .then((res) => {
                alert("Item has been registered successfully");
                navigate("/vendor_orders");
                // callPopUp();
            }
            )
            .catch((err) => {
                navigate("/signin_vendor");
                // if (err.response.status === 400) {
                alert("Item registration unsuccessful. Please check the values provided and also make sure you're signed in");
                // }
                // callPopUp();
            }
                // <MessagePopup open={true} severity="error" message="Sign Up unsuccessful" /> 

            )

            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_vendor");
            })



    }

    function handleSelecetedTags(items) {
        setChips(items);
        // console.log(mychips);
    }

    const checkPage = (event) => {
        if (!(sessionStorage.getItem("token"))) {
            navigate("/signin_vendor");
        }
        getShop();
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

                <ButtonAppBarVendor />

                <br></br>
                <br></br>
                <br></br>
            </Container>

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
                            <FoodBankTwoToneIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add Item
                        </Typography>
                        {/* <MessagePopup /> */}
                        <Box  sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12} >
                                    <TextField
                                        autoComplete="given-name"
                                        name="shop_name"
                                        type="string"
                                        required
                                        fullWidth
                                        id="shop_name"
                                        label="Shop Name"
                                        value={shop_name}
                                        onChange={(event) => { setShopName(event.target.value) }}
                                        autoFocus
                                        onSubmit={e => { e.preventDefault(); }}
                                    />
                                </Grid> */}
                                <Grid item xs={12} >
                                    <TextField
                                        autoComplete="given-name"
                                        name="item_name"
                                        type="string"
                                        required
                                        fullWidth
                                        id="item_name"
                                        label="Item Name"
                                        value={item_name}
                                        onChange={(event) => { setItemName(event.target.value) }}
                                        onSubmit={e => { e.preventDefault(); }}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="price"
                                        label="Price"
                                        type="number"
                                        id="price"
                                        value={price}
                                        autoComplete="price"
                                        onChange={(event) => {
                                            event.target.value = event.target.value < 0 ? (0) : event.target.value;
                                            setPrice(event.target.value)
                                        }
                                        }
                                        onSubmit={e => { e.preventDefault(); }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    {/* <UGMenu /> */}
                                    <FormControl sx={{ minWidth: 120 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Veg/Non-Veg</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={veg}
                                            label="Veg/Non-Veg"
                                            required
                                            fullWidth
                                            onChange={(event) => {
                                                setVeg(event.target.value);
                                            }}
                                        >
                                            <MenuItem value="veg">Veg</MenuItem>
                                            <MenuItem value="nonveg">Non-Veg</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Grid>

                                <Grid item xs={12}>
                                    <TagsInput
                                        selectedTags={handleSelecetedTags}
                                        fullWidth
                                        variant="outlined"
                                        id="tags"
                                        name="tags"
                                        placeholder="Type and Press Enter to create tag"
                                        label="tags"
                                    // onSubmit={e => { e.preventDefault(); }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <AddonDialog
                                        func={handleAddonCallback} />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                                onSubmit={e => { e.preventDefault(); }}
                            >
                                Add Item
                            </Button>
                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>



            <br></br>
            <br></br>
            <br></br>

        </div>
    );
}