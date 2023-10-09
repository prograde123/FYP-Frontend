import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import Footer from '../../LandingPage/Footer';
import CourseCard from '../../LandingPage/CourseCard';
import ViewCourse from '../Course/ViewCourse';
import DrawerAppBar from '../Navbar'
import Homepage from '../Home/Homepage';
import newtheme from "../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import ViewAllCourses from '../Course/ViewAllCourses';
import EnrollCourseCard from '../Course/EnrollCourseCard';
import Submit from '../Assignment/Components/SubmitQuestions';
import Result from '../Assignment/Result';
import ViewUploadedAssig from '../Assignment/ViewUploadedAssignment';
import ViewCourseDetails from '../Course/ViewCourseDetails';

const StudentBody = () => {
  return (
    <>
    <ThemeProvider theme={newtheme}>
    <Box sx={{backgroundColor: newtheme.palette.primary.back}}>
        <DrawerAppBar/>
        <Box component="main" sx={{
             mt:'7%'
        }}>
          <Routes>
            <Route path="/" element={<CourseCard />} />
            <Route path="/Home" element={<Homepage />} />
            <Route path="/ViewCourse/:id" element={<ViewCourse />} />
            <Route path="/AllCourses" element={<ViewAllCourses/>} />
            <Route path="/AllCoursesCard" element={<EnrollCourseCard/>} />
            <Route path='/ViewUploadedAssig/:cid/:aid' element={<ViewUploadedAssig />} />
            <Route path="/SubmitAssignment/:aid" element= {<Submit />} />
            <Route path='/Result/:aid' element={<Result />} />
            <Route path='/Course/:id' element={<ViewCourseDetails />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
      
     
    </>
  );
};

export default StudentBody;
