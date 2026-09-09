import * as React from 'react';
// import BasicCard from './components/card';
// import ResponsiveAppBar from './components/Navbar';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
// import ButtonAppBarVendor from './components/vendor_nav';
// import ChipInput from 'material-ui-chip-input'
import BasicCardUser from './components/u_menu_card';
// import ButtonAppBarUserMenu from './components/u_nav_menu';
import ButtonAppBar from './components/user_nav';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Select } from '@mui/material';
import backend_base_url from "./config";
// import { minWidth, typography } from '@mui/system';



const theme = createTheme();
export default function UserMenu() {
    const navigate = useNavigate();

    const [items, storeItems] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [shops, storeShops] = React.useState([]);
    const [wanted_shops, setWantedShops] = React.useState([]);

    const [tags, setTags] = React.useState([]);
    const [wanted_tags, setWantedTags] = React.useState([]);

    const [veg_array, setVegArray] = React.useState([]);
    const [search_text, setSearchText] = React.useState('');
    const [lprice, setLPrice] = React.useState(0);
    const [hprice, setHPrice] = React.useState(5000);
    const [sort_by , setSortBy] = React.useState("price");
    const [sort_order, setSortOrder] = React.useState(1);
    // const [sort_order_rating, setSortOrderRating] = React.useState(-1);

    const getTags = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/item`, { headers: { "auth-token": token } })
            .then(res => {
                const dup_tags = [];

                function mytwoF(item, index) {
                    dup_tags.push(item)
                }

                function myFunction(item, index) {
                    (item.tags).forEach(mytwoF)
                }
                // setCurrentUser(res.data.email);
                (res.data).forEach(myFunction);

                const temp = [...new Set(dup_tags)];
                console.log(temp);
                setTags(temp);
            })
    }

    const getShops = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/vendor`, { headers: { "auth-token": token } })
            .then(res => {
                const dup_shops = [];
                function myFunction(item, index) {
                    dup_shops.push(item.shop_name);
                }
                // setCurrentUser(res.data.email);
                (res.data).forEach(myFunction);


                const temp = [...new Set(dup_shops)];
                console.log(temp);
                storeShops(temp);
                // console.log(shops);
            })
    }

    const getItems = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/item`, { headers: { "auth-token": token } })
            .then(res => {
                // const items_from_backend = res.data;
                // console.log(items_from_backend);
                storeItems(res.data);
                console.log(items);
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
        getItems();
        getShops();
        getTags();
        // fetchBalance();
    }
    useEffect(() => {

        let ignore = false;

        if (!ignore) checkPage()
        return () => { ignore = true; }
    }, []);

    const handleFilter = (event) => {
        setOpen(true);
    }

    const handleOutClose = (event) => {
        setOpen(false);

        setVegArray([]);
        setWantedShops([]);
        setWantedTags([]);
    }

    const handleApply = () => {
        setOpen(false);

        console.log(veg_array);

        const token = sessionStorage.getItem("token");
        axios
            .post(`${backend_base_url}/item/filters`, {
                veg: veg_array,
                shops: wanted_shops,
                tags: wanted_tags,
                lprice: lprice,
                hprice: hprice,
                which_sort: sort_order,
                sort_by: sort_by
            }, { headers: { "auth-token": token } })
            .then((res) => {
                // alert("Item has been updated successfully");
                // window.location.reload();
                storeItems(res.data);
                console.log(res.data);
                setVegArray([]);
                setWantedShops([]);
                setWantedTags([]);
                // toggleReload(!reload_req);
                // window.location.reload();
                // navigate("/vendor_dashboard");
                // callPopUp();
            }
            )
            .catch((err) => {
                navigate("/signin_user");
                // if (err.response.status === 400) {
                alert("Item search unsuccessful. Please check the values provided and also make sure you're signed in");
                // }
                // callPopUp();
            })



    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        handleSearch(event.target.value);
    }

    const handleVegChange = (event) => {
        const index = veg_array.indexOf('veg');
        if (index > -1) {
            veg_array.splice(index, 1);
        }
        else {
            veg_array.push('veg');
        }
    }

    const handleNonVegChange = (event) => {
        const index = veg_array.indexOf('nonveg');
        if (index > -1) {
            veg_array.splice(index, 1);
        }
        else {
            veg_array.push('nonveg');
        }
    }

    const handleLPriceChange = (event) => {
        event.target.value = event.target.value < 0 ? (0) : event.target.value;
        setLPrice(event.target.value);
    }

    const handleHPriceChange = (event) => {
        event.target.value = event.target.value < 0 ? (0) : event.target.value;
        setHPrice(event.target.value);
    }

    const handleShopCheckboxChange = (event, shop) => {

        const index = wanted_shops.indexOf(shop);
        if (index > -1) {
            wanted_shops.splice(index, 1);
            // }
            console.log(wanted_shops);
        }
        else {
            wanted_shops.push(shop);
            console.log(wanted_shops);
        }
    };

    const displayShops = (shops) => {
        // const addons = item.addons;
        // console.log(addons);
        if (shops.length > 0) {
            return (
                shops.map((shop, index) => {
                    // const disp = addon[0] + ", Rs " + addon[1];
                    // order_addons.push(addon);
                    return (
                        <FormControlLabel control={<Checkbox onChange={(event) => { handleShopCheckboxChange(event, shop) }} />} label={shop} />
                    )

                })
            )

        }
        else {
            return (
                <h6>No Shops</h6>
            )
        }
    }

    const handleTagsCheckboxChange = (event, tag) => {

        const index = wanted_tags.indexOf(tag);
        if (index > -1) {
            wanted_tags.splice(index, 1);
            // }
            console.log(wanted_tags);
        }
        else {
            wanted_tags.push(tag);
            console.log(wanted_tags);
        }
    };

    const displayTags = (tags) => {
        // const addons = item.addons;
        // console.log(addons);
        if (tags.length > 0) {
            return (
                tags.map((tag, index) => {
                    // const disp = addon[0] + ", Rs " + addon[1];
                    // order_addons.push(addon);
                    return (
                        <FormControlLabel control={<Checkbox onChange={(event) => { handleTagsCheckboxChange(event, tag) }} />} label={tag} />
                    )

                })
            )

        }
        else {
            return (
                <h6>No Tags</h6>
            )
        }
    }

    const handleSearch = (search_text) => {
        const token = sessionStorage.getItem("token");
        axios
            .post(`${backend_base_url}/item/search`, {
                search_text: search_text
            }, { headers: { "auth-token": token } })
            .then((res) => {
                // alert("Item has been updated successfully");
                // window.location.reload();
                storeItems(res.data);
                // toggleReload(!reload_req);
                // window.location.reload();
                // navigate("/vendor_dashboard");
                // callPopUp();
            }
            )
            .catch((err) => {
                navigate("/signin_user");
                // if (err.response.status === 400) {
                alert("Item search unsuccessful. Please check the values provided and also make sure you're signed in");
                // }
                // callPopUp();
            })
    }

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

            <Container align='center' style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TextField
                    autoFocus
                    // margin="dense"
                    id="search"
                    label="Search"
                    type="string"
                    align='center'
                    // variant="outlined"
                    // min="0"
                    onChange={handleSearchChange}
                    // onkeyup="if(this.value<0){this.value= this.value * -1}"
                    value={search_text}
                // fullWidth
                />

                <Button size='small' onClick={() => handleSearch(search_text)} variant="outlined" sx={{ maxWidth: 100 }} >Search</Button>
            </Container>



            <br /><br /><br />

            <Container align='center'>
                <Button onClick={handleFilter} variant="outlined" >Apply Filters</Button>
                <Button onClick={() => window.location.reload()} variant="outlined" >Remove Filters</Button>
                <br /><br /><br /><br />
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
                
                <BasicCardUser
                    items={items}
                >

                </BasicCardUser >

            </Container>

            <Dialog open={open} onClose={handleOutClose}>
                <DialogTitle>Filter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select appropriate fields
                    </DialogContentText>


                    <br /><br /><br />
                    <Container style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Container style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <FormControlLabel control={<Checkbox onChange={(event) => handleVegChange(event)} />} label="Veg" />
                            <FormControlLabel control={<Checkbox onChange={(event) => handleNonVegChange(event)} />} label="Non-Veg" />
                        </Container>

                        <Container style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography fontSize={14} >Price Range</Typography>
                            <br />
                            <Container style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <TextField
                                    sx={{ minWidth: 150 }}
                                    id="lprice"
                                    label="Min Price"
                                    type="number"
                                    onChange={handleLPriceChange}
                                    value={lprice}
                                /> <br />
                                <TextField
                                    sx={{ minWidth: 150 }}
                                    id="hprice"
                                    label="Max Price"
                                    type="number"
                                    onChange={handleHPriceChange}
                                    value={hprice}
                                />
                            </Container>
                        </Container>

                    </Container>

                    <br /><br /><br />

                    <FormControl sx={{ minWidth: 120 }} fullWidth>
                        <InputLabel id="sort">Sort by </InputLabel>
                        <Select
                            labelId="sort"
                            id="sort"
                            value={sort_by}
                            label="Sort by"
                            // required
                            // fullWidth
                            onChange={(event) => {
                                setSortBy(event.target.value);
                            }}
                        >
                            <MenuItem value="price">Price</MenuItem>
                            <MenuItem value="rating">Rating</MenuItem>
                        </Select>
                    </FormControl>
                    <br></br><br></br><br></br>

                    <FormControl sx={{ minWidth: 120 }} fullWidth>
                        <InputLabel id="sort">Sort </InputLabel>
                        <Select
                            labelId="sort"
                            id="sort"
                            value={sort_order}
                            label="Sort "
                            // required
                            // fullWidth
                            onChange={(event) => {
                                setSortOrder(event.target.value);
                            }}
                        >
                            <MenuItem value={1}>Ascending</MenuItem>
                            <MenuItem value={-1}>Descending</MenuItem>
                        </Select>
                    </FormControl>
                    <br></br><br></br><br></br>
                    {/* <FormControl sx={{ minWidth: 120 }} fullWidth>
                        <InputLabel id="sort">Sort by Rating</InputLabel>
                        <Select
                            labelId="sort"
                            id="sort"
                            value={sort_order_rating}
                            label="Sort by Rating"
                            // required
                            // fullWidth
                            onChange={(event) => {
                                setSortOrderRating(event.target.value);
                            }}
                        >
                            <MenuItem value={1}>Ascending</MenuItem>
                            <MenuItem value={-1}>Descending</MenuItem>
                        </Select>
                    </FormControl>
                    <br></br><br></br><br></br> */}

                    <Container style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Container style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography fontSize={14} >Shops</Typography>
                            {displayShops(shops)}
                        </Container>

                        <Container style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Typography fontSize={14} >Tags</Typography>
                            {displayTags(tags)}
                        </Container>
                    </Container>






                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOutClose}>Cancel</Button>
                    <Button onClick={handleApply}>Apply</Button>
                </DialogActions>
            </Dialog>


        </div>
    );
}