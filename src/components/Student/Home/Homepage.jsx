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
          <Typography data-aos="fade-down"
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontStyle:'italic'
              // textDecoration: "double-underline",
              // color: newtheme.palette.secondary.footer,
            }}
          >
            My Courses
          </Typography>
        </Box>


        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Typography data-aos="fade-right" sx={{ marginRight: 16, fontWeight: 16, marginTop: 4 }}>
            Totally Enrolled in 8 Courses
          </Typography>
          <Autocomplete 
            id="filter-demo"
            options={filter}
            getOptionLabel={(option) => option.title}
            filterOptions={filterOptions}
            sx={{ width: 300, marginLeft: 10 }}
            renderInput={(params) => <TextField {...params} label="Sort By" />}
          />
        </Box>


        <Box data-aos="fade-up"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap:'wrap',
            marginTop: 7,
          }}
        >
          {courses.map((course) => {
            return <CourseCard course={course}></CourseCard>
          })}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Homepage;
