import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import python from '../../../../../assets/python.png'
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function AssignmentCard({Assignment}) {
  return (
    <>
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        marginTop:'3%',
        boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                ":hover": {
              backgroundColor:'#eff0f3', borderColor:'eff0f3'
          },
        border:1,borderRadius:'15px',
        borderColor:'#fff',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2} >
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={Assignment.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container >
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div" >
                Assignment No {Assignment.assignmentNumber}
              </Typography>
              <Typography variant="p" gutterBottom>
                {Assignment.name}
              </Typography>
             
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Due {Assignment.dueDate} 
              </Typography>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Uploaded on {Assignment.uploadDate} 
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {Assignment.totalMarks}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    
    </>
  );
}