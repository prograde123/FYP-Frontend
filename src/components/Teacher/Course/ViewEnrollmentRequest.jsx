import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Requests from './RequestTable';

function ViewEnrollmentRequest() {
  const theme = useTheme()
  return (
    <>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Course Enrollement Request</Typography>
      <Requests />
    </>
  );
}

export default ViewEnrollmentRequest;
