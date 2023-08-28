import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import CreateCourse from "../Course/CreateCourse";
import ViewCoursesList from "../Course/ViewCoursesList";
import ViewCourseContent from "../Course/ViewCourseContent";
import ViewEnrollmentRequest from "../Course/ViewEnrollmentRequest";
import ViewStudentsList from "../Course/ViewStudentsList";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import ViewProfile from "../Profile/ViewProfileTeacher";
import CreateCourseContent from "../Course/AddCourseContent";
import CourseDetails from "../Course/CourseDetails";

import AddAssignment from "../Assignment/AddAssignment";
import ViewSubmittedAssigList from "../Assignment/ViewSubmittedAssigList";

import ViewUploadedAssigList from "../Assignment/ViewUploadedAssigList";

import ViewUploadedAssig from "../Assignment/ViewUploadedAssigList";

import PDFViewer from "../Assignment/pdf";

export default function TeacherBody() {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <>
      <Box className={`app ${toggled ? "toggled" : ""}`}
        sx={{
          display: "flex",
        }}
      >
        <Sidebar 
          image={image}
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
        
        <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <Navbar/>
        <Box sx={{marginTop:1}}></Box>
          <Routes>
            <Route path="/">
              {/* Teacher Routes */}
              <Route path="Dashboard" element={<Dashboard />}></Route>
              <Route path="CreateCourse" element={<CreateCourse />}></Route>
              <Route path="CoursesList" element={<ViewCoursesList />}></Route>
              <Route
                path="CourseDetails/:id"
                element={<CourseDetails />}
              ></Route>
              <Route
                path="StudentRequests"
                element={<ViewEnrollmentRequest />}
              ></Route>
              <Route path="StudentList" element={<ViewStudentsList />}></Route>
              <Route
                path="AddCourseContent/:id"
                element={<CreateCourseContent />}
              ></Route>
              <Route
                path="ContentList/:id"
                element={<ViewCourseContent />}
              ></Route>
              <Route path="Profile" element={<ViewProfile />}></Route>
              <Route
                path="AddAssignment/:id"
                element={<AddAssignment />}
              ></Route>
              <Route
                path="ViewSubmittedAssigList"
                element={<ViewSubmittedAssigList />}
              >
                {" "}
              </Route>
              <Route
                path="ViewUploadedAssig/:cid/:aid"
                element={<ViewUploadedAssig />}
              ></Route>
              <Route
                path="ViewUploadedAssigList/:id"
                element={<ViewUploadedAssigList />}
              ></Route>

              <Route
                path="ViewUploadedAssig/Pdf"
                element={<PDFViewer />}
              ></Route>
            </Route>
          </Routes>
        </Box>
      </Box>
    </>
  );
}
