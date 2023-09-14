import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import newtheme from "../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Aos from "aos";
import Grid from "@mui/material/Grid";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import { Paper } from "@mui/material";
import http from "../../../../Axios/axios";
import { useTheme } from "@emotion/react";
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { ImStatsBars } from 'react-icons/im';

function EnrollCourseCard({ card }) {
    
    async function sendRequest(id) {
        const user = JSON.parse(localStorage.getItem('User'))
        console.log(user)
        try {
          const response = await http.put('/course/sendRequest/'+ card._id + '/'  + user._id)
        } catch (e) {
          console.log(e);
        }
    }
    const theme = useTheme()
    const [isProfileOpen, setProfileOpen] = React.useState(false);
    const handleProfileOpen = () => setProfileOpen(true);
    const handleProfileClose = () => setProfileOpen(false);


  return (
    <Box sx={{display:'flex', flexDirection:'row',justifyContent:'center', marginLeft:5,}}>
        <Grid container  sx={{ display: "flex", flexDirection: "row" }}>
      <Grid item xs={12} md={12} lg={12}  sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom:10
            }}>
        <Box sx={{ width: 330, height: "55vh" }} >
          <Box
            sx={{
              backgroundColor: "white",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              ":hover": {
                boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px;",
              },
              borderRadius: 2,
              border: "1px solid #f0f0f0",
            }}
          >
            <Box sx={{ position: "relative", color: "white" }}>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <img
                src={card.image}
                alt="5 Terre"
                style={{ borderRadius: 6, opacity: 0.6, border:'1px solid grey', marginTop:20 }}
                width={280}
                height={200}
              />

              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: 33,
                  color: newtheme.palette.primary.main,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bolder", marginBottom: 1 }}
                >
                  Programming
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginRight: 3,
                    }}
                  >
                    <CalendarMonthIcon sx={{ marginRight: 1 }} />
                    <Typography sx={{ fontWeight: "bolder" }}>
                      28-06-2023
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <QueryBuilderIcon sx={{ marginRight: 1 }} />
                    <Typography sx={{ fontWeight: "bolder" }}>
                      {card.creditHours} Credits
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "start",
                paddingLeft: 3,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{display:'flex', flexDirection:'row',marginTop:2}}>
                  <ImStatsBars fontSize='22' style={{color:'#ffd350',marginRight:7}}/>
                  <p style={{margin:0, fontSize:15, marginRight:7}}>Beginner</p>
                </Box>
                <LanguageIcon
                  fontSize="small"
                  sx={{
                    marginBottom: 2.2,
                    marginTop: 2,
                    marginRight: 1,
                    color:'#ffd350',
                  }}
                />
                <p
                  style={{
                    fontSize:15,
                  }}
                >
                  {card.language}
                </p>
              </Box>

              <Typography
                variant="h6"
                sx={{ fontWeight: "bolder", marginBottom: 1 }}
              >
                {card.name}
              </Typography>
              <Typography
                className="cut-off-text"
                sx={{ marginRight: 1, marginBottom: 2 }}
              >
                {card.description}
              </Typography>
            </Box>
            <Box
              sx={{
                textAlign: "start",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 0,
                marginTop: 2,
                paddingTop: 2,
                paddingLeft: 1.5,
                backgroundColor: "#f0f0f0",
                borderBottomRightRadius: 6,
                borderBottomLeftRadius: 6,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Diversity3OutlinedIcon
                  fontSize="medium"
                  sx={{
                    marginBottom: 2,
                    marginRight: 1,
                    marginLeft: 2,
                    color: newtheme.palette.secondary.footer,
                  }}
                />
                <Typography
                  sx={{
                    marginBottom: 2,
                    fontSize: 16,
                    fontWeight: "bolder",
                    color: newtheme.palette.secondary.footer,
                  }}
                >
                  50 Students
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }} onClick={() => {sendRequest()}} >
                <Typography onClick={handleProfileOpen}
                  sx={{
                    marginBottom: 2,
                    fontSize: 16,
                    fontWeight: "bolder",
                    color: newtheme.palette.secondary.background,
                    cursor:'pointer',
                  }}
                  
                >
                  Enroll Now
                </Typography>
                <KeyboardDoubleArrowRightOutlinedIcon
                  fontSize="medium"
                  sx={{
                    marginBottom: 2,
                    marginRight: 1,
                    color: newtheme.palette.secondary.background,
                  }}
                />
                 <Modal
                            open={isProfileOpen}
                            onClose={handleProfileClose}
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                            }}>
                            <Fade in={isProfileOpen}>
                            <Box
                                sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '90%',
                                maxWidth: '400px',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: theme.palette.primary.background,
                                boxShadow: 24,
                                p: 4,
                                borderRadius: '5%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                }}
                            >
                                <Typography id="transition-modal-description" sx={{}}>
                                {/* Content of the modal */}
                                <Box
                                    sx={{
                                    
                                    border: 1,
                                    borderColor: theme.palette.secondary.main,
                                    borderRadius: 5,
                                    }}
                                >
                                    <Box onClick={()=>{navigate('/TeacherSignUp')}} sx={{ textDecoration: 'none', textAlign: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                        textAlign: 'center',
                                        color: "black",
                                        paddingLeft: 4,
                                        paddingRight: 4,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                        }}
                                    >
                                        Request has been sent Successfully!
                                    </Typography>
                                    </Box>
                                </Box>
                              </Typography>
                              </Box>
                      </Fade>
                 </Modal>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
    </Box>
  );
}

export default EnrollCourseCard;
