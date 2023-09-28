import React,{useEffect} from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Chart from "react-apexcharts";
import teacherlogo from "../../../assets/teacherlogo.svg";
import courses from "../../../assets/courses.svg";
import assign from "../../../assets/assign.svg";
import reports from "../../../assets/reports.svg";
import students from "../../../assets/students.svg";
import feedback from "../../../assets/feedback.svg";
import welcome from "../../../assets/welcome.svg";
import { FcComboChart } from "react-icons/fc";
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import AntDesignGrid from './CourseOverviewTable';
import profile from '../../../../src/assets/profile.png';

function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate()

  //donut chart
  const [pieChart,setPieChart] =React.useState({
    series: [40, 65, 50,80],
            options: {
              chart: {
                width: 380,
                type: 'donut',
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270,
                  expandOnClick: true,
                  donut: {
                    labels:{
                      show: true,
                      total: {
                      show: true,
                      label: 'Completed',
                      fontWeight:'bold',
                      formatter: () => '25%'
                      }
                    },
                    size: '70%'
                  }
                  
                }
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              labels: ["Completed","In Progress","Not Completed","Not Started"],
              legend: {
                position: 'bottom',
                fontSize: '14px',
                fontWeight: 'bold',
            },
            colors: ["#ff0000", "#c758d0", "#24e4ac", "#007ed6"],
             
              title: {
                text: 'Course Progress',
                align:'center',
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  
                }
              }]
            },
  })

  //bar chart
  const [newChart, setNewChart] = React.useState({
    series: [{
      data: [750, 400, 348, 670, 1040, 580, 690, 1100, 1200, 1380,550,800]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        labels: ["Students Enrolled"],
      },
      title: {
        text: 'Students With Time Sent Monthywise',
        align:'center'
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ['January', 'Febraury', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October',"November","December"
        ],
      },
      colors: ["#c758d0"]
    },
  
  });

  //assignments created small chart
  const [currentHours, setCurrentHours] = React.useState({
    series: [
      {
        data: [
          {
            x: "Jan",
            y: [28, 45],
          },
          {
            x: "Feb",
            y: [12, 41],
          },
          {
            x: "Mar",
            y: [29, 78],
          },
          {
            x: "Apr",
            y: [9, 46],
          },
          {
            x: "May",
            y: [12, 51],
          },
          {
            x: "Jun",
            y: [25, 65],
          },
          {
            x: "Jul",
            y: [41, 56],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          isDumbbell: true,
          columnWidth: 3,
          dumbbellColors: [["#638cff", "#79cfff"]],
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "top",
        horizontalAlign: "start",
        customLegendItems: ["Courses", "Assignments"],
        colors: ["#F44336", "#E91E63"],
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          gradientToColors: ["#638cff", "#638cff"],
          inverseColors: true,
          stops: [0, 100],
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        tickPlacement: "on",
        lines: {
          show: false,
        },
        title: {
          text: "Assignment Created",
        },
      },
    },
  });
  const [profileData, setProfileData] = React.useState(null)


  useEffect(() => {
    const fetchProfile = async () => {
        const userJSON = await localStorage.getItem('User')
        const user = JSON.parse(userJSON);
        setProfileData(user)
        
    }

    fetchProfile()
    
  },[])
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
  }));
  

  return (
    <Box sx={{ backgroundColor:theme.palette.primary.background,}}>
    
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 2,
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={6.5}
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ecf2ff",
            justifyContent: "space-between",
            borderRadius: 3,
            marginLeft: 2,
            marginRight: 2,
            overflow:'hidden'
          }}
        >
          <Box sx={{}}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
              }}
            >
              <img
                style={{
                  borderRadius: 20,
                  marginRight: 13,
                }}
                height={40}
                width={40}
                src={profileData?.user?.profilePic ? profileData.user.profilePic : profile }
              />
              <p style={{ fontWeight: "bolder", fontSize: 22, marginTop: 7 }}>
                Welcome, {profileData ? profileData.user.fullName : 'User'}
              </p>
            </Box>
            <Box>
              <p style={{ marginBottom: 0, marginTop: 5 }}>
                Your Students completed 85% of tasks
              </p>
              <p style={{ marginTop: 3 }}>Progress is excellent!</p>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FcComboChart style={{ fontSize: "27" }} />}
                onClick={() => { navigate('/Teacher/CoursesList') }}
                sx={{
                  // backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                  padding: 1.5,
                  borderRadius: 10,
                  ":hover": {
                    backgroundColor: theme.palette.primary.background,
                    color: theme.palette.secondary.main,
                    border:1
                  },
                }}
              >
                View Progress
              </Button>
            </Box>
          </Box>
          <Box>
            <img src={welcome}></img>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            border: "2px solid #ecf2ff",
            borderRadius: 3,
            marginRight: 1,
            // ":hover": { backgroundColor: "#ecf2ff", cursor: "pointer" },
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Box>
            <Chart
              width="175"
              height="215"
              options={{
                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: "75%",
                    },
                  },
                },
                labels: ["Working Hour"],
                colors: ["#638cff"],
                horizontalAlign:'center'
              }}
              series={[85]}
              type="radialBar"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3.1}
          sx={{
            display: "flex",
            flexDirection: "row",
            border: "2px solid #ecf2ff",
            borderRadius: 3,
            // ":hover": { backgroundColor: "#ecf2ff", cursor: "pointer" },
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Box>
            <Chart
              options={currentHours.options}
              series={currentHours.series}
              type="rangeBar"
              width="97%"
              height="182"
            />
          </Box>
        </Grid>
      </Grid>




      <Grid container sx={{ marginTop: 1 }} spacing={2}>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #ecf2ff",
              ":hover": { backgroundColor: "#ecf2ff", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={students} />
            </Box>
            <Box>
              <p style={{ color: "#7d9fff", marginBottom: 7, fontSize: 18 }}>
                Students
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#7d9fff",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                700+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #fef5e5",
              ":hover": { backgroundColor: "#fef5e5", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={teacherlogo} />
            </Box>
            <Box>
              <p style={{ color: "#ffbd4a", marginBottom: 7, fontSize: 18 }}>
                Teachers
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#ffbd4a",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                98+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #e8f7ff",
              ":hover": { backgroundColor: "#e8f7ff", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={courses} />
            </Box>
            <Box>
              <p style={{ color: "#85d3ff", marginBottom: 7, fontSize: 18 }}>
                Courses
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#85d3ff",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                200+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #fdede8",
              ":hover": { backgroundColor: "#fdede8", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={assign} />
            </Box>
            <Box>
              <p style={{ color: "#fa9c83", marginBottom: 7, fontSize: 18 }}>
                Assignments
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#fa9c83",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                500+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #e6fffa",
              ":hover": { backgroundColor: "#e6fffa", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={feedback} />
            </Box>
            <Box>
              <p style={{ color: "#2be2c0", marginBottom: 7, fontSize: 18 }}>
                Responses
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#2be2c0",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                700+
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Box
            sx={{
              border: "3px solid #ebf3fe",
              ":hover": { backgroundColor: "#ebf3fe", cursor: "pointer" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            <Box sx={{ marginTop: 3 }}>
              <img src={reports} />
            </Box>
            <Box>
              <p style={{ color: "#65a5ff", marginBottom: 7, fontSize: 18 }}>
                Reports
              </p>
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <p
                style={{
                  margin: 0,
                  color: "#65a5ff",
                  fontWeight: "bolder",
                  fontSize: 20,
                }}
              >
                100+
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>




      <Grid container spacing={2} sx={{marginTop:1}}>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',padding:2,height:'60vh',overflow:'hidden',':hover':{overflowY:'scroll'},borderRadius:2}}>
            <p style={{marginTop:5,fontWeight:'bolder'}}>Popular Courses</p>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>
            {/* <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:10, marginBottom:10,fontSize:16}}>Good</p>
                <p style={{marginTop:10, marginBottom:10,fontSize:16,fontWeight:'bold'}}>80%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={80} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#525ce5' : '#308fe8',
              }}}/>
            </Box> */}
          </Box>
        </Grid>


        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',padding:2,borderRadius:2,height:'60vh'}}>
            <p style={{marginTop:5,fontWeight:'bolder'}}>Students Overview</p>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:10, marginBottom:10,fontSize:16}}>Good</p>
                <p style={{marginTop:10, marginBottom:10,fontSize:16,fontWeight:'bold'}}>80%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={80} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#525ce5' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
            <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16}}>Satisfied</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>75%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={75} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#9c52fd' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16}}>Excellent</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>72%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={72} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#24e4ac' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,}}>Average</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>65%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={65} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#ffb22b' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16}}>Below Average</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>50%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={50} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#2f89f5' : '#308fe8',
              }}}/>
            </Box>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:0, marginBottom:10,fontSize:16}}>Unsatisfied</p>
                <p style={{marginTop:0, marginBottom:10,fontSize:16,fontWeight:'bold'}}>40%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={40} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#ec5646' : '#308fe8',
              }}}/>
            </Box>
          </Box>
        </Grid>


        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',padding:2,height:'60vh',overflow:'hidden',borderRadius:2}}>
            <p style={{marginTop:5,fontWeight:'bolder'}}>Famous Instructors</p>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              {/* <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <p style={{marginTop:10, marginBottom:10,fontSize:16}}>Good</p>
                <p style={{marginTop:10, marginBottom:10,fontSize:16,fontWeight:'bold'}}>80%</p>
              </Box>
              <BorderLinearProgress variant="determinate" value={80} sx={{  [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.mode === 'light' ? '#525ce5' : '#308fe8',
              }}}/> */}
            </Box>
             
            
          </Box>
        </Grid>
      </Grid>





      <Grid container spacing={1} sx={{marginTop:3,}}>
        <Grid item xs={12} md={8} lg={6.8} sx={{border:'2px solid #ecf2ff', borderRadius:2,marginRight:2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
          <Box>
            <Chart
              options={newChart.options}
              series={newChart.series}
              type="bar"
              // width="98%"
              // height="98%"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={5} sx={{border:'2px solid #ecf2ff',  borderRadius:2,boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
          <Box sx={{}}>
            <Chart
              options={pieChart.options}
              series={pieChart.series}
              type="donut"
              // width="98%"
              // height="100%"
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{height:'73vh',borderRadius:2,boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',marginTop:3,marginBottom:2,padding:2, overflow:'hidden'}}>
            <p style={{marginTop:5,fontWeight:'bolder'}}>Courses Overview</p>
            <hr style={{borderTop: '0.1px solid 	#F0F0F0'}}></hr>
            <Box sx={{ flexGrow: 1, marginBottom:3 }}>
              <AntDesignGrid />
            </Box>
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
