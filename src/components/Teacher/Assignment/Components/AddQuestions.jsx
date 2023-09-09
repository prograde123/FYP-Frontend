import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import http from "../../../../../Axios/axios";

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
      testCases: testCases,
      isInputArray: isTestcaseArray,
    };

    console.log("new question " , newQuestion);

    questions.push(newQuestion);


    console.log("questions", questions)

    setQuestion('');
    setQuestionTotalMarks(0);
    setIsTestcaseArray(false);
    setTestCases([{ input: "", output: "" }]);
    
    setQuestionNumber(questionNumber + 1);

    if (questionNumber === totalQuestions - 1) {
     
      const respose  = await http.post("/assignment/addAssignment", { questions, assig });
      if(respose.data.success){
        alert("Assignment Created Successfully");
        navigate(`/Teacher/ViewUploadedAssigList/${courseID}`);
      }
    }
  } else {
    alert("Please enter at least 1 test case, question, and total marks");
  }
};



  return (
    <Grid container spacing={2} sx={{ padding: "2%" }}>
        <Typography>
            Q # {questionNumber + 1}
        </Typography>
        <Grid item lg={12}>
            <TextField
                style={{width: "100%"}}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                label="Enter Question"
            />
        </Grid>
        <Grid item lg={6}>
            <TextField
                style={{width: "100%"}}
                value={questionTotalMarks}
                onChange={(e) => setQuestionTotalMarks(e.target.value)}
                label="Enter Question Marks"
                type='number'
            />
        </Grid>
        <Grid item lg={6}>
        <FormControlLabel
            sx={{paddingTop:1}}
            label="Is Input Array?"
            control={<Checkbox checked={isTestcaseArray} onChange={handleSold} />}
        />
        </Grid>
      {testCases.map((testCase, index) => (
        <Grid item lg={2} md={3} sm={4} xs={12} key={index}>
          <TextField
            value={testCase.input}
            onChange={(e) => {
              const updatedTestCases = [...testCases];
              updatedTestCases[index].input = e.target.value;
              setTestCases(updatedTestCases);
            }}
            label="Input"
          />
          <TextField
            value={testCase.output}
            onChange={(e) => {
              const updatedTestCases = [...testCases];
              updatedTestCases[index].output = e.target.value;
              setTestCases(updatedTestCases);
            }}
            label="Output"
          />

          <IconButton onClick={() => handleRemoveTestCase(index)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      ))}
      <Button
        variant="contained"
        onClick={handleAddTestCase}
        sx={{
          mx: { lg: 3, md: 3, sm: 3, xs: "auto" },
          mb: 5,
          mt: 3,
          padding: 1,
        }}
      >
        Add Another Test Case
      </Button>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button
          onClick={handleClick}
          disabled = {questionNumber >= totalQuestions ? true : false}
          sx={{
            color: theme.palette.secondary.text,
            backgroundColor: theme.palette.secondary.main,
            fontWeight: "bold",
            boxShadow: 10,
            my: 3,
            ":hover": {
              backgroundColor: theme.palette.secondary.hoverButton,
              color: theme.palette.secondary.main,
            },
            border: 1,
            borderRadius: 2,
            paddingLeft: 1,
            paddingRight: 1,
            paddingTop: 1,
            paddingBottom: 1,
            borderColor: theme.palette.secondary.Button,
            
          }}
        >
          {questionNumber === (totalQuestions - 1) ? "Confirm" : "Next Question"}
        </Button>
      </Grid>
    </Grid>
  );
}
