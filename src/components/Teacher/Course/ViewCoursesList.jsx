import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import CoursesListTable from './CoursesTable';

function ViewCoursesList() {
  const theme = useTheme()
  return (
    <>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Avaliable Courses List</Typography>
      <CoursesListTable />
    </>
  );
}
export default ViewCoursesList;