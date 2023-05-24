import React, { useEffect } from 'react';
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
import http from '../../../../Axios/axios';

import { delAssignment } from '../../../../Axios/assigAxios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ViewUploadedAssig = ()=> {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const Assignmentid = aid;
    console.log(Assignmentid)
    const [assig,setAssig] = React.useState({})
    useEffect(() => {

        http.get(`/assignment/viewAssignment/${Assignmentid}`)
        .then((response) => {
            setAssig(response.data.Viewassignment)

        })

    },[])
    console.log(assig.assignmentNumber)
    const handleDeleteClick = (id) => () => {
    
        delAssignment(id,cid)
        navigate(`Teacher/ViewUploadedAssigList/${cid}`);
    
            ///Teacher/CoursesList
       // setRows(rows.filter((row) => row.id !== id));
      };
    //useeffect m usestate ayegi
    //1 use state to check role and render screen acc to it
    const theme = useTheme()

    // const[AssigNo,setAssigNo] = React.useState('')
    // const[Description,setDescription] = React.useState('assig.description')
    // const[uploadDate,setuploadDate] = React.useState('3/10/2023')
    // const[dueDate,setdueDate] = React.useState('7/10/2023')
    // const[marks,setMarks] = React.useState('10')
    // const[file,setFile] = React.useState('file')
    const uploadDate = assig.uploadDate;
    const udate = new Date(uploadDate);

    const formattedUploadDate = `${udate.getDate()}-${udate.getMonth() + 1}-${udate.getFullYear()}`;

    const DueDate = assig.dueDate;
    const ddate = new Date(DueDate);

    const formattedDueDate = `${ddate.getDate()}-${ddate.getMonth() + 1}-${ddate.getFullYear()}`;
    
    

    const handleDownload = () => {
        //Url or download backend se aye ga
        var downloadURL = assig.assignmentFile
        console.log(downloadURL)
        const link = document.createElement('a');
        link.href = {downloadURL};
        link.download = 'assignment.pdf';
        link.click();
      };

    return(
     <>
     <Box component='main' sx={{height:'100vh',overflow: 'auto',flexGrow:1, p:3, backgroundColor: theme.palette.success.main}}>
        <Box sx={{display:'flex', flexDirection:'row'}}>
           <Box> 
            <Typography variant='h4' sx={{fontWeight:'bold', padding:1, 
           paddingBottom:1,}}>Assignment : {assig.assignmentNumber}</Typography> </Box>
            
            <Button 
               variant="contained" color="secondary" 
                sx={{ width: '10%', height:'10%',
                padding: 1, fontSize: 16, 
                fontWeight: 'bold',marginLeft:'38%' }}
                onClick={() => navigate(`Teacher/EditAssignment/${cid}/${assig._id}`)}
                >
                Edit
            </Button>
            <Button 
               variant="contained" color="error" 
                sx={{ width: '10%', height:'10%',
                padding: 1, fontSize: 16, 
                fontWeight: 'bold' ,marginLeft:'5%'}}
                onClick={handleDeleteClick(assig._id)}
                >
                Delete
            </Button>
            
        </Box>
        <Box sx={{marginTop:'2%'}}>
            <Typography variant='p' sx={{ padding:2}}>{assig.description}</Typography>
        </Box>
        <Box sx={{marginTop:'3%'}}>
            <Typography variant='p' sx={{ padding:2}}><b>Uploaded On </b>{formattedUploadDate}</Typography>
            <Typography variant='p' sx={{ padding:2}}> <b>Due</b> {formattedDueDate}</Typography>
        </Box>
        <Box sx={{marginTop:'1%'}}>
            <Typography variant='h6' sx={{ padding:2}}> <b>Total Marks: </b> {assig.totalMarks}</Typography>
        </Box>
        <Box >
            <Typography variant='h6' sx={{ paddingLeft:2}}> <b>File: </b></Typography>
        </Box>
        <Box sx={{display:'flex',flexDirection:'row',marginTop:'1%'}} >
        <Box sx ={{width:'20%',marginLeft:'1.5%'}}>
        <Link style={{textDecoration:'none'}} to = {assig.assignmentFile}> 
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