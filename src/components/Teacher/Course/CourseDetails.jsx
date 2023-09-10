import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import LanguageIcon from "@mui/icons-material/Language";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function CourseDetails({ courses }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [Code, setCode] = React.useState("");
  const [Cname, setCname] = React.useState("");
  const [Description, setCDescription] = React.useState("");
  const [Cphoto, setCphoto] = React.useState("");
  const [creditHours, setcreditHours] = React.useState();
  const [language, setLanguage] = React.useState("");
  const [Sdate, setSdate] = React.useState("");
  const [Ldate, setLdate] = React.useState("");
  const [instructor, setInstructor] = React.useState("");

  const course = location.state.course;
  const id = location.pathname.split("/").pop();
  useEffect(() => {
    setCode(course.courseCode);
    setCname(course.name);
    setCDescription(course.description);
    setCphoto(course.image);
    setcreditHours(course.creditHours);
    setLanguage(course.language);
    setSdate(course.startingDate);
    setLdate(course.endingDate);
    setInstructor(course.teacher.user.fullName);
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <p
          style={{ fontWeight: "bold", marginBottom: 13, marginTop: 1, fontSize:25 }}
        >
          Course Details
        </p>
      </Box>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid item={true} xs={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
                color: theme.palette.secondary.main,
              }}
            >
              <span style={{ color: theme.palette.primary.main }}>
                Course Code:
              </span>{" "}
              {Code}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: 2,
                color: theme.palette.secondary.main,
              }}
            >
              <span style={{ color: theme.palette.primary.main }}>
                Course Name:
              </span>{" "}
              {Cname}
            </Typography>
          </Grid>
          <Grid item={true} xs={8}>
            <Stack spacing={1} direction="row">
              <Card
                onClick={() => {
                  navigate("/Teacher/ContentList/" + course._id, {
                    state: { course: course },
                  });
                }}
                sx={{
                  minWidth: "9%",
                  height: 100,
                  borderRadius: 4,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      height={25}
                      width={50}
                      src="https://cdn-icons-png.flaticon.com/512/1180/1180877.png"
                    />
                    <Typography>Lecture Contents</Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card
                onClick={() => {
                  navigate("/Teacher/AddCourseContent/" + course._id, {
                    state: { course: course },
                  });
                }}
                sx={{
                  minWidth: "9%",
                  height: 100,
                  borderRadius: 4,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      height={25}
                      width={50}
                      src="https://cdn1.iconfinder.com/data/icons/school-225/512/Notebook-512.png"
                    />
                    <Typography>Add Lectures</Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card
                onClick={() => navigate("/Teacher/StudentList")}
                sx={{
                  minWidth: "9%",
                  height: 100,
                  borderRadius: 4,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      height={25}
                      width={50}
                      src="https://cdn-icons-png.flaticon.com/512/2799/2799142.png"
                    />
                    <Typography>Enrolled Students</Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card
                onClick={() => {
                  navigate("/Teacher/StudentRequests/" + course._id, {
                    state: { course: course },
                  });
                }}
                sx={{
                  minWidth: "9%",
                  height: 100,
                  borderRadius: 4,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      height={25}
                      width={50}
                      src="https://cdn-icons-png.flaticon.com/512/2003/2003257.png"
                    />
                    <Typography>Enrollment Requests</Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card
                onClick={() => navigate(`/Teacher/AddAssignment/${id}`)}
                sx={{
                  minWidth: "9%",
                  height: 100,
                  borderRadius: 4,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      height={25}
                      width={50}
                      src="https://cdn-icons-png.flaticon.com/512/2038/2038022.png"
                    />
                    <Typography>Create new Assignment</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card
                onClick={() => navigate(`/Teacher/ViewUploadedAssigList/${id}`)}
                sx={{
                  minWidth: "9%",
                  height: 100,
                  borderRadius: 4,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      height={25}
                      width={50}
                      src="https://img.freepik.com/free-icon/calendar_318-932889.jpg?w=2000"
                    />
                    <Typography>View All Assignment</Typography>
                  </Box>
                </CardContent>
              </Card>
              <Card
                onClick={() => navigate("/Teacher/ViewSubmittedAssigList")}
                sx={{
                  minWidth: "9%",
                  height: 100,
                  borderRadius: 4,
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.background,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      height={25}
                      width={50}
                      src="https://cdn-icons-png.flaticon.com/512/2680/2680985.png"
                    />
                    <Typography>Assignment Submission</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
        <Box>
          <Grid container spacing={2}>
            <Grid item={true} xs={12}>
              <Stack spacing={2}>
                <Box sx={{ minWidth: "49%", height: "51vh" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      color: theme.palette.secondary.main,
                    }}
                  >
                    <Box sx={{ marginTop: 2 }}>
                      <img
                        height={300}
                        width={300}
                        src={Cphoto}
                        style={{ border: "2px solid purple", borderRadius: 12 }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "70%",
                        marginTop: 2,
                        marginLeft: 4,
                        marginRight: 2,
                        display: "flex",
                        flexDirection: "column",
                        color: theme.palette.primary.main,
                      }}
                    >
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <AlignHorizontalLeftIcon
                          sx={{ marginRight: 2, marginTop: 1 }}
                        />
                        <Typography
                          gutterBottom
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            marginBottom: 3,
                            borderBottom: 1,
                            width: 140,
                          }}
                        >
                          Description
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          gutterBottom
                          variant="body"
                          sx={{
                            marginLeft: 5,
                            marginRight: 5,
                            fontWeight: "bold",
                            marginBottom: 3,
                            color: theme.palette.secondary.main,
                          }}
                        >
                          {Description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginTop: 2,
                        }}
                      >
                        <AccountBoxIcon sx={{ marginRight: 2, marginTop: 1 }} />
                        <Typography
                          gutterBottom
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            marginBottom: 3,
                            borderBottom: 1,
                            width: 140,
                          }}
                        >
                          Instructor
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          gutterBottom
                          variant="body"
                          sx={{
                            fontWeight: "bold",
                            marginBottom: 3,
                            marginLeft: 5,
                            color: theme.palette.secondary.main,
                          }}
                        >
                          {instructor}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          color: theme.palette.secondary.main,
                          marginTop: 2,
                        }}
                      >
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              marginRight: 3,
                              color: theme.palette.primary.main,
                            }}
                          >
                            <HourglassBottomIcon
                              sx={{ marginRight: 2, marginTop: 1 }}
                            />
                            <Typography
                              gutterBottom
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                marginBottom: 3,
                                borderBottom: 1,
                                width: 140,
                              }}
                            >
                              Credit Hours:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              gutterBottom
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                marginBottom: 3,
                                color: theme.palette.secondary.main,
                              }}
                            >
                              {creditHours}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              marginRight: 3,
                              color: theme.palette.primary.main,
                            }}
                          >
                            <LanguageIcon
                              sx={{ marginRight: 2, marginTop: 1 }}
                            />
                            <Typography
                              gutterBottom
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                marginBottom: 3,
                                borderBottom: 1,
                                width: 140,
                              }}
                            >
                              Language:
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              gutterBottom
                              variant="h6"
                              sx={{
                                fontWeight: "bold",
                                marginBottom: 3,
                                color: theme.palette.secondary.main,
                              }}
                            >
                              {language}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          color: theme.palette.secondary.main,
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          sx={{ fontWeight: "bold", marginBottom: 3 }}
                        >
                          <span style={{ color: theme.palette.primary.main }}>
                            Started At:
                          </span>{" "}
                          {Sdate}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          sx={{ fontWeight: "bold", marginBottom: 3 }}
                        >
                          <span style={{ color: theme.palette.primary.main }}>
                            Ending At:
                          </span>{" "}
                          {Ldate}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default CourseDetails;
