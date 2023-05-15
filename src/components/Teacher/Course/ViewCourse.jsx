import React from 'react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import SignInImage from '../assets/Saly.png'
// import Background from '../assets/bg-1.jpg'
// import Course from '../assets/python.jpg'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ColorLens } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const ViewCourse = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  //UseEffect
  const [Code, setCode] = React.useState('CS -201')
  const [Cname, setCname] = React.useState('Introduction To Python')
  const [Description, setCDescription] = React.useState('This course provides an introduction to programming and the Python language.  Students are introduced to core programming concepts like data structures, conditionals, loops, variables, and functions.  This course includes an overview of the various tools available for writing and running Python, and gets students coding quickly.  It also provides hands-on coding exercises using commonly used data structures')
  const [Cphoto, setCphoto] = React.useState("https://www.svgrepo.com/download/240334/coding-programming-language.svg")
  const [creditHours, setcreditHours] = React.useState(3)
  const [language, setLanguage] = React.useState('python')
  const [Sdate, setSdate] = React.useState('20-3-2023')
  const [Ldate, setLdate] = React.useState('20-6-2023')

  return (
    <>
      <Box>

        <Box sx={{
          display: 'flex', flexDirection: 'row',
        }}
        >
          <Box sx={{ width: '15%', flex: 1, paddingLeft: '5%' }}>

            <Typography variant='h4'
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                paddingTop: 6,

              }}>{Code}</Typography>
            <Typography variant='h4'
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                paddingTop: 1,

                minWidth: "50%"
              }}>{Cname}</Typography>
            <br />
            <Typography variant='p'
              sx={{
                color: theme.palette.primary.main,
                paddingTop: 1,
              }}>{Description}</Typography>
            <Box sx={{ marginTop: '7%', display: 'flex', flexDirection: 'row', }}>

              <Button onClick={() => { navigate('/Teacher/ContentList') }}
                variant="contained" color="secondary" endIcon={< ArrowForwardIosIcon />}
                sx={{
                  width: '37%', height: '10%', padding: 1, fontSize: 16,
                  fontWeight: 'bold', paddingRight: '3%'
                }}>
                View Course Contents

              </Button>


              <Button
                variant="contained" color="secondary" endIcon={< ArrowForwardIosIcon />}
                sx={{
                  width: '37%', height: '10%',
                  padding: 1, fontSize: 16, marginLeft: '5%',
                  fontWeight: 'bold', paddingRight: '3%'
                }}>
                View Course Assignments
              </Button>

            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <img src={Cphoto} style={{
              width: 350, height: 300, marginLeft: '20%', marginTop: "25%"
            }} ></img>
          </Box>
        </Box>
        <Box sx={{
          backgroundColor: theme.palette.success.background
          , display: 'flex', flexDirection: 'row',
          justifyContent: 'space-around', 
        }}>
          <Box>
            <Typography variant='h6'><b>Starting Date </b> <br />  {Sdate}</Typography>
            <br />
            <Typography variant='h6'
              ><b>Ending Date</b>  <br />  {Ldate}</Typography>
          </Box>

          <Box>
            <Typography variant='h6'
              ><b>Language </b> <br />  {language}</Typography><br/>
              <Typography variant='h6'
              > <b>CreditHours</b>  <br />  {creditHours}</Typography>
          </Box>
        </Box>
      </Box>




    </>
  );


}
export default ViewCourse;