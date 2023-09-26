import React , {useEffect} from 'react';
import { Box, Typography } from '@mui/material';
import AssignmentCard from './AssignmentData/AssignmentCard';
import python from '../../../../assets/python.png'
import { useParams } from 'react-router-dom';
import http from '../../../../../Axios/axios';
import { useState } from 'react';

const Assignments = () => {

  const {id} = useParams()

  const [assignments , setAssignments] = useState(null)

  const fetchAssignments = async () => {
    const response = await http.get(`/assignment/viewAssigList/${id}`)
    setAssignments(response.data.assignments)
  }

  useEffect(()=>{
    fetchAssignments()
  })
  // const assignments=[
  //   {
  //     assignmentNumber: 1,
  //     uploadDate: '22-03-23',
  //     dueDate: '25-03-23',
  //     totalMarks: '10 points',
  //     name: 'Introduction To python',
  //     image: python
  //   },
  //   {
  //     assignmentNumber: 2,
  //     uploadDate: '22-03-23',
  //     dueDate:'25-03-23' ,
  //     totalMarks: '10 points',
  //     name: 'Introduction To python',
  //     image: python
  //   }
  // ]


  return (
    <Box>
      
     {
      assignments &&
      assignments.map((assignment)=>{
        return <AssignmentCard Assignment={assignment} CourseId={id} />
      })
     }
    </Box>
  );
};

export default Assignments;

