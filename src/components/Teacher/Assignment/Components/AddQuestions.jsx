import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import http from "../../../../../Axios/axios";
import { CgAddR } from "react-icons/cg";
import { GiConfirmed } from "react-icons/gi";

import { RiDeleteBin5Line } from "react-icons/ri";

export default function AddQuestion({ currentQuestion, totalQuestions, assig, courseID }) {
  
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(currentQuestion);
  const [question, setQuestion] = useState('');
  const [questionTotalMarks, setQuestionTotalMarks] = useState(0);
  const [isTestcaseArray, setIsTestcaseArray] = useState(false);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const navigate = useNavigate();
  const theme = useTheme();


  const handleAddTestCase = () => {
    // Adding new test case
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleRemoveTestCase = (index) => {
    // Remove the test case at the specified index
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };
  const handleSold = (event) => {
    setIsTestcaseArray(event.target.checked);
      };
const handleClick = async () => {
  if (testCases[0].input !== "" && testCases[0].output !== "" && question !== "") {
    const newQuestion = {
      questionDescription: question,
      questionTotalMarks: questionTotalMarks,
      testCases: testCases.map((testCase) => ({
        input: isTestcaseArray ? parseInput(testCase.input) : testCase.input,
        output: testCase.output,
      })),
      isInputArray: isTestcaseArray,
    };

    console.log("new question ", newQuestion);

    questions.push(newQuestion);

    console.log("questions", questions);

    setQuestion('');
    setQuestionTotalMarks(0);
    setIsTestcaseArray(false);
    setTestCases([{ input: "", output: "" }]);

    setQuestionNumber(questionNumber + 1);

    if (questionNumber === totalQuestions - 1) {
      const response = await http.post("/assignment/addAssignment", { questions, assig });
      if (response.data.success) {
        alert("Assignment Created Successfully");
        navigate(`/Teacher/ViewUploadedAssigList/${courseID}`);
      }
    }
  } else {
    alert("Please enter at least 1 test case, question, and total marks");
  }
};


const parseInput = (input) => {
  try {
    const parsedInput = JSON.parse(input);
    
    
    if (Array.isArray(parsedInput)) {
      return parsedInput;
    }
  } catch (error) {
    
    return [input];
  }
};





  return (
   <Box sx={{marginLeft:2,marginRight:2}}>
    <p style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 1, fontSize:25, display:'flex', flexDirection:'row',justifyContent:'center' }}><span className='underline'>Add Questions</span> </p>
     <Box sx={{ display: 'flex',marginTop:3,marginBottom:5, flexDirection: 'column', backgroundColor: 'white', borderRadius: 2, paddingLeft: 5, paddingRight: 5,boxShadow: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}>
     <Grid container spacing={2} sx={{ marginTop:2}}>
        <p style={{fontWeight:'bold',fontSize:20,marginLeft:15,marginTop:0,marginBottom:0}}>
            Write Description of Question # {questionNumber + 1}
        </p>
        <Grid item lg={12}>
            <TextField
                style={{width: "100%"}}
                value={question}
                color='secondary'
                multiline
                rows={3}
                onChange={(e) => setQuestion(e.target.value)}
                label="Enter Question"
            />
        </Grid>
        <Grid item lg={6}>
        <p style={{fontWeight:'bold',fontSize:18,marginTop:10,marginBottom:15}}>
            Question Marks*
        </p>
            <TextField
                style={{width: "100%"}}
                value={questionTotalMarks}
                onChange={(e) => setQuestionTotalMarks(e.target.value)}
                label="Enter Question Marks"
                color='secondary'
                type='number'
            />
        </Grid>
        <Grid item lg={6}>
          <Box sx={{marginLeft:7}}>
            <p style={{fontWeight:'bold',fontSize:18,marginTop:10,marginBottom:0}}>
                Select Box for Input Array
            </p>
            <FormControlLabel
                sx={{paddingTop:1}}
                label="Is Input Array?"
                control={<Checkbox checked={isTestcaseArray} onChange={handleSold} color='secondary' />}
            />
          </Box>
        </Grid>
      {testCases.map((testCase, index) => (
        <Grid item lg={4} md={3} sm={4} xs={12} key={index}>
          <Box sx={{display:'flex', flexDirection:'row'}}>
            <Box sx={{marginRight:2}}>
              <p style={{fontWeight:'bold',fontSize:18,marginTop:0}}>Testcase Input</p>
              <TextField sx={{marginBottom:2}}
                value={testCase.input}
                onChange={(e) => {
                  const updatedTestCases = [...testCases];
                  updatedTestCases[index].input = e.target.value;
                  setTestCases(updatedTestCases);
                }}
                label="Enter Input"
                color="secondary"
              />
            </Box>
            <Box>
            <p style={{fontWeight:'bold',fontSize:18,marginTop:0}}>Testcase Output</p>
            <TextField
              value={testCase.output}
              onChange={(e) => {
                const updatedTestCases = [...testCases];
                updatedTestCases[index].output = e.target.value;
                setTestCases(updatedTestCases);
              }}
              label="Expected Output"
              color="secondary"
            />

            </Box>
          </Box>
          <IconButton onClick={() => handleRemoveTestCase(index)}>
            <RiDeleteBin5Line style={{color:theme.palette.secondary.main, fontSize:28,marginTop:0}} />
          </IconButton>
        </Grid>
      ))}
      <Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddTestCase}
        sx={{
          mx: { lg: 3, md: 3, sm: 3, xs: "auto" },
          mt: 6.5,
          padding:2,borderRadius:5
        }}
        startIcon={<CgAddR/>}
      >
       Add
      </Button>
      </Box>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <Button
          onClick={handleClick}
          disabled = {questionNumber >= totalQuestions ? true : false}
          sx={{
            color: theme.palette.primary.background,
            backgroundColor: theme.palette.secondary.main,
            ":hover": {
              backgroundColor: theme.palette.primary.background,
              color: theme.palette.secondary.main,
              border:1
            },
            borderRadius: 3,
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 2,
            paddingBottom: 2,
            marginBottom:3,
            borderColor: theme.palette.secondary.Button,
            width:'50%',
            fontWeight:'bold'
          }}
          endIcon={<GiConfirmed style={{}}/>}
        >
          {questionNumber === (totalQuestions - 1) ? "Confirm Assignemnt" : "Next Question"}
        </Button>
      </Grid>
    </Grid>
     </Box>
   </Box>
  );
}
