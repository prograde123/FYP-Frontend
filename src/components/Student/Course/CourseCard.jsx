import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import newtheme from "../../../Themenew";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DescriptionIcon from "@mui/icons-material/Description";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useNavigate } from 'react-router-dom';

function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{ marginLeft: 4, cursor: "pointer" }} onClick={() => {
            navigate("/Student/ViewCourse/" + course._id, {
              state: { course: course },
            });
          }}>
        <Grid
          container
          spacing={5}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: 390,
                backgroundColor: "white",
                marginBottom: 5,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                ":hover": {
                  boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px;",
                },
                borderRadius: 6,
              }}
            >
              <Box sx={{ position: "relative", color: "white" }}>
                <img
                  src={course.image}
                  alt="5 Terre"
                  style={{ borderRadius: 16, opacity: 0.85 }}
                  width={390}
                  height={260}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 16,
                    backgroundColor: newtheme.palette.secondary.background,
                    padding: 1.3,
                    borderRadius: 8,
                  }}
                >
                  <HowToRegOutlinedIcon />
                </Box>
                <Box sx={{ position: "absolute", bottom: 8, right: 16 }}>
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
                        backgroundColor: newtheme.palette.secondary.footer,
                        padding: 1.5,
                        borderRadius: 6,
                      }}
                    >
                      <Diversity3OutlinedIcon sx={{ marginRight: 1 }} />
                      <Typography sx={{ fontWeight: "bolder" }}>
                        {course.student} Students
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
                  <LanguageIcon
                    fontSize="medium"
                    sx={{
                      marginBottom: 2,
                      marginTop: 2.2,
                      marginRight: 1,
                      color: newtheme.palette.secondary.footer,
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 0.5,
                      marginTop: 2.3,
                      color: newtheme.palette.secondary.footer,
                    }}
                  >
                    {course.language} Course
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bolder", marginBottom: 1 }}
                >
                  {course.name}
                </Typography>
                <Typography className="cut-off-text" sx={{ marginBottom: 2 }}>
                  {course.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  textAlign: "start",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                  marginRight: 4,
                  paddingLeft: 1.5,
                  marginLeft: 1,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <DescriptionIcon
                    fontSize="medium"
                    sx={{
                      marginBottom: 2,
                      marginRight: 1,
                      color: newtheme.palette.secondary.footer,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: "bolder",
                      color: newtheme.palette.secondary.footer,
                    }}
                  >
                    {course.lectures} Lectures
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <QueryBuilderIcon
                    fontSize="medium"
                    sx={{
                      marginBottom: 2,
                      marginRight: 1,
                      color: newtheme.palette.secondary.footer,
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "bolder",
                      color: newtheme.palette.secondary.footer,
                      fontSize: 16,
                    }}
                  >
                    {course.credits} Credits
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default CourseCard;
