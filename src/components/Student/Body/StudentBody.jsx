import { Routes, Route } from "react-router-dom";

import { Box } from "@mui/material";

import { useTheme } from "@emotion/react";

import DrawerAppBar from "../Navbar";
import StartPage from "../StartPage";
import Footer from "../Footer";
import CourseCard from "../Course/CourseCard";
import Courses from "../Course/Courses";

export default function StudentBody() {
    const theme = useTheme()
    return (
        <>
        
            <DrawerAppBar />
            <Box/>
            <Box>
                
                <Box component='main' >
                    <Routes>
                        <Route path='/'>
                            {/* */}
                           <Route path = "Landing" element= {<StartPage />} />
                           <Route path="CourseCard" element={<CourseCard />}></Route>
                            <Route path="Courses" element={<Courses />}></Route>
                        </Route>
                    </Routes>
                </Box>
            </Box>
            <Footer />
        </>
    )
}