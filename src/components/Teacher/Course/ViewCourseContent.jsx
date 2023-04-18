import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Box,Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import FullFeaturedCrudGrid from '../../Table';


function ViewCourseContent() {
    const theme = useTheme()
    return (
      <>
      <Navbar/>
      <Box height={50}/>
      <Box sx={{display:'flex', backgroundColor:theme.palette.secondary.background, height:'100vh',width:'100%' }}>
        <Sidebar/>
        <Box component='main' sx={{flexGrow:1, p:3}}>
        <Typography variant='h5' sx={{fontWeight:'bold'}}>Avaliable Courses List</Typography>
        <FullFeaturedCrudGrid/>
        </Box>
      </Box>
      </>
  );
}

export default ViewCourseContent;
