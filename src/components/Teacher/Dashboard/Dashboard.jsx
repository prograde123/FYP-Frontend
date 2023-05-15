import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Dashboard() {
  const theme = useTheme()
  return (
    <>
      <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2 }}>Dashboard</Typography>
      <Box >
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={6}>
            <Stack spacing={2} direction="row">
              <Card sx={{ minWidth: "49%", height: 180, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2, borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <img height={32} width={50} src='https://cdn-icons-png.flaticon.com/512/6747/6747181.png' />
                      <MoreVertIcon />
                    </Box>
                    <Box sx={{ marginTop: 3, marginRight: 2, }}>
                      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        500+
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Total Assignments
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "49%", height: 180, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2, borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <img height={32} width={50} src='https://cdn.iconscout.com/icon/free/png-256/free-course-certificate-1540517-1306924.png' />
                      <MoreVertIcon />
                    </Box>
                    <Box sx={{ marginTop: 3, marginRight: 2, }}>
                      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        30+
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Total Courses
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2} sx={{ marginBottom: 2 }} direction="row">
              <Card sx={{ minWidth: "49%", height: 180, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2, borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <img height={32} width={50} src='https://cdn-icons-png.flaticon.com/512/2784/2784403.png' />
                      <MoreVertIcon />
                    </Box>
                    <Box sx={{ marginTop: 3, marginRight: 2, }}>
                      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        1500+
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        Total Students
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "49%", height: 180, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2, borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <img height={32} width={50} src='https://static.thenounproject.com/png/2161813-200.png' />
                      <MoreVertIcon />
                    </Box>
                    <Box sx={{ marginTop: 3, marginRight: 2, }}>
                      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        4
                      </Typography>
                      <Typography gutterBottom variant="body" component="div">
                        My Courses in Progress
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>


        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 2 }}>Popular Courses</Typography>
              <Typography variant='body2' sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>All Courses</Typography>
            </Box>
            <Stack spacing={2} >
              <Card sx={{ minWidth: "49%", height: "15vh", }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2 }}>
                      <img height={40} width={50} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5ndfycGGFMW4j2NdQlkA74Butg7Ff3oodA&usqp=CAU' />
                    </Box>
                    <Box sx={{ marginTop: 2, marginRight: 2, }}>
                      <Typography gutterBottom variant="body" sx={{ fontWeight: 'bold' }}>
                        Prog. Fundamental
                      </Typography>
                      <Typography gutterBottom variant="body2" >
                        2 Courses Availaible
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                      <Button variant='contained' sx={{ backgroundColor: '#99edc3', color: 'green' }}>View Courses</Button>
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                      <MoreVertIcon />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "49%", height: "15vh" }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2 }}>
                      <img height={40} width={50} src='https://www.svgrepo.com/download/240334/coding-programming-language.svg' />
                    </Box>
                    <Box sx={{ marginTop: 2, marginRight: 2, }}>
                      <Typography gutterBottom variant="body" sx={{ fontWeight: 'bold' }}>
                        Python Language
                      </Typography>
                      <Typography gutterBottom variant="body2" >
                        3 Courses Availaible
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                      <Button variant='contained' sx={{ backgroundColor: 'pink', color: 'red' }}>View Courses</Button>
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                      <MoreVertIcon />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "49%", height: "15vh" }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2 }}>
                      <img height={40} width={50} src='https://cdn.iconscout.com/icon/premium/png-256-thumb/asm-file-2943003-2428071.png' />
                    </Box>
                    <Box sx={{ marginTop: 2, marginRight: 2, }}>
                      <Typography gutterBottom variant="body" sx={{ fontWeight: 'bold' }}>
                        Comp. Architecture
                      </Typography>
                      <Typography gutterBottom variant="body2" >
                        2 Courses Availaible
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                      <Button variant='contained' sx={{
                        backgroundColor: '#f1ee8e', color: '#fca510'
                      }}>View Courses</Button>
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                      <MoreVertIcon />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "49%", height: "15vh" }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2 }}>
                      <img height={40} width={50} src='https://www.clipartmax.com/png/small/351-3515666_c-language-global-or-external-variables-with-examples-c-programming-logo.png' />
                    </Box>
                    <Box sx={{ marginTop: 2, marginRight: 2, }}>
                      <Typography gutterBottom variant="body" sx={{ fontWeight: 'bold' }}>
                        C languages
                      </Typography>
                      <Typography gutterBottom variant="body2" >
                        2 Courses Availaible
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                      <Button variant='contained' sx={{ backgroundColor: '#63c5da', color: 'blue' }}>View Courses</Button>
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                      <MoreVertIcon />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={7}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 2 }}>Current Activity</Typography>
              <Typography variant='body2' sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>All Courses</Typography>
            </Box>
            <Card sx={{ height: "67vh" }}>
              <CardContent>

              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </Box>

    </>
  );
}

export default Dashboard;
