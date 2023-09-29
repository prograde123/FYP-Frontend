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
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { delAssignment } from '../../../../Axios/assigAxios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';



const ViewUploadedTeacherAssig = ()=> {
    
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const Assignmentid = aid;
   
    const [assig,setAssig] = React.useState({})
    const [file,setFile] = React.useState()
    const [isAssignmentViewed, setAssignmentViewed] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [isTeacher, setIsTeacher] = React.useState(false);
    const [isAlreadySubmitted, setIsSubmitted] = React.useState(false);

    const getSubmission = async ()=>{
      try {
        const res = await http.get('/submit/isSubmitted')
        if(res.data.success){
          setIsSubmitted(true)
        }

      } catch (error) {
        console.log(error);
      }
    }

useEffect(() => {
  http.get(`/assignment/viewAssignment/${Assignmentid}`)
    .then((response) => {
      setAssig(response.data.Viewassignment);
      setFile(response.data.PdfDataUrl);
      setQuestions(response.data.Viewquestions);
    });

    const userJSON = localStorage.getItem('User')
    const user = JSON.parse(userJSON);
    if(user.user?.role == 'Teacher'){
      setIsTeacher(true)
    }
    else{
      if(user.userID?.role == 'Student'){
       getSubmission()
       

        setIsTeacher(false)
        }
      
    }
}, [Assignmentid]); 
    
  const handleAssignmentOpen = () => setAssignmentViewed(true);

  const handleAssignmentClose = () => setAssignmentViewed(false);

    const handleDeleteClick = (id) => () => {
        delAssignment(id, cid)
          .then(() => {
            const url = `/Teacher/ViewUploadedAssigList/${cid}`;
            navigate(url);
          })
          .catch((error) => {
            // Handle error if needed
            console.error(error);
          });
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
        var downloadURL = file;
        const link = document.createElement('a');
        link.href = downloadURL; 
        link.download = 'assignment.pdf';
        link.click();
      };
      

    return(
     <>
     <Box component='main' sx={{height:'100vh',overflow: 'auto',flexGrow:1, p:3, 
    }}>
        <Box sx={{display:'flex', flexDirection:'row'}}>
           <Box> 
            <Typography variant='h4' sx={{fontWeight:'bold', padding:1, 
           paddingBottom:1,}}>Assignment : {assig.assignmentNumber}</Typography> </Box>
          {
          isTeacher && (
            <>
            <Button 
               variant="contained" color="secondary" 
                sx={{
                paddingY: 1, fontSize: 16, 
                paddingX:'3%',
                fontWeight: 'bold',marginLeft:'38%' }}
                onClick={() => navigate(`/Teacher/AddAssignment/${cid}`
                , {
                    // state: { course: courses.find(c =>  c._id === id) },
                    state: { assig: assig },
                  })
            }
                >
                Edit
            </Button>
            <Button 
               variant="contained" color="error" 
                sx={{ 
                paddingY: 1, fontSize: 16,
                paddingX:'3%',
                fontWeight: 'bold' ,marginLeft:'5%'}}
                onClick={handleDeleteClick(assig._id)}
                >
                Delete
            </Button>
            </>
          )
            }
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
            <Typography variant='h6' sx={{ padding:2}}> <b>Submission File Extension: </b> {assig.format}</Typography>
        </Box>
        <Box >
            <Typography variant='h6' sx={{ paddingLeft:2}}> <b>File: </b></Typography>
        </Box>
      
        <Box sx={{display:'flex',flexDirection:'row',marginTop:'1%'}} >
        <Box sx ={{width:'20%',marginLeft:'1.5%'}}>
        
       
        <Link style={{textDecoration:'none'}} onClick={handleAssignmentOpen}> 
            <Box 
                sx={{border:1,padding:1,flexGrow:1,borderRight:0}}>View Questions
            </Box>
            
            
        </Link>
        <Modal
                open={isAssignmentViewed}
                onClose={handleAssignmentClose}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                    timeout: 500,
                    },
                }}
            >
            <Fade in={isAssignmentViewed}>
                <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '90%',
                    maxWidth: '800px',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    borderRadius: '25px',
                }}
                >
                 <Box sx={{display:'flex' , flexDirection: 'row' , justifyContent:'space-between'}}>
                 <Typography variant='h4' sx={{fontWeight:'bold', padding:1, 
           paddingBottom:1,}}>Assignment : {assig.assignmentNumber}</Typography>
            <Box sx={{marginY:'1%'}}>
            <Typography variant='p' > <b>Total Marks: </b> {assig.totalMarks}</Typography>
        </Box>
                 </Box>
                {questions.map((question , index) => (
                    <Box sx={{display:'flex' , flexDirection: 'row' , justifyContent:'space-between'}}>
                        <Typography  sx={{my:'1%'}}>
                        <b> Question {index + 1} </b>
                        {question.questionDescription}
                        </Typography>
                        <Typography  sx={{my:'1%'}}>
                        {`( ${question.questionTotalMarks} )`}
                        
                        </Typography>
                    </Box>
                ))}
                </Box>
            </Fade>
            </Modal>

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
        <Box sx={{display:'flex', justifyContent:'center'}}>
        <Button
                variant="contained" color="secondary" 
                sx={{
                  
                  padding: 2, fontSize: 16, marginLeft: '3%',marginTop:'3%',
                  fontWeight: 'bold', paddingRight: '2%',paddingLeft:'2%'
                }} 
                onClick={()=>navigate(
                  isTeacher ?
                   `/Teacher/ViewSubmittedAssigList` : 
                   isAlreadySubmitted ?
                    `/Student/Result/${assig._id}`  :
                  `/Student/SubmitAssignment/${assig._id}` , {
                    state: { Questions : questions , format : assig.format , courseID : cid  },
                  })}
                  >
                {isTeacher ? "View Submissions" : isAlreadySubmitted ? "View Result" : "Submit Assignment"}
              </Button>
              </Box>
        
     </Box>
     </>
    )
}
export default ViewUploadedTeacherAssig