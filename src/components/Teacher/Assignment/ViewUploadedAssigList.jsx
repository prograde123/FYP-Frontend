import React from 'react';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Contents from './Table';


function ViewUploadedAssigList() {
  const theme = useTheme()
  return (
    <Box sx = {{marginLeft:'3%' }}>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Avaliable Assignments</Typography>
      <Contents   />
    </Box>

  );
}

export default ViewUploadedAssigList;
