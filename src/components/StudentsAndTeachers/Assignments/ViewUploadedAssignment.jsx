import React from 'react';
import { Button, Typography } from '@mui/material';
import  Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const ViewUploadedAssig = ()=> {
    //useeffect m usestate ayegi
    //1 use state to check role and render screen acc to it
    const theme = useTheme()
    const navigate = useNavigate()
    const[AssigNo,setAssigNo] = React.useState('Grand Assignment 1')
    const[Description,setDescription] = React.useState('This is assignment 1 of compiler construction yes or no?')
    const[uploadDate,setuploadDate] = React.useState('3/10/2023')
    const[dueDate,setdueDate] = React.useState('7/10/2023')
    const[marks,setMarks] = React.useState('10')
    const[file,setFile] = React.useState('file')

    const handleDownload = () => {
        //Url or download backend se aye ga
        const link = document.createElement('a');
        link.href = '/assigfyp.pdf';
        link.download = 'assignment.pdf';
        link.click();
      };

    return(
     <>
     <Box component='main' sx={{height:'100vh',overflow: 'auto',flexGrow:1, p:3, backgroundColor: theme.palette.success.main}}>
        <Box sx={{display:'flex', flexDirection:'row'}}>
           <Box> 
            <Typography variant='h4' sx={{fontWeight:'bold', padding:1, 
           paddingBottom:1,}}>{AssigNo}</Typography> </Box>
            
            <Button 
               variant="contained" color="secondary" 
                sx={{ width: '10%', height:'10%',
                padding: 1, fontSize: 16, 
                fontWeight: 'bold',marginLeft:'38%' }}>
                Edit
            </Button>
            <Button 
               variant="contained" color="error" 
                sx={{ width: '10%', height:'10%',
                padding: 1, fontSize: 16, 
                fontWeight: 'bold' ,marginLeft:'5%'}}>
                Delete
            </Button>
            
        </Box>
        <Box sx={{marginTop:'2%'}}>
            <Typography variant='p' sx={{ padding:2}}>{Description}</Typography>
        </Box>
        <Box sx={{marginTop:'3%'}}>
            <Typography variant='p' sx={{ padding:2}}><b>Uploaded On </b>{uploadDate}</Typography>
            <Typography variant='p' sx={{ padding:2}}> <b>Due</b> {dueDate}</Typography>
        </Box>
        <Box sx={{marginTop:'1%'}}>
            <Typography variant='h6' sx={{ padding:2}}> <b>Total Marks: </b> {marks}</Typography>
        </Box>
        <Box >
            <Typography variant='h6' sx={{ paddingLeft:2}}> <b>File: </b></Typography>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',marginTop:'1%'}} >
        <Box sx ={{width:'20%',marginLeft:'1.5%'}}>
        <Link style={{textDecoration:'none'}} to='/Assignment/ViewUploadedAssig/Pdf'> 
            <Box 
                sx={{border:1,padding:1,flexGrow:1,borderRight:0}}>Assignment
            </Box>
            
        </Link> 
        </Box>
        <Box sx={{width:'30%'}}>
        <Button
             variant="contained" color="secondary" 
             sx={{  height:'100%', 
               
              }}
            onClick={handleDownload}
           
        >
            {<FileDownloadOutlinedIcon />}
        </Button>
        </Box>
        </Box>
        <Button
                variant="contained" color="secondary" 
                sx={{
                  
                  padding: 2, fontSize: 16, marginLeft: '3%',marginTop:'3%',
                  fontWeight: 'bold', paddingRight: '2%',paddingLeft:'2%'
                }} 
                onClick={()=>navigate('/Teacher/ViewSubmittedAssigList')}>
                View Submissions
              </Button>
        
     </Box>
     </>
    )
}
export default ViewUploadedAssig