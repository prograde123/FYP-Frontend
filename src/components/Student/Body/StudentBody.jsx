import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import Footer from '../../LandingPage/Footer';
import Courses from '../Course/Courses';
import CourseCard from '../Course/CourseCard';
import ViewCourse from '../Course/ViewCourse';
import Navbar from '../../LandingPage/Navbar'

const StudentBody = () => {
  return (
    <>
      <Box>
        <Navbar/>
        <Box component="main">
          <Routes>
            <Route path="/" element={<CourseCard />} />
            <Route path="/Courses" element={<Courses />} />
            <Route path="/ViewCourse" element={<ViewCourse />} />
          </Routes>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default StudentBody;
