import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AssignmentCard from "./AssignmentData/AssignmentCard";
import python from "../../../../assets/python.png";
import { useParams } from "react-router-dom";
import http from "../../../../../Axios/axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import newtheme from "../../../../Themenew";
import { ThemeProvider } from "@mui/material/styles";
import { MdRunningWithErrors } from "react-icons/md";
import { TbCalendarDue } from "react-icons/tb";
import PastAssignmentCard from "./AssignmentData/PastAssignmentCard";
import BeatLoader from "react-spinners/BeatLoader";
import noCoursesImage from "../../../../assets/noCourses.png";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Assignments = () => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [noCourses, setNoCourses] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { id } = useParams();

  const [assignments, setAssignments] = useState(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await http.get(`/assignment/viewAssigList/${id}`);
      setAssignments(response.data.assignments);

      if (response.data.assignments.length === 0) {
        setNoCourses(true); // Set noCourses to true if there are no courses
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <ThemeProvider theme={newtheme}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginBottom: 10 }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Tabs
              color="secondary"
              sx={{}}
              value={value}
              onChange={handleChange}
              aria-label="icon label tabs example"
            >
              <Tab
                icon={<TbCalendarDue fontSize={25} />}
                label="Due Assignments"
                sx={{
                  marginRight: 7,
                  color: newtheme.palette.secondary.footer,
                }}
              />
              <Tab
                icon={<MdRunningWithErrors fontSize={25} />}
                label="Past Due"
                color="black"
                sx={{
                  marginRight: 7,
                  color: newtheme.palette.secondary.footer,
                }}
              />
            </Tabs>
          </Box>
          <hr
            style={{ borderTop: 1, color: "divider", width: "99%", margin: 0 }}
          ></hr>
          <Grid container sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          {loading ? (
            <Box
              sx={{
                backgroundColor: "white",
                height: "80vh",
                width:'160vh',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BeatLoader
                color="#1665b5"
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
                width:'160vh',
                flexDirection: "column",
              }}
            >
              <Typography variant="h4">You're All Caught Up!</Typography>
              <img src={noCoursesImage} height={200} width={200} />
            </Box>
          ) : (
            <CustomTabPanel value={value} index={0}>
              <Box>
                {assignments &&
                  assignments.map((assignment) => {
                    return (
                      <AssignmentCard Assignment={assignment} CourseId={id} />
                    );
                  })}
              </Box>
            </CustomTabPanel>
          )}
          </Grid>
          

          <Grid container sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          <CustomTabPanel value={value} index={1}>
            <Box>
              {assignments &&
                assignments.map((assignment) => {
                  return (
                    <PastAssignmentCard Assignment={assignment} CourseId={id} />
                  );
                })}
            </Box>
          </CustomTabPanel>
          </Grid>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Assignments;
