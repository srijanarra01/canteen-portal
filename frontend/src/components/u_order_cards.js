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
// import FormControlLabel from '@mui/material/FormControlLabel';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
// import { TextField } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import backend_base_url from "../config";

export default function BasicCardUserOrder(props) {
    const navigate = useNavigate();

    console.log(props.orders);

    const [reload_req, toggleReload] = React.useState(false);

    const [quantity, setQuantity] = React.useState(1);
    const [order_addons, setOrderAddons] = React.useState([]);
    const [order_rating, setOrderRating] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [dialog_open, setDialogOpen] = React.useState(false);
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

    const handleSubmit = (order, given_rating) => {
        setOpen(false);
        const token = sessionStorage.getItem("token");
        axios
            .post(`${backend_base_url}/order/update_rating`, {
                shop_name: order.shop_name,
                item_name: order.item_name,
                user_email: order.user_email,
                placed_time: order.placed_time,
                rating: order_rating,
            }, { headers: { "auth-token": token } })
            .then((res) => {

                axios
                    .post(`${backend_base_url}/item/update_avg_rating`, {
                        shop_name: order.shop_name,
                        item_name: order.item_name,
                        // user_email: order.user_email,
                        // placed_time: order.placed_time,
                        rating: order_rating,
                    }, { headers: { "auth-token": token } })
                    .then((res) => {
                        window.location.reload();
                        alert("Average rating of item updated");
                    })
                // alert("Item has been rated successfully");

                // navigate("/vendor_dashboard");
                // callPopUp();
            }
            )
            .catch((err) => {
                // navigate("/signin_user");
                // if (err.response.status === 400) {
                alert("Item rating unsuccessful. Please check your wallet balance and also make sure you're signed in");
                // }
                // callPopUp();
            })



        // setChecked(false);
        setOrderRating(0);
    }

    const handleClose = () => {
        setOpen(false);
        console.log(order_rating);
        // setChecked(false);
        // setOrderAddons([]);
        setOrderRating(0);
    }


    const display_cards = (props) => {
        const orders = props.orders;

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
                            <Chip label={disp} ></Chip>
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
                    // window.location.reload();
                    toggleReload(!reload_req);
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
            favs.push(current_user);
            console.log(favs)
            updateFavs(item, favs);
        }

        const display_favourite = (item) => {
            const favs = item.favourites;
            const index = favs.indexOf(current_user);
            if (index > -1) {
                return (
                    <Checkbox color='error' onChange={() => removeFav(item)} defaultChecked icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                )

            }
            else {
                return (
                    <Checkbox color='error' onChange={() => addFav(item)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                )
            }
        }


        if (orders.length > 0) {
            return (
                orders.map((order, index) => {
                    // console.log(item);

                    const handleOpenDialog = (order) => {
                        setDialogItem(order);
                        setOpen(true);
                        // console.log(item);
                    }

                    const askRating = (order) => {
                        if (order.status === 'completed' && order.rating === -1) {
                            handleOpenDialog(order);
                        }
                        else if (order.rating !== -1) {
                            alert("You have alrady rated the item");
                        }
                        else {
                            alert("You can rate once you receive the item");
                        }
                    }

                    const displayPickUp = (order) => {
                        if (order.status === 'ready') {
                            return (
                                <Button size="small" onClick={() => handlePickup(order)}>Picked Up</Button>

                            )
                        }
                    }

                    const displayRateOrder = (order) => {
                        if (order.status === 'completed' && order.rating === -1) {
                            return (
                                <Button size='small' onClick={() => { askRating(order) }}>Rate Order</Button>

                            )
                        }
                    }

                    const handlePickup = (order) => {
                        if (order.status === 'ready') {
                            const token = sessionStorage.getItem("token");
                            axios
                                .post(`${backend_base_url}/order/update_order_user`, {
                                    item_name: order.item_name,
                                    shop_name: order.shop_name,
                                    placed_time: order.placed_time,
                                    status: 'completed'
                                }, { headers: { "auth-token": token } })
                                .then((res) => {
                                    alert("Order status has been updated successfully");
                                    window.location.reload();
                                    // navigate("/vendor_dashboard");
                                    // callPopUp();
                                }
                                )
                                .catch((err) => {
                                    navigate("/signin_user");
                                    // if (err.response.status === 400) {
                                    alert("Status update unsuccessful. Please check the values provided and also make sure you're signed in");
                                    // }
                                    // callPopUp();
                                })
                        }
                        else if (order.status === 'completed') {
                            alert("The order has been already picked up");
                        }

                        else if (order.status === 'rejected') {
                            alert("The order has been rejected by the vendor");
                        }

                        else {
                            alert("The order is not yet ready");
                        }
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
                                    {/* <Grid style={{
                                        flex: 0.5,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            {display_favourite(order)}
                                        </Grid>
                                    </Grid> */}
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: 15
                                    }}>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography variant="h5" component="div" >
                                                {order.item_name}
                                            </Typography>
                                        </Grid>
                                        <br></br>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                                                {order.shop_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                                                Quantity: {order.quantity}
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
                                            <Typography variant='h5'>
                                                <CurrencyRupeeIcon fontSize='small' /> {order.cost}
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{
                                            flex: 0.5
                                        }}>
                                            {/* <Chip label={item.veg} ></Chip> */}
                                            {display_veg(order)}

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

                                            {display_tags(order)}

                                        </Grid>
                                    </Grid>
                                    {/* <Grid style={{
                                        flex: 1,
                                        display: 'flex'
                                    }}>
                                        <Grid item style={{
                                            flex: 0.5
                                        }}>
                                            
                                            {display_veg(order)}

                                        </Grid>
                                    </Grid> */}
                                    <Grid style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-evenly',
                                        padding: 15
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
                                                {display_addons(order)}
                                            </FormGroup>
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
                                            <Rating name="read-only" value={order.rating} readOnly />
                                            {displayRateOrder(order)}
                                            {/* <Button size='small' onClick={() => { askRating(order) }}>Rate Order</Button> */}
                                            {/* {askRating(order)} */}
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                                                {order.placed_time}
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
                                            <Typography>
                                                Status:
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Chip color='primary' label={order.status} ></Chip>
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
                                    {displayPickUp(order)}
                                    {/* <Button size="small" onClick={() => handlePickup(order)}>Picked Up</Button> */}
                                    {/* <Button size="small">Delete</Button> */}
                                </CardActions>

                            </Card>

                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Rate the order</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please Rate the {dialog_item.item_name} You {dialog_item.placed_time} from {dialog_item.shop_name}.
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
                                                Rating
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{
                                            flex: 1
                                        }}>
                                            <Rating
                                                name="simple-controlled"
                                                value={order_rating}
                                                onChange={(event, newValue) => {
                                                    setOrderRating(newValue);
                                                }}
                                            />
                                        </Grid>


                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={() => handleSubmit(dialog_item, order_rating)}>Rate</Button>
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
            return (<h3>No items yet</h3>)
        }
    }


    return (
        (display_cards(props))

    );
}
