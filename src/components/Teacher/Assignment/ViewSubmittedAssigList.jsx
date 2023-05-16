import React from 'react';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Contents from './SubmitTable';


function ViewSubmittedAssigList() {
  const theme = useTheme()
  


  return (
    <Box sx = {{marginLeft:'3%'}}>
      <Typography variant='h5' sx={{ fontWeight: 'bold',marginTop:'1%' }}>Submitted Assignments List</Typography>
      <Contents   />
    </Box>

  );
}

export default ViewSubmittedAssigList;
