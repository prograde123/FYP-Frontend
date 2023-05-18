import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { storage } from '../../../firebase';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs, { Dayjs } from 'dayjs';

function CreateCourse() {
  const theme = useTheme()
  const [image, setImage] = React.useState(null);

  const initialValues = {
    courseCode: "",
    title: "",
    creditHours: "",
    description: "",
    language: "",
    starting: dayjs(Date.now()),
    ending: dayjs(Date()),
  };
  console.log(initialValues.starting)
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        courseCode: Yup.string().min(4).max(6).required("Please Enter the course Code"),
        title: Yup.string().min(2).max(25).required("Please Enter the course title"),
        creditHours: Yup.number().nullable(true).required("Credit Hours are required!"),
        language: Yup.string().ensure().required("Language is required required!"),
        description: Yup.string().min(2).max(55).required("Please Enter the course Description"),
        starting: Yup.date().required("Starting Date is required"),
        ending: Yup.date().required("Ending Date is required"),
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
        action.resetForm();
      },
    });
  console.log(errors);

  const handleClick = () => {
    if (image === null) return;
    const imgRef = ref(storage, `courseImages/${image.name}`)
    const uploadTask = uploadBytesResumable(imgRef, image)
    uploadTask.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(progress)
    }, (error) => {
      console.log("error :(")
    }, () => {
      console.log("success!!")
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
       addCourse(downloadURL)
        console.log(downloadURL)
      })
    })
  }

  async function addCourse(downloadURL) {
    try {
      const url = "http://localhost:5000/course/addCourse";
      const course = {
        teacher: teacher,
        courseCode: initialValues.courseCode,
        name: initialValues.title,
        description: initialValues.description,
        creditHours: initialValues.creditHours,
        language: initialValues.language,
        startingDate: initialValues.starting,
        endingDate: initialValues.ending,
        image: downloadURL,
        courseContent: [],
        students: [],
        requests: [],
        assignments: [],
      };
      const response = await axios.post(url, course);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>Create New Course</Typography>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', border: 1, borderColor: theme.palette.secondary.main, borderRadius: 10, width: '100%', paddingLeft: 16, paddingRight: 16 }}>
            <TextField sx={{ marginTop: 5, width: '100%' }}
              id="outlined-multiline-flexible"
              label="Course Code"
              color='secondary'
              name='courseCode'
              value={values.courseCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />{errors.courseCode && touched.courseCode ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.courseCode}</p>
            ) : null}
            <br />
            <TextField sx={{ marginTop: 3, width: '100%' }}
              id="outlined-multiline-flexible"
              label="Course Title"
              color='secondary'
              name='title'
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />{errors.title && touched.title ? (
              <p style={{ color: 'red', marginLeft: 4, marginBottom: 0, marginTop: 0 }}>{errors.title}</p>
            ) : null}
            <br />
            <TextField sx={{ marginTop: 3, width: '100%' }}
              id="outlined-number"
              label="Credit Hours"
              type="number"
              color='secondary'
              name='creditHours'
              value={values.creditHours}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />{errors.creditHours && touched.creditHours ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.creditHours}</p>
            ) : null}
            <br />
            <TextField sx={{ marginTop: 3, width: '100%' }}
              id="outlined-multiline-flexible"
              label="Course Description"
              color='secondary'
              multiline
              name='description'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />{errors.description && touched.description ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.description}</p>
            ) : null}
            <br />
            <FormControl sx={{ marginTop: 3, width: '100%' }}>
              <InputLabel >Select Language</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Language"
                color='secondary'
                name='language'
                value={values.language}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={10}>Java</MenuItem>
                <MenuItem value={20}>C++</MenuItem>
                <MenuItem value={30}>C# (sharp)</MenuItem>
                <MenuItem value={40}>C Language</MenuItem>
                <MenuItem value={50}>Assembly (MASM)</MenuItem>
                <MenuItem value={60}>Assembly (MIPS)</MenuItem>
                <MenuItem value={70}>Python</MenuItem>
              </Select>
            </FormControl>
            {errors.language && touched.language ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.language}</p>
            ) : null}
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ width: '100%', marginTop: 0 }}>
                <DatePicker
                  name='starting'
                  value={values.starting}
                  onChange={values.starting.handleChange}
                  onBlur={handleBlur}
                  label="Starting Date" />
                {errors.starting && touched.starting ? (
                  <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.starting}</p>
                ) : null}
                <br />
                <DatePicker
                  name='ending'
                  value={values.ending}
                  onChange={values.ending.handleChange}
                  onBlur={handleBlur}
                  label="Ending Date" />
                {errors.ending && touched.ending ? (
                  <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ending}</p>
                ) : null}
              </DemoContainer>
            </LocalizationProvider>
            <br />
            <Box sx={{ marginTop: 1, fontWeight: 'bold', width: '100%' }} >
              <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Upload Picture* <Button variant="outlined" component="label" color='secondary' sx={{ width: '100%', padding: 2, borderStyle: 'dashed', borderRadius: 6 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                Click to browse or <br />
                Drag and Drop Files
                <input name='image' onChange={(e) => { setImage(e.target.files[0]) }} hidden accept="image/*" multiple type="file" />
              </Button></Button></Typography>
            </Box>
            {image === null ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}></p>
            ) : null}
            <Box sx={{ width: '100%', marginBottom: 5, marginTop: 4 }}>
              <Button type='submit' onClick={() => { handleClick() }}
                variant="contained" color="secondary" endIcon={<ImportContactsIcon fontSize='large' />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                Create Course
              </Button>
            </Box>
          </Box>
        </form>

      </Box>
    </Box>
  );
}

export default CreateCourse;
