import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import http from "../../../../Axios/axios";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { delAssignment } from "../../../../Axios/assigAxios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import { ThemeProvider } from "@mui/material/styles";
import newtheme from "../../../Themenew";
import BeatLoader from "react-spinners/BeatLoader";
import noCoursesImage from "../../../assets/noCourses.png"
import { FiArrowRightCircle } from "react-icons/fi";

const ViewUploadedAssig = () => {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const Assignmentid = aid;

  const [assig, setAssig] = React.useState({});
  const [file, setFile] = React.useState();
  const [isAssignmentViewed, setAssignmentViewed] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [isTeacher, setIsTeacher] = React.useState(false);
  const [isAlreadySubmitted, setIsSubmitted] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [noCourses, setNoCourses] = React.useState(false);

  //Teacher
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const getSubmission = async () => {
    try {
      setLoading(true);
      const res = await http.get(`/submit/isSubmitted/${Assignmentid}`);
      if (res.data.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false); // Set loading back to false when the API call completes
    }
  };

  useEffect(() => {
      setLoading(true);
      http.get(`/assignment/viewAssignment/${Assignmentid}`).then((response) => {
      setAssig(response.data.Viewassignment);
      setFile(response.data.PdfDataUrl);
      setQuestions(response.data.Viewquestions);
      setLoading(false);
    });

    const userJSON = localStorage.getItem("User");
    const user = JSON.parse(userJSON);
    if (user.user?.role == "Teacher") {
      setIsTeacher(true);
    } else {
      if (user.userID?.role == "Student") {
        getSubmission();

        setIsTeacher(false);
      }
    }
  }, [Assignmentid]);

  const handleAssignmentOpen = () => setAssignmentViewed(true);

  const handleAssignmentClose = () => setAssignmentViewed(false);


  //useeffect m usestate ayegi
  //1 use state to check role and render screen acc to it
  const theme = useTheme();

  // const[AssigNo,setAssigNo] = React.useState('')
  // const[Description,setDescription] = React.useState('assig.description')
  // const[uploadDate,setuploadDate] = React.useState('3/10/2023')
  // const[dueDate,setdueDate] = React.useState('7/10/2023')
  // const[marks,setMarks] = React.useState('10')
  // const[file,setFile] = React.useState('file')
  const uploadDate = assig.uploadDate;
  const udate = new Date(uploadDate);

  const formattedUploadDate = `${udate.getDate()}-${
    udate.getMonth() + 1
  }-${udate.getFullYear()}`;

  const DueDate = assig.dueDate;
  const ddate = new Date(DueDate);

  const formattedDueDate = `${ddate.getDate()}-${
    ddate.getMonth() + 1
  }-${ddate.getFullYear()}`;

  const handleDownload = () => {
    var downloadURL = file;
    const link = document.createElement("a");
    link.href = downloadURL;
    link.download = "assignment.pdf";
    link.click();
  };

  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{marginTop:10}}>
      <p style={{ fontWeight: 'bold', marginTop: 0, fontSize:25, marginLeft:9, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Assignment Details</span></p>
      </Box>
      {loading ? (
          <Box
          sx={{
            backgroundColor: "white",
            height:'80vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BeatLoader color="#1665b5"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : noCourses ? ( // Check if there are no courses
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          flexDirection:'column'
        }}
      >
        <Typography variant="h4">Not Found (Try connecting to internet)</Typography>
        <img src={noCoursesImage}  height={200} width={200}/>
      </Box>
    ) : ( 
      <Box
        className={`app ${toggled ? "toggled" : ""}`}
        sx={{
          display: "flex", marginTop:7, marginBottom:10, marginLeft:5, flexDirection:'column'
        }}
      >
        <Grid container>
          <Grid item xs={12} md={12} lg={7}>
            <Box sx={{ marginTop: 0, marginLeft: 2 }}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <p
                      style={{ fontWeight: "bolder", margin: 0, fontSize: 30 }}
                    >
                      Assignment : {assig.assignmentNumber}
                    </p>
                    <Box sx={{display:'flex', flexDirection:'row'}}>
                    <p style={{ marginTop: 6, fontSize: 16, color: "grey", marginRight:10 }}>
                      Due at {formattedDueDate} 
                    </p>
                    <p style={{ marginTop: 6, fontSize: 16, color: "red", }}>
                      (11:59 PM) 
                    </p>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <p style={{ fontWeight: "bold", fontSize: 18, margin: 0 }}>
                  Details
                </p>
                <p>{assig.description}</p>
              </Box>

              <Box sx={{ marginTop: 4 }}>
                <p style={{ fontSize: 18 }}>
                  {" "}
                  <b>File Extension: </b> {assig.format}
                </p>
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <p style={{ fontSize: 18 }}>
                  {" "}
                  <b>Assignment File </b>
                </p>
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "row", marginTop: "1%" }}
              >
                <Box sx={{ width: "60%" }}>
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={handleAssignmentOpen}
                  >
                    <Box
                      sx={{
                        border: 1,
                        padding: 2,
                        flexGrow: 1,
                        borderRight: 0,
                        borderRadius: 1,
                        color: newtheme.palette.secondary.footer,
                      }}
                    >
                      View Assignment
                    </Box>
                  </Link>
                  <Modal
                    open={isAssignmentViewed}
                    onClose={handleAssignmentClose}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={isAssignmentViewed}>
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          width: "90%",
                          maxWidth: "800px",
                          transform: "translate(-50%, -50%)",
                          bgcolor: "white",
                          boxShadow: 24,
                          p: 4,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          borderRadius: "25px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", paddingBottom: 1 }}
                          >
                            Assignment : {assig.assignmentNumber}
                          </Typography>
                          <Box sx={{ marginY: "1%" }}>
                            <Typography
                              variant="p"
                              sx={{ color: newtheme.palette.secondary.footer }}
                            >
                              {" "}
                              <b>Total Marks: </b> {assig.totalMarks}
                            </Typography>
                          </Box>
                        </Box>
                        {questions.map((question, index) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={{ my: "1%" }}>
                              <b> Question {index + 1} </b>
                              {question.questionDescription}
                            </Typography>
                            <Typography
                              sx={{
                                my: "1%",
                                color: newtheme.palette.secondary.footer,
                              }}
                            >
                              {`( ${question.questionTotalMarks} )`}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Fade>
                  </Modal>
                </Box>
                
                <Box sx={{ width: "30%" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      height: "100%",
                      backgroundColor: newtheme.palette.secondary.footer,
                      color: newtheme.palette.primary.background,
                      ":hover": {
                        backgroundColor: newtheme.palette.secondary.footer,
                        color: newtheme.palette.primary.background,
                      },
                    }}
                    onClick={handleDownload}
                  >
                    {<FileDownloadOutlinedIcon />}
                  </Button>
                </Box>
              </Box>
              
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={5}>
            <Box sx={{ marginTop:0 }}>
              <Box>
                    <p
                      style={{ fontWeight: "bolder", margin: 0, fontSize: 18 }}
                    >
                      Marks
                    </p>
                    <p style={{ marginTop: 6, fontSize: 16, color: "grey" }}>
                      Total Points: {assig.totalMarks}
                    </p>
                  </Box>
            </Box>
            <Box sx={{marginTop:3}}>
              <p style={{ fontWeight: "bolder", margin: 0, fontSize: 18 }}>Instruction to follow</p>
              <p style={{ fontSize: 16,fontStyle:'italic', color:'grey'}}>• Submit the file in required file extension.</p>
              <p style={{ fontSize: 16,fontStyle:'italic', color:'grey'}}>• After Selecting the file click on Grade button for quick feedback</p>
              <p style={{ fontSize: 16,fontStyle:'italic', color:'grey'}}>• You can also leave any question Empty.</p>
              <p style={{ fontSize: 16,fontStyle:'italic', color:'grey'}}>• All Questions carry equal marks</p>
              <p style={{ fontSize: 16,fontStyle:'italic', color:'grey'}}>• Click on Submit to Start the assesment.</p>
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ display: "flex",flexDirection:'row', justifyContent: "center", marginTop:3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<FiArrowRightCircle fontSize={25}/>}
                  sx={{
                    padding: 2,
                    fontSize: 16,
                    borderRadius: 8,
                    marginTop: "3%",
                    paddingRight: "2%",
                    paddingLeft: "2%",
                    backgroundColor: newtheme.palette.secondary.footer,
                    color: newtheme.palette.primary.background,
                    ":hover": {
                      color: newtheme.palette.secondary.footer,
                      backgroundColor: newtheme.palette.primary.background,
                      border:1
                    },
                  }}
                  onClick={() =>
                    navigate(
                      isTeacher
                        ? `/Teacher/ViewSubmittedAssigList`
                        : isAlreadySubmitted
                        ? `/Student/Result/${assig._id}`
                        : `/Student/SubmitAssignment/${assig._id}`,
                      {
                        state: {
                          Questions: questions,
                          format: assig.format,
                          courseID: cid,
                        },
                      }
                    )
                  }
                >
                  {isTeacher
                    ? "View Submissions"
                    : isAlreadySubmitted
                    ? "View Result"
                    : "Submit Assignment"}
                </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )}
    </ThemeProvider>
  );
};
export default ViewUploadedAssig;
