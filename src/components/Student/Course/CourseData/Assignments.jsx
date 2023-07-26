import React from 'react';
import { Box, Typography } from '@mui/material';
import AssignmentCard from './AssignmentData/AssignmentCard';
import python from '../../../../assets/python.png'

const Assignments = () => {

  const assignments=[
    {
      assignmentNumber: 1,
      uploadDate: '22-03-23',
      dueDate: '25-03-23',
      totalMarks: '10 points',
      name: 'Introduction To python',
      image: python
    },
    {
      assignmentNumber: 2,
      uploadDate: '22-03-23',
      dueDate:'25-03-23' ,
      totalMarks: '10 points',
      name: 'Introduction To python',
      image: python
    }
  ]


  return (
    <Box>
      
     {
      assignments.map((assignment)=>{
        return <AssignmentCard Assignment={assignment} />
      })
     }
    </Box>
  );
};

export default Assignments;

