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
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function CourseCard({course}) {
  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{marginLeft:4}}>
        <Grid container spacing={5}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                minWidth: 380,
                backgroundColor: "white",
                marginBottom: 5,
                ":hover": {
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                },
                borderRadius: 6,
              }}
            >
              <img
                src={course.image}
                alt="5 Terre"
                style={{ borderRadius: 16 }}
                width={"100%"}
              />
              <Box
                sx={{
                  textAlign: "start",
                  paddingLeft: 3,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <LanguageIcon
                    fontSize="small"
                    sx={{
                      marginBottom: 2,
                      marginTop: 2.2,
                      marginRight: 1,
                      color: newtheme.palette.secondary.background,
                    }}
                  />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                      marginTop: 2,
                      color: newtheme.palette.secondary.footer,
                    }}
                  >
                    JAVA Course
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: 2,
                      marginTop: 1,
                      color: newtheme.palette.primary.background,
                      backgroundColor:newtheme.palette.secondary.footer,
                      padding:1,
                      borderRadius:8,
                      marginLeft:10,
                      display:'flex',
                      textAlign:'center'
                    }}
                  >
                  <PersonIcon fontSize='small' sx={{marginRight:1}}/>{course.student} Enrolled
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bolder", marginBottom: 4 }}
                >
                 {course.name}
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
                    fontSize="small"
                    sx={{
                      marginBottom: 2,
                      marginRight: 1,
                      color: newtheme.palette.secondary.background,
                    }}
                  />
                  <Typography sx={{ marginBottom: 2, fontSize: 16 }}>
                    {course.lectures} Lectures
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <QueryBuilderIcon
                    fontSize="small"
                    sx={{
                      marginBottom: 2,
                      marginRight: 1,
                      color: newtheme.palette.secondary.background,
                    }}
                  />
                  <Typography sx={{ marginBottom: 2, fontSize: 16 }}>
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
