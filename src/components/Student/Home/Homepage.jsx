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
            }}
          >
            <span className='underline'>My Courses</span>
          </p>
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
            justifyContent:'center',
            marginTop: 7,
            marginLeft:4,
            marginRight:4
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
