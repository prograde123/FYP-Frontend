import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import FullFeaturedCrudGrid from './CoursesTable';

function ViewCoursesList() {
  const theme = useTheme()
  return (
    <>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Avaliable Courses List</Typography>
      <FullFeaturedCrudGrid />
    </>
  );
}

export default ViewCoursesList;
