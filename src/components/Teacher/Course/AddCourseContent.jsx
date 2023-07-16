import React from 'react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import http from "../../../../Axios/axios";
import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import  storage  from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateCourseContent = ({ courses }) => {
  const theme = useTheme()
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state.course
  const [file, setFile] = React.useState(null);
  const [fileError, setFileError] = React.useState('')

 console.log(course.courseContent)
  const initialValues = {
    lecNo: "",
    title: "",
    fileType: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        lecNo: Yup.number().nullable(true).required("Lecture number are required!"),
        title: Yup.string().min(3).max(25).required("Please Enter the content title!"),
        fileType: Yup.string().ensure().required("File Type is required required!"),
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });

  
  //console.log(course)
  async function addContent(downloadURL) {
    try {
      const url = "/course/addCourseContent/" + course._id;
      const content = {
        lecNo: values.lecNo,
        title: values.title,
        fileType: values.fileType,
        file: downloadURL
      };
      const response = await http.put(url, content);
      console.log("content added")
      return  navigate("/Teacher/ContentList/" + course._id, {
        state: { course: course },
    })
    } catch (e) {
      console.log(e);
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
    if ( values.lecNo === '' || values.title=== '' || values.fileType ==='') 
    return;
    const imgRef = ref(storage, `courseImages/${file.name}`)
    const uploadTask = uploadBytesResumable(imgRef, file)
    uploadTask.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(progress)
    }, (error) => {
      console.log("error")
    }, () => {
      console.log("success!")
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        addContent(downloadURL)
        console.log(downloadURL)
      })
    })
  }

  return (
    <>
      <Box component='main' sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%',
      }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 3 }}>Add Course Content</Typography>

        <Box
          sx={{
            backgroundColor: theme.palette.primary.background,
            width: '50%',
            borderRadius: 5,
            border: 1,
            borderColor: theme.palette.secondary.main,
            marginRight: 'auto',
            marginLeft: 'auto',
            padding: '3%'
          }} >
          <form onSubmit={handleSubmit}>
            <TextField sx={{ marginTop: 3, width: '100%', marginBottom: 1 }}
              id="outlined-adornment-name"
              type="number"
              color="secondary"
              label="Lec No"
              name='lecNo'
              value={values.lecNo}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors.lecNo && touched.lecNo ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.lecNo}</p>
            ) : null}
            
            <TextField sx={{ marginTop: 3, width: '100%', marginBottom: 1 }}
              id="outlined-adornment-name"
              color='secondary'
              label="Title"
              name='title'
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.title}</p>
            ) : null}
            
            <FormControl sx={{ marginTop: 3,marginBottom: 1  }} fullWidth>
              <InputLabel id="demo-simple-select-label" color='secondary'>File Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                color='secondary'
                id="demo-simple-select"
                name='fileType'
                value={values.fileType}
                 onChange={handleChange}
                onBlur={handleBlur}
                label="File Type"
                
              >
                <MenuItem value={"Lecture Notes"} color='secondary' >Lecture Notes</MenuItem>
                <MenuItem value={"Helping Material"} color='secondary' >Other Helping Material</MenuItem>
                <MenuItem value={"Coding File"} color='secondary' >Coding file</MenuItem>
              </Select>
            </FormControl>
            {errors.fileType && touched.fileType ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.fileType}</p>
            ) : null}
            
            <Box sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold' }} >
              <Typography variant='caption'
                sx={{ fontWeight: 'bold' }}>Upload File<Button variant="outlined" component="label"
                  color='secondary' sx={{
                    width: '100%', padding: 2,
                    borderStyle: 'dashed', borderRadius: 6
                  }}>
                  <Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                    {<UploadFileIcon sx={{ marginRight: 1 }} />}
                    <br />Choose files<br />or Drag and Drop Files
                    <input  name='file' onChange={(e) => { setFile(e.target.files[0]) }} hidden accept="file/*" multiple type="file" />
                  </Button></Button></Typography>
                  <p style={{ color: 'red', fontWeight: 'normal', marginTop: 0, marginLeft: 4, marginBottom: 0, display: 'flex', flexDirection: 'row' }}>{fileError}</p>
                  </Box>
            <Box sx={{ width: '100%', marginTop: 4 }}>
              <Button type='submit' onClick={() => { handleClick() }}
                variant="contained" color="secondary" endIcon={<ImportContactsIcon fontSize='large' />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                Add Course Content
              </Button>
            </Box>
          </form>

        </Box>

      </Box>

    </>
  );
}

export default CreateCourseContent;