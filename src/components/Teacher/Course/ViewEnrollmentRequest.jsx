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
      <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9 }}>Enrollement Requests</p>
      <Requests />
    </>
  );
}

export default ViewEnrollmentRequest;
