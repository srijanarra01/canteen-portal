import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { TextField } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import backend_base_url from "../config";
// import { typography } from '@mui/system';

export default function BasicCardUser(props) {
    const navigate = useNavigate();

    // console.log(props.items);

    // const [reload_req, toggleReload] = React.useState(false);

    const [quantity, setQuantity] = React.useState(1);
    const [order_addons, setOrderAddons] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [dialog_item, setDialogItem] = React.useState({
        addons: ""
    });
    const [current_user, setCurrentUser] = React.useState('');

    const getUser = (event) => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/user/userdetails`, { headers: { "auth-token": token } })
            .then(res => {
                setCurrentUser(res.data.email);
                console.log(current_user);
            })
    }
    const checkPage = (event) => {
        if (!(sessionStorage.getItem("token"))) {
            navigate("/signin_user");
        }
        // fetchBalance();
        getUser();
    }
    useEffect(() => {
        let ignore = false;

        if (!ignore) checkPage()
        return () => { ignore = true; }
    }, []);

    // const [checked, setChecked] = React.useState(false);

    const handleCheckboxChange = (event, addon) => {
        // setChecked(event.target.checked);
        // if (event.target.checked === true) {
        //     order_addons.push(addon);
        //     console.log(order_addons);
        // }
        // else {
        const index = order_addons.indexOf(addon);
        if (index > -1) {
            order_addons.splice(index, 1);
            // }
            console.log(order_addons);
        }
        else {
            order_addons.push(addon);
            console.log(order_addons);
        }
    };

    const handleSubmit = (item) => {
        setOpen(false);
        const token = sessionStorage.getItem("token");
        var tot_cost = (item.price) * (quantity);

        function myFunc(value, index, array) {
            tot_cost += (value[1]) * 1;
        }
        order_addons.forEach(myFunc);

        var currentdate = new Date();
        var datetime = "Ordered On: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        axios
            .post(`${backend_base_url}/order/register`, {
                shop_name: item.shop_name,
                item_name: item.item_name,
                cost: tot_cost,
                placed_time: datetime,
                quantity: quantity,
                status: "placed",
                rating: item.rating,
                veg: item.veg,
                tags: item.tags,
                addons: order_addons
            }, { headers: { "auth-token": token } })
            .then((res) => {
                alert("Item has been ordered successfully");
                window.location.reload();
                // navigate("/vendor_dashboard");
                // callPopUp();
            }
            )
            .catch((err) => {
                // navigate("/signin_user");
                // if (err.response.status === 400) {
                alert("Item order unsuccessful. Please check your wallet balance and also make sure you're signed in");
                // }
                // callPopUp();
            })



        // setChecked(false);
        setOrderAddons([]);
    }

    const handleClose = () => {
        setOpen(false);
        // setChecked(false);
        setOrderAddons([]);
    }


    const display_cards = (props) => {
        const items = props.items;

        const display_tags = (item) => {
            const tags = item.tags;
            // console.log(tags);

            if (tags.length > 0) {
                return (
                    tags.map((tag, index) => {
                        return (
                            <Chip label={tag}></Chip>
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

        const display_veg = (item) => {
            const veg = item.veg;
            // console.log(veg);
            if (veg.length > 0) {
                var lab = "Veg";
                var col = "success";
                if (veg === "veg") {
                    lab = "Veg";
                    col = "success";
                    // return (
                    //     <Chip label="Veg" color="success"></Chip>
                    // )
                }
                else {
                    lab = "Non-Veg";
                    col = "error";
                    // return (
                    //     <Chip label="Non-Veg" color="error"></Chip>
                    // )
                }

                return (
                    <Chip label={lab} color={col} ></Chip>
                )

            }
            else {
                return (
                    <>error</>
                )
            }
        }

        const display_addons = (item) => {
            const addons = item.addons;
            // console.log(addons);
            if (addons.length > 0) {
                return (
                    addons.map((addon, index) => {
                        const disp = addon[0] + ", Rs " + addon[1];
                        // order_addons.push(addon);
                        return (
                            <FormControlLabel control={<Checkbox onChange={(event) => { handleCheckboxChange(event, addon) }} />} label={disp} />
                        )

                    })
                )

            }
            else {
                return (
                    <h6>No Addons</h6>
                )
            }
        }

        const updateFavs = (item, favs) => {
            const token = sessionStorage.getItem("token");
            axios
                .post(`${backend_base_url}/item/update_item_forfav`, {
                    item_name: item.item_name,
                    shop_name: item.shop_name,
                    favourites: favs
                }, { headers: { "auth-token": token } })
                .then((res) => {
                    // alert("Item has been updated successfully");
                    window.location.reload();
                    // toggleReload(!reload_req);
                    // window.location.reload();
                    // navigate("/vendor_dashboard");
                    // callPopUp();
                }
                )
                .catch((err) => {
                    navigate("/signin_vendor");
                    // if (err.response.status === 400) {
                    alert("Item update unsuccessful. Please check the values provided and also make sure you're signed in");
                    // }
                    // callPopUp();
                })
        }

        const removeFav = (item) => {
            const favs = item.favourites;
            const index = favs.indexOf(current_user);
            if (index > -1) {
                favs.splice(index, 1);
                console.log(favs);
                updateFavs(item, favs);
            }
        }

        const addFav = (item) => {
            const favs = item.favourites;
            const index = favs.indexOf(current_user);
            if (index <= -1) {
                favs.push(current_user);
                console.log(favs)
                updateFavs(item, favs);
            }

        }

        const checkFav = (item, ch) => {
            if (ch === true) {
                addFav(item);
            }
            else {
                removeFav(item);
            }
        }

        const display_favourite = (item) => {
            const favs = item.favourites;
            const index = favs.indexOf(current_user);
            // var ch = false;
            // if (index > -1) {
            //     ch = true;
            // }
            // return (
            //     <Checkbox color='error' checked={ch} onChange={() => checkFav(item, ch)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            // )
            if (index > -1) {
                return (
                    <Checkbox color='error' onChange={() => removeFav(item)} defaultChecked={true} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                )

            }
            else {
                return (
                    <Checkbox color='error' onChange={() => addFav(item)} defaultChecked={false} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                )
            }
        }

        const checkTime = (item) => {
            var currentdate = new Date();

            var hours = currentdate.getHours();
            var minutes = currentdate.getMinutes();

            var time = (hours * 100) + (minutes * 1);
            console.log(time);

            axios
                .post(`${backend_base_url}/vendor/vendor_timings`, {
                    shop_name: item.shop_name,
                    order_time: time
                })
                .then((res) => {
                    setDialogItem(item);
                    setOpen(true);
                })
                .catch((err) => {
                    alert("Shop is closed right now. Please try ordering later");
                })
        }

        // const displayShopStatus = (item) => {
        //     var currentdate = new Date();

        //     var hours = currentdate.getHours();
        //     var minutes = currentdate.getMinutes();

        //     var time = (hours * 100) + (minutes * 1);

        //     axios
        //         .post(`${backend_base_url}/vendor/vendor_timings`, {
        //             shop_name: item.shop_name,
        //             order_time: time
        //         })
        //         .then((res) => {
        //             // setDialogItem(item);
        //             // setOpen(true);
        //             return (
        //                 <Typography>Shop is Open</Typography>
        //             )
        //         })
        //         .catch((err) => {
        //             // alert("Shop is closed right now. Please try ordering later");
        //             return (
        //                 <Typography>Shop is Closed</Typography>
        //             )

        //         })
        // }


        if (items.length > 0) {
            return (
                items.map((item, index) => {
                    // console.log(item);

                    const handleOrder = (item) => {
                        checkTime(item);

                        // console.log(item);
                    }
                    return (
                        <div>
                            <Card sx={{ minWidth: 150 }} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                backgroundColor: 'lightyellow'
                            }}>
                                <CardContent style={{
                                    flex: 7,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                    <Grid style={{
                                        flex: 0.5,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            display: 'flex',
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            {/* {display_favourite(item)} */}
                                            <RadioButtonCheckedIcon></RadioButtonCheckedIcon>
                                        </Grid>
                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant="h5" component="div" >
                                                {item.item_name}
                                            </Typography>
                                        </Grid>
                                        <br></br>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                                                {item.shop_name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant='h5'>
                                                <CurrencyRupeeIcon fontSize='small' /> {item.price}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            {/* <Stack direction="column"> */}
                                            {display_tags(item)}
                                            {/* </Stack> */}
                                        </Grid>
                                    </Grid>
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            {/* <Chip label={item.veg} ></Chip> */}
                                            {display_veg(item)}

                                        </Grid>
                                    </Grid>
                                    {/* <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant="h6">
                                                Add-ons
                                            </Typography>
                                        </Grid>
                                        <FormGroup>
                                            {display_addons(item)}
                                        </FormGroup>


                                    </Grid> */}
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Rating name="read-only" value={item.rating} precision={0.1} readOnly />
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Button onClick={() => addFav(item)} fontSize={1} size='small'>Add to Favourites</Button>
                                        </Grid>
                                        {/* <Grid item style={{
                                            flex: 1
                                        }}>
                                            <TextField
                                                autoComplete="Quantity"
                                                name="quantity"
                                                type="number"
                                                required
                                                // fullWidth
                                                id="quantity"
                                                label="Quantity"
                                                value={quantity}
                                                onChange={(event) => {
                                                    event.target.value = event.target.value < 0 ? (0) : event.target.value;
                                                    handleQuantity(item, event.target.value)
                                                }
                                                }>

                                            </TextField>
                                        </Grid> */}
                                    </Grid>

                                </CardContent>
                                <CardActions style={{
                                    flex: 1
                                }}>
                                    <Button size="small" onClick={() => handleOrder(item)}>Order</Button>
                                    <br></br>
                                    {/* {displayShopStatus(item)} */}
                                    {/* <Button size="small">Delete</Button> */}
                                </CardActions>

                            </Card>

                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Order item</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Select Addons and quantity
                                    </DialogContentText>
                                    <br></br>
                                    <Grid style={{
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>

                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant="h6">
                                                Add-ons
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <FormGroup>
                                                {display_addons(dialog_item)}
                                            </FormGroup>
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <TextField
                                                autoComplete="Quantity"
                                                name="quantity"
                                                type="number"
                                                required
                                                // fullWidth
                                                id="quantity"
                                                label="Quantity"
                                                value={quantity}
                                                onChange={(event) => {
                                                    event.target.value = event.target.value < 0 ? (0) : event.target.value;
                                                    setQuantity(event.target.value);
                                                    // handleQuantity(item, event.target.value)
                                                }
                                                }>

                                            </TextField>

                                        </Grid>

                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={() => handleSubmit(dialog_item)}>Buy</Button>
                                </DialogActions>
                            </Dialog>

                            <br></br>
                            <br></br>

                        </div>

                    )
                })
            )

        }

        else {
            return (<h3>No items</h3>)
        }
    }


    return (
        (display_cards(props))

    );
}
