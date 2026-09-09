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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { Input } from '@mui/material';
import AddonDialog from './addon';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TagsInput from './tags';
import backend_base_url from "../config";


// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function BasicCard(props) {
  console.log(props.items);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  // var [amount, setAmount] = React.useState(0);

  const [item_name, setItemName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [shop_name, setShopName] = React.useState('');
  const [veg, setVeg] = React.useState("veg");
  const [addon, setAddon] = React.useState([]);
  const [mychips, setChips] = React.useState([]);
  const [old_item_name, setOldItemName] = React.useState('');

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

  function handleSelecetedTags(chipper) {
    setChips(chipper);
    // console.log(mychips);
  }

  const handleSubmit = (item) => {
    setOpen(false);
    const token = sessionStorage.getItem("token");
    axios
      .post(`${backend_base_url}/item/update_item`, {
        old_item_name: old_item_name,
        item_name: item_name,
        price: price,
        veg: veg,
        tags: mychips,
        addons: addon
      }, { headers: { "auth-token": token } })
      .then((res) => {
        // alert("Item has been updated successfully");
        window.location.reload();
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

  const getItemDetails = (item) => {
    const token = sessionStorage.getItem("token");
    axios
      .post(`${backend_base_url}/item/itemdetails`, {
        item_name: item.item_name
      }, { headers: { "auth-token": token } })
      .then(res => {
        setItemName(res.data.item_name);
        setOldItemName(res.data.item_name);
        setPrice(res.data.price);
        setVeg(res.data.veg);
        // setAddon(res.data.addons);
      })
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


    if (items.length > 0) {
      return (
        items.map((item, index) => {




          const handleEdit = (item) => {
            setOpen(true);
            getShop();
            getItemDetails(item);
          }

          const handleClose = () => {
            setOpen(false);
          }

          // const handleChange = (event) => {
          //   event.target.value = event.target.value < 0 ? (0) : event.target.value;
          //   setAmount(event.target.value);
          // }

          const handleDelete = (item) => {
            // event.preventDefault();
            const token = sessionStorage.getItem("token");

            axios
              .post(`${backend_base_url}/item/delete_item`, {
                item_name: item.item_name,
                shop_name: item.shop_name
              }, { headers: { "auth-token": token } })
              .then(res => {
                // alert("Item Deleted");
                window.location.reload();
              })
              .catch(err => {
                alert(err + ". Session Timed out");
                navigate("/signin_vendor");

              })


          }
          // console.log(item);
          return (
            <div>
              <Card sx={{ minWidth: 150 }} style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'lightyellow',
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
                    display: 'flex'
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
                    flex: 0.8,
                    display: 'flex'
                  }}>
                    <Grid item style={{
                      flex: 1
                    }}>
                      {/* <Chip label={item.veg} ></Chip> */}
                      {display_veg(item)}

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
                      <Typography variant="h6">
                        Add-ons
                      </Typography>
                    </Grid>
                    {/* <Stack> */}
                    {/* <Chip label="Addon"></Chip> */}
                    {display_addons(item)}
                    {/* </Stack> */}
                  </Grid>
                  <Grid style={{
                    flex: 1,
                    display: 'flex'
                  }}>
                    <Grid item style={{
                      flex: 1
                    }}>
                      <Rating name="read-only" value={item.rating} precision={0.1} readOnly />
                    </Grid>
                  </Grid>

                </CardContent>
                <CardActions style={{
                  flex: 1
                }}>
                  <Button size="small" onClick={() => handleEdit(item)}>Edit</Button>
                  <Button size="small" onClick={() => handleDelete(item)} >Delete</Button>
                </CardActions>

              </Card>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Note that tags and addons are reset to none. Add them as you please
                  </DialogContentText>
                  <br></br>
                  <Grid container spacing={2}>
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
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={() => handleSubmit(item)}>Update</Button>
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
      return (<Typography>No items</Typography>)
    }
  }


  return (
    (display_cards(props))

  );
}
