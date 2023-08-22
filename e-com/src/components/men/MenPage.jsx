"use client"
import React from 'react'
import MobileSearchBox from '../MobileSearchBar/MobileSearchBox'
import BestDeals from '../bestDeals/BestDeals'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const MenPage = ({heading}) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    event.preventDefault()
    setAge(event.target.value);
    //hit api request
  };
  return (
    <div className='w-[100%]'>
      <Box sx={{  width: '200px',mt:'15px' ,ml:'15px'}}>
      <FormControl fullWidth sx={{
        
      }}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="sorting"
          id="sorting"
          value={age}
          label="Age"
          
          onChange={handleChange}
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={10}>Price-low to high</MenuItem>
          <MenuItem value={20}>Price-high to low</MenuItem>
          <MenuItem value={30}>Newest products</MenuItem>
          <MenuItem value={40}>Customer reviews</MenuItem>

        </Select>
      </FormControl>
    </Box>
        <BestDeals heading={`${heading}`} />

    </div>
  )
}

export default MenPage