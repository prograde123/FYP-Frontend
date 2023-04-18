import React from 'react';
import Sidebar from './Sidebar';
import { Box,Typography } from '@mui/material';
import Navbar from './Navbar';
import { useTheme } from '@emotion/react';

function Dashboard() {
  const theme = useTheme()
  return (
    <>
    <Navbar/>
    <Box height={50}/>
    <Box sx={{display:'flex', backgroundColor:theme.palette.secondary.background, height:'100vh' }}>
      <Sidebar/>
      <Box component='main' sx={{flexGrow:1, p:3}}>
      <Typography variant='h5' sx={{fontWeight:'bold'}}>Dashboard</Typography>
      
      </Box>
    </Box>
    </>
  );
}

export default Dashboard;
