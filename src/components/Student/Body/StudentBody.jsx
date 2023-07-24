import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import Footer from '../../LandingPage/Footer';
import CourseCard from '../../LandingPage/CourseCard';
import ViewCourse from '../Course/ViewCourse';
import Navbar from '../../Student/Navbar'
import Homepage from '../Home/Homepage';
import newtheme from "../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";

const StudentBody = () => {
  return (
    <>
    <ThemeProvider theme={newtheme}>
    <Box sx={{backgroundColor: newtheme.palette.primary.back}}>
        <Navbar/>
        <Box component="main">
          <Routes>
            <Route path="/" element={<CourseCard />} />
            <Route path="/Home" element={<Homepage />} />
            <Route path="/ViewCourse" element={<ViewCourse />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
      
     
    </>
  );
};

export default StudentBody;
