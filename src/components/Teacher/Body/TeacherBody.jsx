import { Routes, Route } from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard'
import CreateCourse from "../Course/CreateCourse";
import ViewCoursesList from "../Course/ViewCoursesList";
import ViewCourseContent from "../Course/ViewCourseContent";
import ViewEnrollmentRequest from "../Course/ViewEnrollmentRequest";
import ViewStudentsList from "../Course/ViewStudentsList";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useTheme } from "@emotion/react";
import ViewProfile from "../Profile/ViewProfileTeacher";
import CreateCourseContent from '../Course/AddCourseContent'
import ViewCourse from '../Course/ViewCourse'
import AddAssignment from '../Assignment/AddAssignment';
import ViewSubmittedAssigList from '../Assignment/ViewSubmittedAssigList'

export default function TeacherBody() {
    const theme = useTheme()
    return (
        <>
            <Navbar />
            <Box height={50} />
            <Box sx={{ display: 'flex', backgroundColor: theme.palette.secondary.background }}>
                <Sidebar />
                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path='/'>
                            {/* Teacher Routes */}
                            <Route path="Dashboard" element={<Dashboard />}></Route>
                            <Route path="CreateCourse" element={<CreateCourse />}></Route>
                            <Route path="CoursesList" element={<ViewCoursesList />}></Route>
                            <Route path="ContentList" element={<ViewCourseContent />}></Route>
                            <Route path="StudentRequests" element={<ViewEnrollmentRequest />}></Route>
                            <Route path="StudentList" element={<ViewStudentsList />}></Route>
                            <Route path="AddCourseContent" element={<CreateCourseContent/>}></Route>
                            <Route path="CourseDetails" element={<ViewCourse/>}></Route>
                            <Route path="Profile" element={<ViewProfile />}></Route>
                            <Route path="AddAssignment" element={<AddAssignment />}></Route>
                            <Route path="ViewSubmittedAssigList" element={<ViewSubmittedAssigList />}> </Route>
                        </Route>
                    </Routes>
                </Box>
            </Box>
        </>
    )
}