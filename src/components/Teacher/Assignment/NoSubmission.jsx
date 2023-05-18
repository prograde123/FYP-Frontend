import React from "react";
import { Button, Typography } from '@mui/material';
import  Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import NoAssig from '../../../assets/noassig.png';
export default function NoSubmission() {
    const theme = useTheme()
 return(
    <>
    <Box sx={{
          backgroundColor: theme.palette.primary.background, boxShadow: 12, border: 2, borderColor: theme.palette.secondary.main, '& .MuiDataGrid-cell:hover': {
            color: theme.palette.secondary.main,
          }, marginTop: 3, borderRadius: 6, height: '70vh'
        }}>
            <Box sx={{marginLeft:'40%'}}>
            <img style={{ maxWidth: '40%', height: '40vh' , marginTop:'5%'}} src={NoAssig} />

            
        
          <Typography variant='h6' sx={{ marginTop:'1%' }}>No Submissions Yet</Typography>
          <Typography variant='h6' sx={{ marginTop:'1%' }}>Please Check Later</Typography>

          </Box>
          </Box>
    </>
 )
}