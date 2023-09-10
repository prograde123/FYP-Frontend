import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import CoursesListTable from './CoursesTable';

function ViewCoursesList() {
  const theme = useTheme()
  return (
    <>
      <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}>Available Courses</p>
      <CoursesListTable />
    </>
  );
}
export default ViewCoursesList;