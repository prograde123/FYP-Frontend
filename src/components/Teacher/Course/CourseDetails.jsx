import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function CourseDetails({ courses }) {
    const theme = useTheme()
    const navigate = useNavigate();
    const location = useLocation();

    const [Code, setCode] = React.useState('')
    const [Cname, setCname] = React.useState('')
    const [Description, setCDescription] = React.useState('')
    const [Cphoto, setCphoto] = React.useState("")
    const [creditHours, setcreditHours] = React.useState()
    const [language, setLanguage] = React.useState('')
    const [Sdate, setSdate] = React.useState('')
    const [Ldate, setLdate] = React.useState('')
    const [instructor, setInstructor] = React.useState('')

    const course = location.state.course
    useEffect(() => {

        setCode(course.courseCode)
        setCname(course.name)
        setCDescription(course.description)
        setCphoto(course.image)
        setcreditHours(course.creditHours)
        setLanguage(course.language)
        setSdate(course.startingDate)
        setLdate(course.endingDate)
        setInstructor(course.teacher.user.fullName)
    })

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 2 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2 }}>Course Details</Typography>
            </Box>
            <Box >
                <Grid container spacing={2} sx={{ marginBottom: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Grid item={true} xs={4}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 2, color: theme.palette.secondary.main, }}>Course Code: {Code}</Typography>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 2, color: theme.palette.secondary.main, }}>Course: {Cname}</Typography>
                    </Grid>
                    <Grid item={true} xs={8}>
                        <Stack spacing={1} direction="row">
                            <Card onClick={() => {
                                navigate("/Teacher/ContentList/" + course._id, {
                                    state: { course: course },
                                });
                            }} sx={{ minWidth: "9%", height: 100, borderRadius: 4, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.background }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img height={25} width={50} src='https://cdn-icons-png.flaticon.com/512/1180/1180877.png' />
                                        <Typography>Lecture Contents</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card onClick={() => {
                                navigate("/Teacher/AddCourseContent/" + course._id, {
                                    state: { course: course },
                                });
                            }} sx={{ minWidth: "9%", height: 100, borderRadius: 4, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.background }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img height={25} width={50} src='https://cdn1.iconfinder.com/data/icons/school-225/512/Notebook-512.png' />
                                        <Typography>Add new Contents</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card onClick={() => navigate('/Teacher/StudentList')} sx={{ minWidth: "9%", height: 100, borderRadius: 4, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.background }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img height={25} width={50} src='https://cdn-icons-png.flaticon.com/512/2799/2799142.png' />
                                        <Typography>Students Enrolled</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card onClick={() => navigate('/Teacher/StudentRequests')} sx={{ minWidth: "9%", height: 100, borderRadius: 4, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.background }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img height={25} width={50} src='https://cdn-icons-png.flaticon.com/512/2003/2003257.png' />
                                        <Typography>Enrollment Requests</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card onClick={() => navigate('/Teacher/AddAssignment')} sx={{ minWidth: "9%", height: 100, borderRadius: 4, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.background }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img height={25} width={50} src='https://cdn-icons-png.flaticon.com/512/2038/2038022.png' />
                                        <Typography>Create Assignment</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card onClick={() => navigate('/Assignment/ViewUploadedAssigList')} sx={{ minWidth: "9%", height: 100, borderRadius: 4, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.background }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img height={25} width={50} src='https://img.freepik.com/free-icon/calendar_318-932889.jpg?w=2000' />
                                        <Typography>View All Assignment</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card onClick={() => navigate('/Teacher/ViewSubmittedAssigList')} sx={{ minWidth: "9%", height: 100, borderRadius: 4, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.background }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <img height={25} width={50} src='https://cdn-icons-png.flaticon.com/512/2680/2680985.png' />
                                        <Typography>Assignment Submission</Typography>
                                    </Box>
                                </CardContent>
                            </Card>



                        </Stack>
                    </Grid>
                </Grid>
                <Box >
                    <Grid container spacing={2}  >
                        <Grid item={true} xs={12}>
                            <Stack spacing={2} >
                                <Card sx={{ minWidth: "49%", height: "58vh", border: "2px solid purple", borderRadius: 12 }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: theme.palette.secondary.main }}>
                                            <Box sx={{ marginTop: 5, }}>
                                                <img height={300} width={300} src={Cphoto} style={{ border: "2px solid purple", borderRadius: 12 }} />
                                            </Box>
                                            <Box sx={{ width: "70%", marginTop: 5, marginLeft: 4, marginRight: 2, display: 'flex', flexDirection: 'column', color: theme.palette.primary.main }}>
                                                <Typography gutterBottom variant="body" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                                                    {Description}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                                                    Instructor: {instructor}
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", color: theme.palette.secondary.main }}>
                                                    <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                                                        Credit Hours: {creditHours}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                                                        Language: {language}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", color: theme.palette.secondary.main }}>
                                                    <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                                                        Started At: {Sdate}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                                                        Ending At: {Ldate}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                        </Box>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default CourseDetails;
