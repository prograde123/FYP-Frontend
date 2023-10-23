import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Radio, RadioGroup  } from "@mui/material";
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
import { FcAddImage } from 'react-icons/fc';
import { GrNotes } from 'react-icons/gr';
import { RiDeleteBin5Line } from "react-icons/ri";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ClipLoader from "react-spinners/ClipLoader";

const steps = [
  'Assignment Details',
  'Add Questions',
  'Create an Assignment',
];

export default function AddQuestion({ currentQuestion, totalQuestions, assig, courseID }) {
  
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(currentQuestion);
  const [question, setQuestion] = useState('');
  const [questionTotalMarks, setQuestionTotalMarks] = useState(0);
  const [isTestcaseArray, setIsTestcaseArray] = useState(false);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  //solution code only input test case
  const [inputTestCases, setInputTestCases] = useState([{ input: ""}]);
  const [file, setFile] = React.useState(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  console.log(assig)

  //for radio button testcase option
  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //checkbox for input array option
  const handleSold = (event) => {
    setIsTestcaseArray(event.target.checked);
  };

  const navigate = useNavigate();
  const theme = useTheme();

  const handleAddTestCase = () => {
    // Adding new test case
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleAddInput=()=>{
     // Adding new input test case
     setInputTestCases([...inputTestCases, { input: ""}]);
  }

  const handleRemoveInputTestCase = (index) => {
    // Remove the input test case at the specified index
    const updatedTestCases = [...inputTestCases];
    updatedTestCases.splice(index, 1);
    setInputTestCases(updatedTestCases);
  };

  const handleRemoveTestCase = (index) => {
    // Remove the test case at the specified index
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };

const handleClick = async () => {
  if(selectedOption === 'testcase'){
    if (
          testCases[0].input !== "" 
          && testCases[0].output !== "" 
          && question !== "" 
        ) {
      
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
        console.log("inside full questions questionNumber " , questionNumber)
        const response = await http.post("/assignment/addAssignment", { questions, assig });
        console.log("Assignment added successfully " , response.data.success)
        if (response.data.success) {
          alert("Assignment Created Successfully");
          navigate(`/Teacher/ViewUploadedAssigList/${courseID}`);
        }
      }
    } else {
      alert("Please enter at least 1 test case, question, and total marks \n Note : Question marks should be less than total Assignment Marks");
    }
  }
  else if(selectedOption === 'solutionCode'){
    
    if  (
      inputTestCases.length > 0 &&
      inputTestCases[0].input !== "" &&
      question !== "" &&
      file !== null
    ) { 
       const formData = new FormData();

       const FileSplit = file.name.split('.')   // q1.java  [q1, java]
       const FileFormat = `.${FileSplit[FileSplit.length - 1]}`

       console.log(assig.format)
      console.log(FileFormat)

      if(assig.format === FileFormat){

        formData.append('files', file);

     
        console.log(inputTestCases)

        let testCasesString;

        if(isTestcaseArray){
          testCasesString = JSON.stringify(inputTestCases.map((testCase) => ({
            input:  parseInput(testCase.input) 
          }))
          )
        }
        else{
          testCasesString =  JSON.stringify(inputTestCases)
        }

        
        

        let url;

        switch (
          FileFormat
        ) {
          case ".py":
            url =`/submit/getOutputPython/${testCasesString}/${isTestcaseArray}`
            break;
          case ".java":
            url = `/submit/getOutputJava/${testCasesString}/${isTestcaseArray}`
            break;
          case ".c":
            url = `/submit/getOutputC/${testCasesString}/${isTestcaseArray}`
            break;
          case ".cpp":
            url = `/submit/getOutputCpp/${testCasesString}/${isTestcaseArray}`
            break;
          default:
            break;
        }
       const res =  await http.post(url, formData,
          
          {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const testCases = res.data

        console.log(testCases)

        const newQuestion = {
          questionDescription: question,
          questionTotalMarks: questionTotalMarks,
          testCases: testCases.map((testCase) => ({
            input: Array.isArray(testCase.input) ? testCase.input : testCase.input,
            output: testCase.output,
          })),
          
          isInputArray: isTestcaseArray,
        };
    
        console.log("new question ", newQuestion);
    
        questions.push(newQuestion);
    
        console.log("questions ", questions);
    
        setQuestion('');
        setQuestionTotalMarks(0);
        setIsTestcaseArray(false);
        setTestCases([{ input: "", output: "" }]);
        setFile(null)
        setInputTestCases([ { inputs : ""}])
        setSelectedOption('')
        setQuestionNumber(questionNumber + 1);
        if (questionNumber === totalQuestions - 1) {
          console.log("inside full questions questionNumber " , questionNumber)
          const response = await http.post("/assignment/addAssignment", { questions, assig });
          console.log("Assignment added successfully " , response.data.success)
          if (response.data.success) {
            alert("Assignment Created Successfully");
            navigate(`/Teacher/ViewUploadedAssigList/${courseID}`);
          }
        }
      }

      else{
        alert('File format should be the same as of assignment \n Note : Question marks should be less than total Assignment Marks')
      }

     
  

    }
    else{
      alert('please fill required fields')
    }
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
    <p style={{ fontWeight: 'bold', marginBottom: 10, marginTop: 1, fontSize:25, display:'flex', flexDirection:'row',justifyContent:'center' }}><span className='underline'>Add Question</span> </p>
    {questionNumber !== (totalQuestions - 1) && (
            <>
              <Stepper activeStep={1} alternativeLabel sx={{marginTop:3}} >
          {steps.map((label) => (
            <Step key={label} sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'secondary.main', // circle color (COMPLETED)
              },
              '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                {
                  color: 'primary.main', // Just text label (COMPLETED)
                },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'secondary.main', // circle color (ACTIVE)
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                {
                  color: 'primary.main', // Just text label (ACTIVE)
                },
              '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                fill: 'primary.background', // circle's number (ACTIVE)
              },
            }}>
              <StepLabel sx={{color:'red'}}>{label}</StepLabel>
            </Step>
          ))}
    </Stepper>
            </>
    )}
    {questionNumber === (totalQuestions - 1) && (
            <>
              <Stepper activeStep={2} alternativeLabel sx={{marginTop:3}} >
          {steps.map((label) => (
            <Step key={label} sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'secondary.main', // circle color (COMPLETED)
              },
              '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                {
                  color: 'primary.main', // Just text label (COMPLETED)
                },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'secondary.main', // circle color (ACTIVE)
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                {
                  color: 'primary.main', // Just text label (ACTIVE)
                },
              '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                fill: 'primary.background', // circle's number (ACTIVE)
              },
            }}>
              <StepLabel sx={{color:'red'}}>{label}</StepLabel>
            </Step>
          ))}
    </Stepper>
            </>
    )}
     <Box sx={{ display: 'flex',marginTop:3,marginBottom:5, flexDirection: 'column', backgroundColor: 'white', borderRadius: 2, paddingLeft: 5, paddingRight: 5,boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset' }}>
     <Grid container spacing={2} sx={{ marginTop:2}}>
        <p style={{fontWeight:'bold',fontSize:20,marginLeft:15,marginTop:10,marginBottom:0}}>
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
          <Box sx={{marginTop:5.5}}>
            <FormControlLabel
                sx={{paddingTop:1, fontSize:20}}
                label="Select Box for Input Array"
                control={<Checkbox checked={isTestcaseArray} onChange={handleSold} color='secondary' />}
            />
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ marginLeft: 2, marginTop: 4 }}>
              <p style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, marginBottom: 0 }}>
                Choose a TESTCASE Option*
              </p>
              <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                <FormControlLabel
                  sx={{ paddingTop: 1 }}
                  label="Select to Enter Test cases"
                  value="testcase"
                  control={<Radio color="secondary" />}
                />
                <FormControlLabel
                  sx={{ paddingTop: 1 }}
                  label="Select to Upload Solution Code"
                  value="solutionCode"
                  control={<Radio color="secondary" />}
                />
                <FormControlLabel
                  sx={{ paddingTop: 1 }}
                  label="Select to Automate Test cases"
                  value="automatedTestcase"
                  control={<Radio color="secondary" />}
                />
              </RadioGroup>
            </Box>
          </Grid>
        </Grid>

      {selectedOption === 'testcase' && (
        <>
          {testCases.map((testCase, index) => (
            <Grid item lg={4} md={3} sm={4} xs={12} key={index}>
            <Box sx={{display:'flex', flexDirection:'row',marginTop:2}}>
              <Box sx={{marginRight:2}}>
                <p style={{fontWeight:'bold',fontSize:18,marginTop:0}}>Testcase Input</p>
                <TextField sx={{marginBottom:2}}
                multiline
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
                multiline
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
                mt:9,
                padding:2,borderRadius:5
              }}
              startIcon={<CgAddR/>}
            >
            Add
            </Button>
          </Box>
        </>
      )}


      {selectedOption === 'solutionCode' && (
        <>
          <Box sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold',width:'100%',marginLeft:2 }} >
            <p style={{marginTop:0,marginBottom:10}}>Upload Solution File*</p>
            <p style={{ fontWeight: 'bold',margin:0}}><Button variant="outlined" component="label"
              color='secondary' sx={{
              width: '100%', padding: 2,
              borderStyle: 'dashed', borderRadius: 2
              }}>
              <Button variant="dashed" component="label" sx={{ color: '#999999' }}>
              <FcAddImage fontSize={45} style={{marginRight:19}}/>Click to browse or <br />Drag and Drop Files
              <input  name='file' onChange={(e) => { setFile(e.target.files[0]) }} hidden accept="file/*" multiple type="file" />
              </Button></Button>
            </p>
          </Box>
          {inputTestCases.map((testCase, index) => (
            <Grid item lg={3} md={3} sm={4} xs={12} key={index}>
              <Box sx={{display:'flex', flexDirection:'row'}}>
                <Box>
                  <Box>
                  <p style={{fontWeight:'bold',fontSize:18,marginTop:0}}>Testcase Input</p>
                  </Box>
                  <TextField sx={{marginBottom:2}}
                    value={testCase.input}
                    onChange={(e) => {
                      const updatedTestCases = [...inputTestCases];
                      updatedTestCases[index].input = e.target.value;
                      setInputTestCases(updatedTestCases);
                    }}
                    label="Enter Input"
                    color="secondary"
                  />
                </Box>
              </Box>
              <IconButton onClick={() => handleRemoveInputTestCase(index)}>
                <RiDeleteBin5Line style={{color:theme.palette.secondary.main, fontSize:28,marginTop:0}} />
              </IconButton>
            </Grid>
          ))}
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddInput}
              sx={{
                mx: { lg: 3, md: 3, sm: 3, xs: "auto" },
                mt:6.5,
                padding:2,borderRadius:5
              }}
              startIcon={<CgAddR/>}
            >
            Add
            </Button>
          </Box>
        </>
      )}

      
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
