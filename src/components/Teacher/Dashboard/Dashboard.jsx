import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Chart from "react-apexcharts";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

function Dashboard() {
  const [state, setState] = React.useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        title: {
          text: 'Marks Obtained',
        },
        categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      yaxis: {
        title: {
          text: 'Total Sudents',
        },
      }
    },
    series: [
      {
        name: "assignment-1",
        data: [1, 3, 40, 15, 40, 59, 60, 70, 91, 50, 10]
      },
      {
        name: "assignment-2",
        data: [5, 30, 20, 45, 55, 49, 30, 60, 41, 30, 20]
      },
      {
        name: "assignment-3",
        data: [8, 20, 10, 35, 40, 29, 40, 80, 11, 20, 13]
      },
      {
        name: "assignment-4",
        data: [10, 40, 50, 35, 50, 39, 10, 20, 31, 60, 15]
      },
    ]
  })

  const [bar, setBar] = React.useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        title: {
          text: 'Created Month',
        },
        categories: ["Jan", "Feb", "Mar", "April", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
      },
      yaxis: {
        title: {
          text: 'Total Courses',
        },
      }
    },
    series: [
      {
        name: "Courses Created",
        data: [40, 15, 40, 59, 60, 70, 91, 50, 10, 3, 22, 12]
      },

    ]
  })


  const theme = useTheme()
  return (
    <>
      <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2 }}>Dashboard</Typography>
      <Box >
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          <Grid item xs={6}>
            <Stack spacing={2} direction="row">
              <Card sx={{ minWidth: "49%", height: 180, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', border: 2, borderColor: "red" }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2, borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <img height={32} width={50} src='https://cdn-icons-png.flaticon.com/512/6747/6747181.png' />
                      <MoreVertIcon sx={{ color: 'red' }} />
                    </Box>
                    <Box sx={{ marginTop: 3, marginRight: 2, }}>
                      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        500+
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="body" component="div" sx={{ color: 'red' }}>
                          Total Assignments
                        </Typography>
                        <ArrowOutwardIcon sx={{ border: 1, borderRadius: 12, borderColor: 'red', color: 'red' }} />
                      </Box>
                    </Box>

                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "49%", height: 180, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', border: 2, borderColor: "blue" }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2, borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <img height={32} width={50} src='https://cdn.iconscout.com/icon/free/png-256/free-course-certificate-1540517-1306924.png' />
                      <MoreVertIcon sx={{ color: 'blue' }} />
                    </Box>
                    <Box sx={{ marginTop: 3, marginRight: 2, }}>
                      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        30+
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="body" component="div" sx={{ color: 'blue' }}>
                          Total Courses
                        </Typography>
                        <ArrowOutwardIcon sx={{ border: 1, borderRadius: 12, borderColor: 'blue', color: 'blue' }} />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2} sx={{ marginBottom: 2 }} direction="row">
              <Card sx={{ minWidth: "49%", height: 180, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', border: 2, borderColor: 'orange' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2, borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <img height={32} width={50} src='https://cdn-icons-png.flaticon.com/512/2784/2784403.png' />
                      <MoreVertIcon sx={{ color: 'orange' }} />
                    </Box>
                    <Box sx={{ marginTop: 3, marginRight: 2, }}>
                      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        1500+
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="body" component="div" sx={{ color: 'orange' }}>
                          Total Students
                        </Typography>
                        <ArrowOutwardIcon sx={{ border: 1, borderRadius: 12, borderColor: 'orange', color: 'orange' }} />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "49%", height: 180, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', border: 2, borderColor: "#ff006f" }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.secondary.main }}>
                    <Box sx={{ marginTop: 2, borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <img height={32} width={50} src='https://static.thenounproject.com/png/2161813-200.png' />
                      <MoreVertIcon sx={{ color: '#ff006f' }} />
                    </Box>
                    <Box sx={{ marginTop: 3, marginRight: 2, }}>
                      <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        4
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="body" component="div" sx={{ color: '#ff006f' }}>
                          My Courses in Progress
                        </Typography>
                        <ArrowOutwardIcon sx={{ border: 1, borderRadius: 12, borderColor: '#ff006f', color: '#ff006f' }} />
                      </Box>
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
              <Typography variant='body' sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>All Courses</Typography>
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
            </Box>
            <Stack spacing={2} >
              <Card sx={{ minWidth: "49%", height: "45vh", }}>
                <Chart
                  options={state.options}
                  series={state.series}
                  type="line"
                  width="98%"
                  height="98%"
                />
              </Card>
            </Stack>

            <Stack spacing={2} sx={{ marginTop: 2 }} direction='row' >
              <Card sx={{ minWidth: "49%", height: "19vh", backgroundColor: '#ff006f', color: theme.palette.primary.background }}>
                <CardContent>
                  <Typography variant='h4' sx={{ fontWeight: 'bold' }}>400+</Typography>
                  <Typography variant='body'>Available Courses Contents</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <ArrowOutwardIcon sx={{ border: 1, backgroundColor: 'grey', borderRadius: 4 }} />
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: "49%", height: "19vh", backgroundColor: 'green', color: theme.palette.primary.background }}>
                <CardContent>
                  <Box>
                    <Typography variant='h4' sx={{ fontWeight: 'bold' }}>200+</Typography>
                    <Typography variant='body'>Reports Generated</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <ArrowOutwardIcon sx={{ border: 1, backgroundColor: 'grey', borderRadius: 4 }} />
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

        </Grid>


        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 2 }}>User Statistics</Typography>

            </Box>
            <Stack spacing={2} >
              <Card sx={{ minWidth: "49%", height: "63vh" }}>
                <Box sx={{ marginTop: 3, marginLeft: 3 }}></Box>
                <Chart
                  type="pie"
                  width="98%"
                  height="100%"
                  series={[30, 40, 10, 50, 5, 10, 6]}
                  options={{
                    title: {
                      text: "Total Students Enrolled"
                    },
                    noData: { text: "Empty Data" },
                    labels: ["Python", "Java", "C", "C++", "Masm", "CSharp", "Nasm"]

                  }}
                >
                </Chart>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={7}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
              <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 2 }}>Courses Activity</Typography>
            </Box>
            <Stack spacing={2} >
              <Card sx={{ minWidth: "49%", height: "63vh", }}>
                <Chart
                  options={bar.options}
                  series={bar.series}
                  type="bar"
                  width="98%"
                  height="98%"
                />
              </Card>
            </Stack>
          </Grid>

        </Grid>
      </Box>

    </>
  );
}

export default Dashboard;
