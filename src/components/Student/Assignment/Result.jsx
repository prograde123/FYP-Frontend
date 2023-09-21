import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import http from '../../../../Axios/axios';
import { useParams } from 'react-router-dom';

const Result = () => {
  const { aid } = useParams();
  const [result, setResult] = useState([]);
  const theme = useTheme();

  const getSubmission = async () => {
    try {
      const submissions = await http.get('/submit/getSubmissions', {
        params: { assignmentId: aid },
      });
      setResult(submissions.data.formattedResponse);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  useEffect(() => {
    getSubmission();
  }, []);

  console.log(result)


  return (
    <Box
      component="main"
      sx={{
        overflow: 'auto',
        flexGrow: 1,
        p: 3
      }}
    >
      {result &&
        result.length > 0 &&
        result.map((res, index) => (
          <div key={index}> 
            <Typography variant="h5" sx={{textDecoration:'underline'}}> Question # {index + 1} {res.questionDescription}</Typography>
            <ul>
              {res.testResults.map((testResult ,index ) => (
                <>
                    <Typography variant='h6' fontWeight='bold'>Test Case Result # {index+1}</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent:'space-evenly'
                    }}>
                    
                        <li key={testResult._id}>
                        <Typography variant="body1">
                            Your Output: {testResult.actualOutput}
                        </Typography>
                        </li>
                        <li key={testResult._id}>
                        <Typography variant="body1">
                            Error Output: {testResult.errorOutput ? testResult.errorOutput : 'No error'}
                        </Typography>
                        </li>
                        <li key={testResult._id}>
                        <Typography variant="body1">
                            Passed: {testResult.passed ? 'Yes' : 'No'}
                        </Typography>
                        </li>
                    </Box>
                </>
              ))}
            </ul>
          </div>
        ))}
    </Box>
  );
};

export default Result;
