import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CourseCard from "../Course/CourseCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import newtheme from "../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom';
import http from "../../../../Axios/axios";
import { useLocation } from "react-router-dom";


const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.title,
});

function Homepage() {
  const filter = [
    {
      title: "All Courses",
    },
    {
      title: "Sort By Ascending",
    },
    {
      title: "Sort By Descending",
    },
    {
      title: "Completed Courses",
    },
  ];

  const courses = [
    {
      student: 40,
      name: "Programming Fundamentals",
      image:
        "https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-03.jpg",
      description:
        "Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.",
      credits: 3,
      lectures: 15,
      teacher: "Faisal",
    },
    {
      student: 40,
      name: "Data Science",
      image:
        "https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-02.jpg",
      description:
        "Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.",
      credits: 3,
      lectures: 15,
      teacher: "Faisal",
    },
    {
      student: 40,
      name: "Data Science",
      image:
        "https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-01.jpg",
      description:
        "Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.",
      credits: 3,
      lectures: 15,
      teacher: "Faisal",
    },
    {
      student: 40,
      name: "Data Science",
      image:
      "https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-03.jpg",
      description:
        "Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.",
      credits: 3,
      lectures: 15,
      teacher: "Faisal",
    },
    {
      student: 40,
      name: "Data Science",
      image:
      "https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-03.jpg",
      description:
        "Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.",
      credits: 3,
      lectures: 15,
      teacher: "Faisal",
    },
    {
      student: 40,
      name: "Data Science",
      image:
        "https://websitedemos.net/online-coding-course-02/wp-content/uploads/sites/713/2020/10/online-programming-course-02.jpg",
      description:
        "Tortor nunc faucibus a pellentesque sit amet porttitor eget. Sit amet mauris commodoquis imperdiet massa tincidunt nunc. Quis blandit turpis cursus in hac habitasse.",
      credits: 3,
      lectures: 15,
      teacher: "Faisal",
    },
  ];

  const navigate = useNavigate();
  React.useEffect(()=>{
    Aos.init({duration:2500});
  },[])
  const [myCourses, setMyCourses] = useState([]);

  async function getCourses() {
    const user = JSON.parse(localStorage.getItem('User'))
    console.log(user)
    try {
      const response = await http.get('/course/studentCoursesList/' + user._id)
      setMyCourses(response.data.courses)
      console.log(response.data.courses)
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    getCourses();
  }, []);


  return (
    <ThemeProvider theme={newtheme}>
      <Box
        sx={{
          marginTop: 18,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p data-aos="fade-down"
            variant="h4"
            style={{
              fontWeight: "bolder",
              fontSize:34, margin:0
              // textDecoration: "double-underline",
              // color: newtheme.palette.secondary.footer,
            }}
          >
            My Courses
          </p>
        </Box>


        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginLeft:18,
            marginRight:18
          }}
        >
          <p data-aos="fade-right" style={{fontWeight: 'bold', fontSize:20, margin:0 }}>
            Totally Enrolled in 8 Courses
          </p>
          <Autocomplete 
            id="filter-demo"
            options={filter}
            getOptionLabel={(option) => option.title}
            filterOptions={filterOptions}
            sx={{ width: 300, marginLeft: 10 }}
            renderInput={(params) => <TextField {...params} label="Sort By" />}
          />
        </Box>


        <Box data-aos="fade-up" onClick={() => {
          navigate("/Student/ViewCourse/" + id, {
            state: { course: myCourses.find(c =>  c._id === id) },
          });
        }}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap:'wrap',
            marginTop: 7,
            marginLeft:14,
            marginRight:14
          }}
        >
          {myCourses.map((course) => {
            return <CourseCard course={course}></CourseCard>
          })}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Homepage;
