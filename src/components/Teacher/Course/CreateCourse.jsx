import React from 'react';
import Sidebar from '../Sidebar';
import { Box, Typography } from '@mui/material';
import Navbar from '../Navbar';

function CreateCourse() {
  return (
    <>
    <Navbar/>
    <Box height={50}/>
    <Box sx={{display:'flex'}}>
      <Sidebar/>
      <Box component='main' sx={{flexGrow:1, p:3}}>
      <Typography variant='h5' sx={{fontWeight:'bold'}}>Create New Course</Typography>
      
      </Box>
    </Box>
    </>
  );
}

export default CreateCourse;
