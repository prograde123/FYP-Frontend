import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Students from './StudentsTable';

function ViewStudentsList() {
  const theme = useTheme()
  return (
    <>
    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Enrolled Students</Typography>
    <Students />
  </>
  );
}

export default ViewStudentsList;
