import React from 'react';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Contents from './SubmitTable';
import NoSubmission from './NoSubmission';

function ViewSubmittedAssigList() {
  const theme = useTheme()
  //This useState will be use to check weither assignments are present or not
  const [Assigdata,setAssigdata] = React.useState(false)


  return (
    <Box sx = {{marginLeft:'3%'}}>
      <Typography variant='h5' sx={{ fontWeight: 'bold',marginTop:'1%' }}>Submitted Assignments List</Typography>
      {Assigdata ? <Contents   /> : <NoSubmission /> }
      
    </Box>

  );
}

export default ViewSubmittedAssigList;
