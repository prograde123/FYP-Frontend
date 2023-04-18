import React from 'react';
import Sidebar from '../Sidebar';
import { Box, Typography, Button } from '@mui/material';
import Navbar from '../Navbar';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';


function CreateCourse() {
  const theme = useTheme()
  const [language, setLanguage] = React.useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <Navbar />
      <Box height={50} />
      <Box sx={{ display: 'flex', backgroundColor: theme.palette.secondary.background, }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>Create New Course</Typography>
          </Box>
          <Box sx={{ marginLeft: 10, marginRight: 10 }}>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '80%', backgroundColor: 'white', border: 1, borderColor: theme.palette.secondary.main, borderRadius: 10 }}>
              <TextField sx={{ marginTop: 5, marginLeft: 4, marginRight: 4 }}
                id="outlined-multiline-flexible"
                label="Course Code"
                color='secondary'
              /><br />
              <TextField sx={{ marginTop: 3, marginLeft: 4, marginRight: 4 }}
                id="outlined-multiline-flexible"
                label="Course Title"
                color='secondary'
              /><br />
              <TextField sx={{ marginTop: 3, marginLeft: 4, marginRight: 4 }}
                id="outlined-number"
                label="Credit Hours"
                type="number"
                color='secondary'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <TextField sx={{ marginTop: 3, marginLeft: 4, marginRight: 4 }}
                id="outlined-multiline-flexible"
                label="Course Description"
                color='secondary'
                multiline
              /><br />
              <FormControl sx={{ marginTop: 3, marginLeft: 4, marginRight: 4 }}>
                <InputLabel >Select Language</InputLabel>
                <Select
                  id="outlined-multiline-flexible"
                  label="Language"
                  color='secondary'
                  value={language}

                  onChange={handleChange}
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
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={[]} sx={{ marginLeft: 4, marginRight: 4, }}
                >
                  <DemoItem label="Starting Date">
                    <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                  </DemoItem>
                  <DemoItem label="Ending Date">
                    <DateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                  </DemoItem>

                </DemoContainer>
              </LocalizationProvider>
              <br />
              <Box sx={{ marginTop: 1, marginBottom: 4, fontWeight: 'bold' }} >
                <Typography variant='caption' sx={{ fontWeight: 'bold', marginLeft: 4,marginRight:4 }}>Upload Picture* (Optional)  <Button variant="outlined" component="label" color='secondary' sx={{ width: '90%', padding: 2, borderStyle: 'dashed', borderRadius: 6, marginLeft: 4,marginRight:4 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                  Click to browse or <br />
                  Drag and Drop Files
                  <input hidden accept="file/*" multiple type="file" />
                </Button></Button></Typography>
              </Box>
              <Box sx={{marginLeft: 4, marginRight: 4, marginBottom:5 }}>
                <Button
                  variant="contained" color="secondary" endIcon={<ImportContactsIcon fontSize='large' />} sx={{width:'100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                  Create Course
                </Button>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CreateCourse;
