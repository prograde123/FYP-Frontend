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
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AddAssig } from '../../../../Axios/assigAxios';
import { useNavigate } from 'react-router-dom';
import { EditAssignment } from '../../../../Axios/assigAxios';
import TeacherBody from '../Body/TeacherBody';




const AddAssignment = () => {
  const theme = useTheme()
  const assignment = useLocation().state?.assig
  console.log(assignment)
  const location = useLocation();
  const [fileURL,setfileURL] =React.useState('')
  const [courseID , setcourseID] = React.useState(null)
  const [file, setFile] = React.useState(null)
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
    format:""
  } : {
    assigNo : assignment.assignmentNumber,
    description : assignment.description,
    uploadDate : dayjs( assignment.uploadDate),
    dueDate : dayjs(assignment.dueDate),
    marks : assignment.totalMarks,
    format : assignment.format
  }
  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
  useFormik({
    initialValues,
    validationSchema: Yup.object({
      assigNo: Yup.number().min(1).max(6).required("Please Enter the Assig Number"),
      description: Yup.string().min(2).max(55).required("Please Enter the course Description"),
      uploadDate: Yup.date().required(" Date is required"),
      dueDate: Yup.date().required(" Date is required"),
      marks: Yup.number().min(1).required("Marks are required!"),
      format: Yup.string().min(1).max(25).required("Please Enter the format"),
      
      
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


  const addData=(downloadURL)=>{
    console.log(downloadURL)
   // console.log('file Url: ' , fileURL)
    if(assignment == undefined){
      const success = AddAssig(values.assigNo,values.description,values.uploadDate,values.dueDate,values.marks,downloadURL,values.format,courseID)
      console.log("returend value is  " , success)
      if(success){
        return navigate(`/Teacher/ViewUploadedAssigList/${courseID}`)
      }
      else{
        alert("Assignment upload failed")

      }
    }
    else{
        const success = EditAssignment(assignment._id,values.assigNo,values.description,values.uploadDate,values.dueDate,values.totalMarks,downloadURL,values.format)
        if(success){
          console.log(courseID)
          return navigate(`/Teacher/ViewUploadedAssigList/${courseID}`)
        }
        else{
          alert("Assignment upload failed")
  
        }
    }
  }

  useEffect(() => {
    if(file === null)
    return;
    setFileError('')
  }, [file]);

  const handleClick = () => {
    if(file === null){
      setFileError("File is required!")
      return;
    }
    if ( values.assigNo === '' || values.description=== '' || values.uploadDate ==='' ||values.dueDate==='' || values.marks === ''|| values.format === "") 
    return;
    const fileRef = ref(storage, `Assignments/${file.name}`)
    const uploadTask = uploadBytesResumable(fileRef, file)
    uploadTask.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(progress)
    }, (error) => {
      console.log("error")
    }, () => {
      console.log("success!")
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        
        addData(downloadURL)
      })
    })
  }

  

 
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>
          {assignment  == undefined ? "Add Assignment" : "Edit Assignment"}</Typography>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', border: 1, borderColor: theme.palette.secondary.main, borderRadius: 10, paddingLeft: 5, paddingRight: 5 }}>
            <TextField sx={{ marginTop: 5, width: '100%' }}
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
            <TextField sx={{ marginTop: 5, width: '100%' }}
              id="outlined-multiline-flexible"
              label="Descripiton"
              color='secondary'
              name='description'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />{errors.description && touched.description ? (
              <p style={{ color: 'red', marginLeft: 4, marginBottom: 0, marginTop: 0 }}>{errors.description}</p>
            ) : null}
            <TextField sx={{ marginTop: 5, width: '100%' }}
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
            <br/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ width: '100%', marginTop: 0 }}>
                <Box>
                  <Box>
                    <DatePicker
                      name='uploadDate'
                      id="uploadDate"
                      value={values.uploadDate}
                      onChange={(value) => setFieldValue("uploadDate", value, true)}
                      onBlur={handleBlur}
                      label="Upload Date" />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {errors.uploadDate && touched.uploadDate ? (
                      <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.uploadDate}</p>
                    ) : null}
                  </Box>
                </Box>
                <br />
                <Box>
                  <Box>
                    <DatePicker
                      name='dueDate'
                      id='dueDate'
                      value={values.dueDate}
                      onChange={(value) => setFieldValue("dueDate", value, true)}
                      onBlur={handleBlur}
                      label="Due Date" />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {errors.dueDate && touched.dueDate ? (
                      <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.dueDate}</p>
                    ) : null}
                  </Box>
                </Box>
              </DemoContainer>
            </LocalizationProvider>
           
            <FormControl sx={{ marginTop: 5, width: '100%' }}>
              <InputLabel >Select Format</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Format"
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
            
            <Box sx={{ marginTop: 5, fontWeight: 'bold', width: '100%' }} >
              <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Upload Assignment <Button variant="outlined" component="label" color='secondary' sx={{ width: '100%', padding: 2, borderStyle: 'dashed', borderRadius: 6 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                Click to browse or <br />
                Drag and Drop Files
                <input name='file' onChange={(e) => { setFile(e.target.files[0]) }} hidden accept="file/assignment/*" multiple type="file" />
              </Button></Button></Typography>
              <p style={{ color: 'red', fontWeight: 'normal', marginTop: 0, marginLeft: 4, marginBottom: 0, display: 'flex', flexDirection: 'row', justifyContent:'center' }}>{fileError}</p>
            </Box>

            <Box sx={{ width: '100%', marginBottom: 5, marginTop: 4 }}>
              <Button type='submit' onClick={() => { handleClick() }} 
                variant="contained" color="secondary"  sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                {assignment == undefined ? 'Add Assignment' : 'Edit Assignment'}
              </Button>
            </Box>
          </Box>
        </form>

      </Box>
    </Box>
  );
}

export default AddAssignment;