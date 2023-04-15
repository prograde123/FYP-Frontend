import React from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';
import Navbar from './Navbar';

function Dashboard() {
  return (
    <>
    <Navbar/>
    <Box >
      <Sidebar></Sidebar>
    </Box>
    
    </>
  );
}

export default Dashboard;
