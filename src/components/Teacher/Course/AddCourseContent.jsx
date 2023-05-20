import React from 'react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import UploadFileIcon from '@mui/icons-material/UploadFile';


const CreateCourseContent = () => {
  const theme = useTheme()
  const [lecNo, setLecNo] = React.useState(null)
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [fileType, setFileType] = React.useState('')
  const [file, setFile] = React.useState('')

  return (
    <>
      <Box component='main' sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' 
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
          <FormControl
            sx={{
              width: '100%',
              marginBottom: 3,
            }}
          >
            <InputLabel htmlFor="outlined-adornment-name" color='secondary'>Lec No</InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              type="number"
              inputProps={{ inputProps: { min: 1, max: 32 } }}
              color="secondary"
              label="Lec No"

              value={lecNo}
              onChange={(e) => setLecNo(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', marginBottom: 3 }}>
            <InputLabel htmlFor="outlined-adornment-name" color='secondary'>Title</InputLabel>
            <OutlinedInput

              id="outlined-adornment-name"
              color='secondary'
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl sx={{ width: '100%', marginBottom: 3 }}>
            <InputLabel htmlFor="outlined-adornment-name" color='secondary'>Description</InputLabel>
            <OutlinedInput
              id="outlined-adornment-name"
              color='secondary'
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" color='secondary'>File Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              color='secondary'
              id="demo-simple-select"
              value={fileType}
              label="File Type"
              onChange={(e) => setFileType(e.target.value)}
            >
              <MenuItem value={"Lecture Notes"} color='secondary' >Lecture Notes</MenuItem>
              <MenuItem value={"Helping Material"} color='secondary' >Other Helping Material</MenuItem>
              <MenuItem value={"Coding File"} color='secondary' >Coding file</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold' }} >
            <Typography variant='caption'
              sx={{ fontWeight: 'bold' }}>Upload File<Button variant="outlined" component="label"
                color='secondary' sx={{
                  width: '100%', padding: 2,
                  borderStyle: 'dashed', borderRadius: 6
                }}>
                <Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                  {<UploadFileIcon
                    sx={{ marginRight: 1 }}
                  />}

                  <br />
                  Choose files
                  <br />
                  or Drag and Drop Files
                  <input hidden accept="file/*" multiple type="file" />
                </Button></Button></Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button //margin left not working
              variant="text" color="secondary"
              sx={{
                width: '25%', height: '10%',
                padding: 1, marginRight: '3%',
                marginleft: "5%", fontSize: 16,
                fontWeight: 'bold', border: 1, borderColor: theme.palette.secondary.main
              }}>
              Cancel
            </Button>

            <Button
              variant="contained" color="secondary"
              sx={{
                width: '25%', height: '10%',
                padding: 1, fontSize: 16,
                fontWeight: 'bold'
              }}>
              Add
            </Button>

          </Box>
        </Box>

      </Box>

    </>
  );
}

export default CreateCourseContent;