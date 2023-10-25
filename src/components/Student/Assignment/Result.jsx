import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";
import http from "../../../../Axios/axios";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeProvider } from "@mui/material/styles";
import newtheme from "../../../Themenew";

const Result = () => {
  const { aid } = useParams();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noCourses, setNoCourses] = useState(false);
  const theme = useTheme();

  const [sumObtainedMarks, setObtainedMarks] = useState(0);
  const [sumTotalMarks, setSumTotalMarks] = useState(0);
  function getRandom ( ){
    return Math.random
  }  
  
  const getSubmission = async () => {
    try {
      setLoading(true);
      const submissions = await http.get("/submit/getSubmissions", {
        params: { assignmentId: aid },
      });
      setResult(submissions.data.formattedResponse);

      let sumO = 0;
      let sumT = 0;
      for (const submission of submissions.data.formattedResponse) {
        sumO += submission.ObtainedMarks;
        sumT += submission.TotalMarks;
      }
      setObtainedMarks(sumO);
      setSumTotalMarks(sumT);
      console.log(sumObtainedMarks);
      console.log(sumTotalMarks);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false); // Set loading back to false when the API call completes
    }
  };

  useEffect(() => {
    getSubmission();
  }, []);

  return (
    <>
      <ThemeProvider theme={newtheme}>
      <Box>
        <p
          style={{
            fontWeight: "bold",
            marginTop: 5,
            fontSize: 25,
            marginLeft: 9,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span className="underline">Assignment Results</span>
        </p>
      </Box>

      {loading ? (
        <Box
          sx={{
            backgroundColor: "white",
            height: "80vh",
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
      ) : noCourses ? ( // Check if there are no results
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">No Results Found</Typography>
          <img src={noCoursesImage} height={200} width={200} />
        </Box>
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            p: 3,
          }}
        >
          <Box sx={{ marginBottom: 3 }}>
            {result && result.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ marginLeft: 5, fontWeight: "bold", color: "red" }}
                  >
                    {" "}
                    Obtained Marks : {sumObtainedMarks}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ marginRight: 5, fontWeight: "bold" }}
                  >
                    {" "}
                    Total Marks : {sumTotalMarks}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {result &&
            result.length > 0 &&
            result.map((res, index) => (
              <Box
                className="zoom"
                sx={{
                  minHeight: "35vh",
                  cursor: "pointer",
                  borderRadius: 5,
                  marginLeft: 3,
                  marginRight: 3,
                  marginBottom: 4,
                  paddingBottom: 2,
                  boxShadow:
                    "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
                }}
              >
                <div key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ marginLeft: 3.5, marginRight: 3, marginTop: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {" "}
                        Question # {index + 1}
                      </Typography>
                      <Typography sx={{ fontSize: 17, marginLeft:0.5 }}>
                        {res.questionDescription}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          marginTop: 3,
                          marginRight: 3,
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        Question Marks: {res.TotalMarks}
                      </Typography>
                      <Typography sx={{ marginRight: 3, fontSize: 16 }}>
                        {" "}
                        Obtained Marks: {res.ObtainedMarks}/{res.TotalMarks}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ marginLeft: 3, marginTop: 2, marginRight: 3 }}>
  {res.testResults.map((testResult, index) => (
    <React.Fragment key={testResult._id}>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon sx={{ color: newtheme.palette.secondary.footer }} />
          }
          aria-controls={`panel${index + 1}-content`}
          id={`panel${index + 1}-header`}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Test Case {index + 1}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "30%" }}>
              <Typography variant="body1">
                <span style={{fontWeight:'bold'}}>Input:</span>{" "}
                {testResult.isHidden ? "Hidden" : testResult.testCase.input}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography variant="body1">
              <span style={{fontWeight:'bold'}}>Expected Output:</span>{" "}
                <pre>{testResult.isHidden ? "Hidden" : testResult.testCase.output}</pre>
              </Typography>
            </Box>
            {testResult.actualOutput ? (
              <Box sx={{ width: "50%" }}>
                <Typography variant="body1">
                <span style={{fontWeight:'bold'}}>Your Output:</span> <pre>{testResult.actualOutput}</pre>
                </Typography>
              </Box>
            ) : null}
            {testResult.errorOutput !== "" && (
              <Box sx={{ width: "80%" }}>
                <Typography variant="body1">
                <span style={{fontWeight:'bold'}}>Error Output:</span> {testResult.errorOutput}
                </Typography>
              </Box>
            )}
            <Box sx={{ width: "20%" }}>
              <Typography variant="body1">
              <span style={{fontWeight:'bold'}}>Passed:</span> {testResult.passed ? "Yes" : "No"}
              </Typography>
            </Box>
            
          </Box>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  ))}
</Box>

                  
                </div>
              </Box>
            ))}
        </Box>
      )}
      </ThemeProvider>
    </>
  );
};

export default Result;
