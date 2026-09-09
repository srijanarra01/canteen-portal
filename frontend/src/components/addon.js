import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backend_base_url from "../config";

export default function AddonDialog(props) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [price, setPrice] = React.useState(0);
    const [addon_name, setAddonName] = React.useState('');
    const [addon, setAddon] = React.useState(['',0]);

    const getFunc = () => {
        props.func()
    }

    const handleNameChange = (event) => {
        setAddonName(event.target.value);
        
    }


    const handlePriceChange = (event) => {
        event.target.value = event.target.value < 0 ? (0) : event.target.value;
        setPrice(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOutClose = () => {
        setOpen(false);
    }

    const handleClose = (event) => {
        setOpen(false);
        // event.preventDefault();
        // setAddon([addon_name,price]);

        // console.log(addon_name);
        // console.log(price);
        console.log([addon_name,price]);
        props.func(addon_name,price);
        
        // const token = sessionStorage.getItem("token");
        // axios
        //     .post(`${backend_base_url}/user/addmoney`, {
        //         money_to_add: amount
        //     }, { headers: { "auth-token": token } })
        //     .then(res => {
        //         alert("Balance Update Authorised");
        //         // navigate("/user_dashboard");
        //         // fetchBalance();
        //         getFunc()
        //     })
        //     .catch(err => {
        //         alert(err + ". Session Timed out");
        //         navigate("/signin_user");

        //     })
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add an add-on
            </Button>
            <Dialog open={open} onClose={handleOutClose}>
                <DialogTitle>Add Add-On</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the name and price of the add-on
                    </DialogContentText>
                    <br></br>
                    <Typography>
                        Name
                    </Typography>
                    <Input
                        autoFocus
                        // margin="dense"
                        id="addon_name"
                        label="Add-on Name"
                        type="string"
                        onChange={handleNameChange}
                         value={addon_name}
                        fullWidth
                        variant="standard"
                    />
                    <br></br>
                    <br></br>
                    <Typography>
                        Price
                    </Typography>
                    <Input
                        
                        // margin="dense"
                        id="money"
                        label="Price"
                        type="number"
                        min="0"
                        onChange={handlePriceChange}
                        // onkeyup="if(this.value<0){this.value= this.value * -1}"
                        value={price}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOutClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
