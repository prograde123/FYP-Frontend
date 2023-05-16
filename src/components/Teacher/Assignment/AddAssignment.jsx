import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import  Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { DateCalendar } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';





const AddAssignment=()=> {
  const theme = useTheme()
  const[assigNo,setAssigNo] = React.useState()
  const[description,setDescription] = React.useState('')
  const[uploadDate,setuploadDate] = React.useState('')
  const[dueDate,setdueDate] = React.useState('')
  const[marks,setMarks] = React.useState('')
  const[file,setFile] = React.useState('')
  const[format,setFormat] = React.useState('')

    return (
      <>
      
      
        <Box component='main' sx={{flexGrow:1, p:3, backgroundColor: theme.palette.success.main}}>
        <Typography variant='h5' sx={{fontWeight:'bold', padding:1}}>Add Assignment</Typography>

      <Box  
            sx={{ 
              backgroundColor: theme.palette.primary.background,
              width: '50%',
              borderRadius:5,
             boxShadow:"2px 2px 26px 0px",
              border:1, 
              borderColor: theme.palette.secondary.main ,
              marginRight: 'auto',
               marginLeft: 'auto' , 
               padding:'3%'
              }} >
              <FormControl 
              sx={{ 
                  width: '100%',
                marginBottom:3,
               
               }}
               >
                 <InputLabel htmlFor="outlined-adornment-name" color='secondary'>Assignment No</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-name"
                        type = "number"
                        inputProps={{inputProps:{min:1,max:32}}}
                        color="secondary"
                        label="Assig No"
                      
                        value={assigNo}
                        onChange={(e) => setAssigNo(e.target.value)}
                    />
              </FormControl>
              <FormControl sx={{ width: '100%',marginBottom:3}}>
                 <InputLabel htmlFor="outlined-adornment-name" color='secondary'>Description</InputLabel>
                 <OutlinedInput
                  
                        id="outlined-adornment-name"
                        color='secondary'
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
              </FormControl>
              <Box sx={{display:'flex',flexDirection:'row'}}>
              <Box sx={{ marginTop:'1%',width:'100%',marginBottom:'5%'}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}
              >
                
                <DatePicker 
                label='Upload Date'
                value={uploadDate}
                onChange={(val)=>setuploadDate(val)}
                renderLoading={(props)=><TextField {...props} />}
                />
              </LocalizationProvider>
                </Box>
                <Box sx={{ marginTop:'1%',width:'100%',marginBottom:'5%',marginLeft:'5%'}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}
              >
                
                <DatePicker 
                label='Due Date'
                value={dueDate}
                onChange={(val)=>setdueDate(val)}
                renderLoading={(props)=><TextField {...props} />}
                />
              </LocalizationProvider>
                </Box>
              </Box>
              <FormControl sx={{ width: '100%',marginBottom:3 }}>
                 <InputLabel htmlFor="outlined-adornment-name" color='secondary'>Enter Response Format:</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-name"
                        color='secondary'
                        label="Enter Response Format:"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                    />
              </FormControl>
              <FormControl sx={{ width: '100%',marginBottom:3 }}>
                 <InputLabel htmlFor="outlined-adornment-name" color='secondary'>Total Marks</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-name"
                        color='secondary'
                        label="Total marks"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                    />
              </FormControl>
              
                <Box sx={{  marginBottom: 2, fontWeight: 'bold' }} >
                            <Typography variant='caption' 
                            sx={{ fontWeight: 'bold' }}>Upload File<Button variant="outlined" component="label" 
                            color='secondary' sx={{ width: '100%', padding: 2, borderStyle: 'dashed', borderRadius: 6 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                               {<UploadFileIcon
                                  sx={{marginRight:1}}
                               />}
                        
                               <br/>
                                Choose files 
                                   <br />
                                or Drag and Drop Files
                                <input hidden accept="file/*" multiple type="file" />
                            </Button></Button></Typography>
                        </Box>
                      <Box sx={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                        <Button //margin left not working
                        variant="text" color="secondary"
                        sx={{width: '25%', height:'10%',
                        padding: 1, marginRight:'3%', 
                        marginleft:"5%", fontSize: 16, 
                        fontWeight: 'bold',border:1,borderColor: theme.palette.secondary.main }}>
                            Cancel
                        </Button>
                        
                        <Button 
                        variant="contained" color="secondary" 
                         sx={{ width: '25%', height:'10%',
                         padding: 1, fontSize: 16, 
                         fontWeight: 'bold' }}>
                            Assign
                        </Button>
                    
                    </Box>
      </Box>
      
        </Box>
      
      </>
    );
  }
  
  export default AddAssignment;