import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backend_base_url from "../config";

export default function WalletFormDialog(props) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    var [amount, setAmount] = React.useState(0);

    const getFunc = () => {
        props.func()
    }


    const handleChange = (event) => {
        event.target.value = event.target.value < 0 ? (0) : event.target.value;
        setAmount(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOutClose = (event) => {
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);

        console.log(amount);
        
        amount = amount*1;
        
        const token = sessionStorage.getItem("token");
        axios
            .post(`${backend_base_url}/user/addmoney`, {
                money_to_add: amount
            }, { headers: { "auth-token": token } })
            .then(res => {
                alert("Balance Update Authorised");
                // navigate("/user_dashboard");
                // fetchBalance();
                getFunc()
            })
            .catch(err => {
                alert(err + ". Session Timed out");
                navigate("/signin_user");

            })
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Money to Wallet
            </Button>
            <Dialog open={open} onClose={handleOutClose}>
                <DialogTitle>Add Amount</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the amount to be added
                    </DialogContentText>
                    <Input
                        autoFocus
                        margin="dense"
                        id="money"
                        label="Amount"
                        type="number"
                        min="0"
                        onChange={handleChange}
                        // onkeyup="if(this.value<0){this.value= this.value * -1}"
                        value={amount}
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
