import React, { Component } from 'react'
// import * as React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ResponsiveAppBar from './components/Navbar'
import SignInUser from './SignIn_user'
import SignUpUser from './Signup_user'
import BasicMenu from './components/Menu'
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';


import {
  BrowserRouter,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import SignUpVendor from './Signup_vendor'
import SignInVendor from './SignIn_vendor'
import UserDashboard from './User';
import UserEditProfile from './user_ep';
import VendorDashboard from './Vendor';
import VendorEditProfile from './vendor_ep';
import VendorAddItem from './vendor_additem';
import VendorMenu from './vendor_menu';
import UserMenu from './user_menu';
import UserOrders from './user_orders';
import VendorOrders from './vendor_orders';
import Favourites from './favourites';
import VendorStats from './vendor_stats';

const Layout = () => {
  return (
    <div>

      <div>
        {/* <ResponsiveAppBar /> */}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div align="center">
        <BasicMenu />
      </div>

    </div>
  )
}

class App extends Component {

  render() {
    return (

      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Layout />} />
            <Route exact path="/signup_user" element={<SignUpUser />} />
            <Route exact path="/signup_vendor" element={<SignUpVendor />} />
            <Route exact path="/signin_user" element={<SignInUser />} />
            <Route exact path="/signin_vendor" element={<SignInVendor />} />
            <Route exact path="/user_dashboard" element={<UserDashboard />} />
            <Route exact path="/vendor_dashboard" element={<VendorDashboard />} />
            <Route exact path="/user_editprofile" element={<UserEditProfile />} />
            <Route exact path="/vendor_editprofile" element={<VendorEditProfile />} />
            <Route exact path="/vendor_additem" element={<VendorAddItem />} />
            <Route exact path="/vendor_menu" element={<VendorMenu />} />
            <Route exact path="/user_menu" element={<UserMenu />} />
            <Route exact path="/user_orders" element={<UserOrders />} />
            <Route exact path="/vendor_orders" element={<VendorOrders />} />
            <Route exact path="/favourites" element={<Favourites />} />
            <Route exact path="/vendor_stats" element={<VendorStats />} />

          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
export default App