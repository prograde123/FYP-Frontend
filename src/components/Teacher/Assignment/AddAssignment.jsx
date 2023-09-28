import React from 'react';
import { useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { DateCalendar } from '@mui/x-date-pickers';
import { useFormik } from "formik";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLocation } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import * as Yup from "yup";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import  storage  from '../../../firebase';
import AddQuestion from './Components/AddQuestions';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AddAssig } from '../../../../Axios/assigAxios';
import { useNavigate } from 'react-router-dom';
import { EditAssignment } from '../../../../Axios/assigAxios';
import TeacherBody from '../Body/TeacherBody';
import {BsArrowRightSquare } from "react-icons/bs";


const AddAssignment = () => {
  const theme = useTheme()
  const assignment = useLocation().state?.assig
 
  const location = useLocation();
  const [fileURL,setfileURL] =React.useState('')
  const [courseID , setcourseID] = React.useState(null)
  const [showAddQuestion, setShowAddQuestion] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [Assignment, setAssignment] = React.useState({ CourseID: "" ,assignmentNumber:  "",description:  "" ,
  uploadDate: "",dueDate: "",totalMarks: "",format: "",noOfQuestions : ""});

  const [file,setFile] = React.useState(null)
  const [fileError,setFileError] = React.useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (assignment) {
      setFile(assignment.assignmentFile);
    } else {
      setFile(null);
    }
  }, [assignment]);

  const initialValues = assignment === undefined ? {
    assigNo:"",
    description:"",
    uploadDate:"",
    dueDate:"",
    marks:"",
    format:"",
    questions:"",

  } : {
    assigNo : assignment.assignmentNumber,
    description : assignment.description,
    uploadDate : dayjs( assignment.uploadDate),
    dueDate : dayjs(assignment.dueDate),
    marks : assignment.totalMarks,
    format : assignment.format,
    questions : assignment.questions
  }
  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
  useFormik({
    initialValues,
    validationSchema: Yup.object({
      assigNo: Yup.number().min(1).max(6).required("Please Enter the Assig Number"),
      description: Yup.string().min(2).max(55).required("Please Enter the course Description"),
      uploadDate: Yup.date().required("Upload Date is required"),
      dueDate: Yup.date().required("Due Date is required"),
      marks: Yup.number().min(1).required("Marks are required!"),
      format: Yup.string().ensure().required("Please Enter the format"),
      questions: Yup.number().min(1).required("Please Enter the Number of questions"),
      
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });

  useEffect(() => {
    const id = location.pathname.split('/').pop();
    setcourseID(id)
  })


 

  useEffect(() => {
    if(file === null)
    return;
    setFileError('')
  }, [file]);

  const handleClick = async () => {
    if (values.questions === "" || values.questions <= 0) {
      alert("Please enter a valid number of questions");
    } else {
      if (!showAddQuestion) {
        setAssignment(
          {
            CourseID : courseID,
            assignmentNumber: values.assigNo,
            description:values.description,
            uploadDate:values.uploadDate.$d,
            dueDate:values.dueDate.$d,
            totalMarks:values.marks,
            format:values.format,
            noOfQuestions : values.questions


          }
        )
        setShowAddQuestion(true);
          if (currentQuestion <= values.questions ) {
            setCurrentQuestion(currentQuestion);
          } else {
            alert("You've seen all the questions!");
          }
    }
    }
  };
  
  window.addEventListener('beforeunload', function (e) {
    
      
      const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave this page?';
      (e || window.event).returnValue = confirmationMessage; 
      return confirmationMessage;
    
  });
  

  

 if(showAddQuestion) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {showAddQuestion && currentQuestion < values.questions && (
      <AddQuestion 
        currentQuestion={currentQuestion} 
        totalQuestions={values.questions}
        assig={Assignment}
        courseID={courseID}
       />
)}


    </Box>
  )
 }
 else{
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box>
        <p className='underline' style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 1, fontSize:25 }}>
          {assignment  == undefined ? "Add Assignment" : "Edit Assignment"}</p>
      </Box>
      <Box sx={{width:'95%'}}>
        <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex',marginTop:3,marginBottom:5, flexDirection: 'column', backgroundColor: 'white', borderRadius: 2, paddingLeft: 5, paddingRight: 5,boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box sx={{display:'flex', flexDirection:'column',width:'49%'}}>
                  <p style={{display:'flex',flexDirection:'row',marginBottom:0,marginTop:33,padding:0, textAlign:'start', fontWeight:'bold'}}>Assignment Number</p>
                  <TextField sx={{  width: '100%', marginTop:2 }}
                  id="outlined-multiline-flexible"
                  label="Assignment No"
                  type = 'number'
                  color='secondary'
                  name='assigNo'
                  value={values.assigNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{errors.assigNo && touched.assigNo ? (
                  <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.assigNo}</p>
                ) : null}
              </Box>
              <Box sx={{display:'flex', flexDirection:'column',width:'49%'}}>
                <p style={{display:'flex',flexDirection:'row',marginBottom:0,marginTop:33,padding:0, textAlign:'start', fontWeight:'bold'}}>Total Marks</p>   
                <TextField sx={{  width: '100%', marginTop:2 }}
                id="outlined-number"
                label=" Marks"
                type="number"
                color='secondary'
                name='marks'
                value={values.marks}
                onChange={handleChange}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />{errors.marks && touched.marks ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.marks}</p>
              ) : null}
              </Box>
            </Box>
            <Box sx={{display:'flex', flexDirection:'column',width:'100%'}}>
              <p style={{display:'flex',flexDirection:'row',marginBottom:0,marginTop:33,padding:0, textAlign:'start', fontWeight:'bold'}}>Assignment Description</p>
            <TextField sx={{ marginTop: 2, width: '100%' }}
              id="outlined-multiline-flexible"
              label="Descripiton"
              color='secondary'
              name='description'
              multiline
              rows={2}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />{errors.description && touched.description ? (
              <p style={{ color: 'red', marginLeft: 4, marginBottom: 0, marginTop: 0 }}>{errors.description}</p>
            ) : null}
            <br/>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ width: '100%', marginTop: 0 }}>
                <Box sx={{display:'flex', flexDirection:'column',width:'100%'}}>
                  <Box sx={{display:'flex',flexDirection:'column', width:'100%'}}>
                    <p style={{display:'flex',flexDirection:'row',marginBottom:5,marginTop:0,padding:0, textAlign:'start', fontWeight:'bold'}}>Upload Date</p>
                    <Box sx={{marginTop:2,width:'100%'}}>
                      <DatePicker
                        name='uploadDate'
                        id="uploadDate"
                        value={values.uploadDate}
                        onChange={(value) => setFieldValue("uploadDate", value, true)}
                        onBlur={handleBlur}
                        label="Upload Date" 
                        slotProps={{ textField: { fullWidth: true,error: false, } }}/>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    {errors.uploadDate && touched.uploadDate ? (
                      <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.uploadDate}</p>
                    ) : null}
                  </Box>
                </Box>
                <br />
                <Box sx={{display:'flex', flexDirection:'column', width:'100%'}}>
                  <p style={{display:'flex',flexDirection:'row',marginBottom:5,marginTop:0,padding:0, textAlign:'start', fontWeight:'bold'}}>Due Date</p>
                  <Box sx={{marginTop:2}}>
                    <DatePicker
                      name='dueDate'
                      id='dueDate'
                      value={values.dueDate}
                      onChange={(value) => setFieldValue("dueDate", value, true)}
                      onBlur={handleBlur}
                      label="Due Date" 
                      slotProps={{ textField: { fullWidth: true,error: false } }} />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    {errors.dueDate && touched.dueDate ? (
                      <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.dueDate}</p>
                    ) : null}
                  </Box>
                </Box>
              </DemoContainer>
            </LocalizationProvider>
           
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Box sx={{display:'flex', flexDirection:'column',width:'49%'}}>
                <p style={{display:'flex',flexDirection:'row',marginBottom:0,marginTop:33,padding:0, textAlign:'start', fontWeight:'bold'}}>Select File Format</p>
                <FormControl sx={{ marginTop: 2, width: '100%' }}>
                  <InputLabel >Select Format</InputLabel>
                  <Select
                    id="outlined-multiline-flexible"
                    label="Select Format"
                    color='secondary'
                    name='format'
                    value={values.format}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value={".java"}>.java</MenuItem>
                    <MenuItem value={".cpp"}>.cpp</MenuItem>
                    <MenuItem value={".cs"}>.cs</MenuItem>
                    <MenuItem value={".c"}>.c</MenuItem>
                    <MenuItem value={".masm"}>.masm</MenuItem>
                    <MenuItem value={".mips"}>.mips</MenuItem>
                    <MenuItem value={".py || .ipynb"}>.py / .ipynb</MenuItem>
                  </Select>
                </FormControl>
              {errors.format && touched.format ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.format}</p>
              ) : null}
              </Box>
              <Box sx={{display:'flex', flexDirection:'column',width:'49%'}}>
                <p style={{display:'flex',flexDirection:'row',marginBottom:0,marginTop:33,padding:0, textAlign:'start', fontWeight:'bold'}}>Total Questions</p>
                <TextField sx={{ marginTop: 2, width: '100%' }}
                  id="outlined-number"
                  label=" No Of Questions"
                  type="number"
                  color='secondary'
                  name='questions'
                  value={values.questions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />{errors.questions && touched.questions ? (
                  <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.questions}</p>
                ) : null}
              </Box>
              
            </Box>
            

            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
              <Box sx={{ width: '55%', marginBottom: 5, marginTop: 4 }}>
                <Button type='submit' onClick={() => { handleClick() }} endIcon={<BsArrowRightSquare/>}
                  variant="contained" color="secondary"  sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold',borderRadius: 2 }}>
                  {assignment == undefined ? 'Next' : 'Edit questions'}
                </Button>
              </Box>
            </Box>
          </Box>
        </form>

      </Box>
    </Box>
  );}
}

export default AddAssignment;