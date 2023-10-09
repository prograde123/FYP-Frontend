import React , {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Picture2 from "../../../../assets/Picture2.png"

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { HiOutlineInformationCircle } from "react-icons/hi";
import { ThemeProvider } from '@mui/material/styles';
// import newtheme from '../../../Themenew'
import { MdOutlineAssignment } from "react-icons/md";
import {BsCodeSlash } from "react-icons/bs";
import { MdOutlineGrade } from "react-icons/md";
import { PiChalkboardTeacher } from "react-icons/pi";
import { TbBrandCpp } from "react-icons/tb";
import { TbNotes } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { SiAssemblyscript } from "react-icons/si";
import Grid from "@mui/material/Grid";

const About = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [Code, setCode] = React.useState('')
  const [Cname, setCname] = React.useState('')
  const [Description, setCDescription] = React.useState('')
  const [Cphoto, setCphoto] = React.useState("")
  const [creditHours, setcreditHours] = React.useState()
  const [language, setLanguage] = React.useState('')
  const [Sdate, setSdate] = React.useState('')
  const [Ldate, setLdate] = React.useState('')
  const [instructor, setInstructor] = React.useState('')
  const [selectedTab, setSelectedTab] = useState('about');
  const course = location.state?.course
 
  React.useEffect(() => {

    // setCode(course.courseCode)
    setCname(course?.name)
    // setCDescription(course.description)
    setCphoto(course?.image)
    // setcreditHours(course.creditHours)
    setLanguage(course?.language)
    setSdate(course?.startingDate)
    setLdate(course?.endingDate)
    setInstructor(course?.teacher.user.fullName)
    // console.log(course.teacher.user)
})
  
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const startDate = course.startingDate;
  const sdate = new Date(startDate);

  const formattedStartDate = `${sdate.getDate()}-${
    sdate.getMonth() + 1
  }-${sdate.getFullYear()}`;

  const endDate = course.endingDate;
  const edate = new Date(endDate);

  const formattedEndDate = `${edate.getDate()}-${
    edate.getMonth() + 1
  }-${edate.getFullYear()}`;


  return (
    <Box>
      <Grid container >
        <Grid item xs={12} sm={12} md={12} lg={12}>
           <Box sx={{ position: "relative", color: "white" }}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <img src={Picture2} height={300} width={'100%'} style={{borderRadius:10}}></img>
            </Box>
            <Box
                sx={{
                  position: "absolute",
                  bottom: 28,
                  left: 33,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bolder", marginBottom: 1, backgroundColor:'#485f60', padding:2, borderRadius:2 }}
                >
                  Welcome to the Course!
                </Typography>
                
              </Box>
           </Box>
           <Box sx={{marginTop:3}}>
            <Typography variant='h5' sx={{fontWeight:'bold'}}>Complete Master Class of: {Cname}</Typography>
            <Typography sx={{color:'grey',marginTop:1}}>Includes Programming Assignments, Lectures and Quick feedback for the Assesments</Typography>
           </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
