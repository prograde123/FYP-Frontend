import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchBar from '@mkyy/mui-search-bar';
import { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import { randomCreatedDate, randomId } from '@mui/x-data-grid-generator';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import http from "../../../../Axios/axios";

const initialRows = [
  {
    id: randomId(),
    imageUrl: 'https://img.freepik.com/free-icon/snakes_318-368381.jpg',
    name: "Introduction to Computers",
    instructor: "Ayesha Khan",
    creditHours: 4,
    language: 'Python',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const navigate = useNavigate()
  const theme = useTheme();
  const [row, setRow] = React.useState(initialRows);
  const [searched, setSearched] = React.useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = initialRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 4 }}>
      <Button sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }} variant="contained" color="secondary" onClick={() => { navigate('/Teacher/CreateCourse') }} startIcon={<AddIcon />}>
        Create Course
      </Button>
      <Paper sx={{ marginLeft: 2, marginTop: 2, marginBottom: 2, border: 2, borderColor: theme.palette.secondary.main }}>
        <SearchBar value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
      </Paper>
    </GridToolbarContainer>

  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function CoursesListTable() {
  const theme = useTheme();
  const navigate = useNavigate()
  const [courses, setCourses] = useState([]);
  const [rows, setRows] = React.useState(courses);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setCourses(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  async function getCourses() {
    const user = JSON.parse(localStorage.getItem('User'))
    console.log(user)
    try {
      const response = await http.get('/course/coursesList/' + user._id)
      setCourses(response.data.courses)
      console.log(response.data.courses)
    } catch (e) {
      console.log(e);
    }
  }
  
  async function deleteCourse(id){
    try{
      const response = await http.delete('/course/deleteCourse/'+ id)
      getCourses();
    }
    catch (e) {
      console.log(e);
    }
  }

  async function updateCourse(id){
    try{
      const response = await http.patch('/course/updateCourse/'+ id)
      const newCourses = rows.filter(item => item._id !== id);  
      console.log(response.data)
      setCourses(newCourses)
      
    }
    catch (e) {
      console.log(e);
    }
  }

useEffect(() => {
    getCourses();
  }, []);

  const columns = [
    {
      field: 'image', headerName: 'Image', renderCell: (params) => (
        <img src={params.row.image} style={{ width: 50, height: 50, border: "1px solid purple", borderRadius: '50%' }} onClick={() => {
          navigate("/Teacher/CourseDetails/" + id, {
            state: { course: courses.find(c =>  c._id === id) },
          });
        }}  />
      )
    },
    { field: 'name', headerName: 'Course Name', width: 230, },
    { field: 'teacher.user.fullName',valueGetter: params => params.row.teacher.user.fullName, headerName: 'Instructor', width: 150, },
    { field: 'language', headerName: 'Language', width: 150, },
    {
      field: 'startingDate',
      headerName: 'Started At',
      width: 150,
    },
    {
      field: 'endingDate',
      headerName: 'Ending At',
      width: 150,
    },
    { field: 'creditHours', headerName: 'Credit Hours', type: 'number' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 160,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon sx={{color:'white'}}/>}
            label="View"
            onClick={() => {
              navigate("/Teacher/CourseDetails/" + id, {
                state: { course: courses.find(c =>  c._id === id) },
              });
            }} 
            sx={{ backgroundColor: '#ffa500', padding:1, ":hover":{backgroundColor:"#ffa500", border:'4px solid #ffa500'}}}
          />,
          <GridActionsCellItem
            icon={<EditIcon sx={{color:'white'}}/>}
            label="Edit"
            sx={{ backgroundColor: '#03ac13', padding:1, ":hover":{backgroundColor:"#03ac13", border:'4px solid #03ac13'}}}
            onClick={() => {
              navigate("/Teacher/CreateCourse", {
                state: { course: courses.find(c =>  c._id === id) },
              });
            }} 
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{color:'white'}}/>}
            label="Delete"
            onClick={()=>deleteCourse(id)}
            sx={{ backgroundColor: "red",padding:1, ":hover":{backgroundColor:"red", border:'4px solid red'}}}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: '100vh', width: "100%" }}>
      <DataGrid
        sx={{
          backgroundColor: theme.palette.primary.background, boxShadow: 12, border: 2, borderColor: theme.palette.secondary.main, '& .MuiDataGrid-cell:hover': {
            color: theme.palette.secondary.main,

          }, marginTop: 3, borderRadius: 6,
        }}
        rows={courses}
        rowHeight={70}
        columns={columns}
        getRowId={(row) => row._id}
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        options={{
          search: true
        }}
      />
    </Box>
  );
}