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
import Grid from '@mui/material/Grid';
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
// import FormDialog from './components/wallet_dialog';
// import WalletFormDialog from './components/wallet_dialog';
import ButtonAppBarVendor from './components/vendor_nav';
import { CardActions, CardContent, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import backend_base_url from "./config";


const theme = createTheme();
export default function VendorStats() {
    const navigate = useNavigate();

    const [placed_orders, storePlacedOrders] = React.useState('');
    const [pending_orders, storePendingOrders] = React.useState('');
    const [completed_orders, storeCompletedOrders] = React.useState('');
    const [top_five, storeTopFive] = React.useState('');

    const getPlacedOrders = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/order/vendor_orders`, { headers: { "auth-token": token } })
            .then(res => {
                // const items_from_backend = res.data;
                // console.log(items_from_backend);
                storePlacedOrders(res.data);
                console.log(placed_orders);
                // checkPage()
            })
            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_vendor");
            })
    }

    const getPendingOrders = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/order/vendor_orders_pending`, { headers: { "auth-token": token } })
            .then(res => {
                // const items_from_backend = res.data;
                // console.log(items_from_backend);
                storePendingOrders(res.data);
                console.log(pending_orders);
                // checkPage()
            })
            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_vendor");
            })
    }

    const getCompletedOrders = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/order/vendor_orders_completed`, { headers: { "auth-token": token } })
            .then(res => {
                // const items_from_backend = res.data;
                // console.log(items_from_backend);
                storeCompletedOrders(res.data);
                console.log(completed_orders);
                // checkPage()
            })
            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_vendor");
            })
    }

    const getTopFive = () => {
        const token = sessionStorage.getItem("token");
        axios
            .get(`${backend_base_url}/order/vendor_orders_sorted`, { headers: { "auth-token": token } })
            .then(res => {
                // const items_from_backend = res.data;
                // console.log(items_from_backend);
                storeTopFive(res.data);
                console.log(top_five);
                // checkPage()
            })
            .catch(err => {
                alert("Unauthorised access. Session timed out");
                navigate("/signin_vendor");
            })
    }


    const checkPage = (event) => {
        if (!(sessionStorage.getItem("token"))) {
            navigate("/signin_user");
        }
        // fetchBalance();
    }
    useEffect(() => {
        getPlacedOrders();
        getPendingOrders();
        getCompletedOrders();
        getTopFive();
        let ignore = false;

        if (!ignore) checkPage()
        return () => { ignore = true; }
    }, []);

    const displayTopFive = (top_five) => {

        if (top_five.length > 0) {
            return (
                top_five.map((item, index) => {
                    return (
                        <div>
                            <Container style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly'
                            }}>
                                <Card sx={{ minWidth: 500 }} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    backgroundColor: 'lightyellow',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <CardContent style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>
                                        <Grid style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}>
                                            <Grid item style={{
                                                flex: 0.2
                                            }}>
                                                <StarBorderIcon></StarBorderIcon>
                                            </Grid>
                                            <Grid item style={{
                                                flex: 1
                                            }}>
                                                <Typography variant="h6" component="div" >
                                                    {item._id}
                                                </Typography>
                                            </Grid>
                                            <br></br>
                                            <Grid item fullWidth style={{
                                                flex: 1
                                            }}>
                                                <Typography variant="h7" component="div" >
                                                    Completed Orders: {item.count}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>


                                </Card>


                            </Container>
                            <br /><br /><br />
                        </div>
                    )
                })
            )
        }
        else {
            return (
                <h6>No Sales</h6>
            )

        }
    }

    return (

        <div>

            <Container maxWidth="xl">

                {/* {checkPage} */}

                <ButtonAppBarVendor />

                <br></br>
                <br></br>
                <br></br>
            </Container>

            <Container style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                <Card sx={{ minWidth: 150 }} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'lightgray',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <CardContent style={{
                        flex: 7,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Grid style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Grid item style={{
                                flex: 1
                            }}>
                                <Typography variant="h5" component="div" >
                                    Orders Placed
                                </Typography>
                            </Grid>
                            <br></br>
                            <Grid item style={{
                                flex: 1
                            }}>
                                <Typography variant="h5" component="div" >
                                    {placed_orders.length}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{
                        flex: 1
                    }}>
                        {/* <Button size="small" onClick={() => handleEdit(item)}>Edit</Button>
                        <Button size="small" onClick={() => handleDelete(item)} >Delete</Button> */}
                    </CardActions>

                </Card>
                <Card sx={{ minWidth: 150 }} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'lightpink',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <CardContent style={{
                        flex: 7,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Grid style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Grid item style={{
                                flex: 1
                            }}>
                                <Typography variant="h5" component="div" >
                                    Pending Orders
                                </Typography>
                            </Grid>
                            <br></br>
                            <Grid item style={{
                                flex: 1
                            }}>
                                <Typography variant="h5" component="div" >
                                    {pending_orders.length}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{
                        flex: 1
                    }}>
                        {/* <Button size="small" onClick={() => handleEdit(item)}>Edit</Button>
                        <Button size="small" onClick={() => handleDelete(item)} >Delete</Button> */}
                    </CardActions>

                </Card>

                <Card sx={{ minWidth: 150 }} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'lightblue',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <CardContent style={{
                        flex: 7,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Grid style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <Grid item style={{
                                flex: 1
                            }}>
                                <Typography variant="h5" component="div" >
                                    Completed Orders
                                </Typography>
                            </Grid>
                            <br></br>
                            <Grid item style={{
                                flex: 1
                            }}>
                                <Typography variant="h5" component="div" >
                                    {completed_orders.length}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions style={{
                        flex: 1
                    }}>
                        {/* <Button size="small" onClick={() => handleEdit(item)}>Edit</Button>
                        <Button size="small" onClick={() => handleDelete(item)} >Delete</Button> */}
                    </CardActions>

                </Card>

            </Container>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Container>
                <Typography variant="h5" component="div" align='center'>
                    Best Selling Items
                </Typography>
            </Container>
            <br /><br /><br />
            <Container style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
            }}>
                {displayTopFive(top_five)}
            </Container>




            <br></br>
            <br></br>
            <br></br>

        </div>
    );
}