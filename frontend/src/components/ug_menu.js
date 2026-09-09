import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { useNavigate } from "react-router-dom";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useNavigationType
// } from "react-router-dom";

export default function UGMenu() {
  const [user_batch, setBatch] = React.useState('');
//   const navigate = useNavigate();

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user_batch}
          label="Batch"
          required
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="UG1">UG1</MenuItem>
          <MenuItem value="UG2">UG2</MenuItem>
          <MenuItem value="UG3">UG3</MenuItem>
          <MenuItem value="UG4">UG4</MenuItem>
          <MenuItem value="UG5">UG5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
