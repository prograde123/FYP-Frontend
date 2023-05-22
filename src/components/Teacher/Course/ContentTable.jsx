import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import SearchBar from '@mkyy/mui-search-bar';
import DownloadIcon from '@mui/icons-material/Download';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomId,
} from '@mui/x-data-grid-generator';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import http from "../../../../Axios/axios";

const initialRows = [
  {
    id: randomId(),
    imageUrl: 'https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png',
    lecture: "Lecture 01",
    title: "Loops and Arrays",
    size: "720KB",
    dateCreated: randomCreatedDate(),
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
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
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
        Add Course Content
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

export default function Contents({ courses }) {
  const theme = useTheme();
  const navigate = useNavigate()
  const location = useLocation();
  const course = location.state.course
  const [content, setContent] = useState([]);
  const [rows, setRows] = React.useState(content);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  async function getContents() {
    try {
      const response = await http.get('/course/viewCourseContentList/' + course._id)
      setContent(response.data.courses)
      console.log(response.data.courses)
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteCourseContent(mid) {
    try {
      const response = await http.delete('/course/deleteCourseContent/' + course._id + '/' +mid)
      const newContents = rows.filter(item => item._mid !== mid);
      console.log(response.data)
      setContent(newContents)
      getContents();
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getContents();
  }, []);


  const columns = [


    { field: 'course.courseContent.title', valueGetter: params => params.row.course.courseContent.title, headerName: 'Title', width: 200, },
    { field: 'lecNo', headerName: 'Lecture No', width: 200 },
    { field: 'fileType', headerName: 'Material', width: 200 },
    {
      field: 'uploadedDate',
      headerName: 'Date Uploaded',
      type: 'date',
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 230,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            sx={{ border: 2, backgroundColor: theme.palette.secondary.background, color: theme.palette.primary.main }}

          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={()=>deleteCourseContent(mid)}

            sx={{ border: 2, backgroundColor: theme.palette.secondary.background, color: theme.palette.secondary.main }}
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        marginBottom: 4,
        height: "90%",
        marginLeft: 2,
        marginRight: 2,
        padding: 1,
        '& .actions': {
          color: theme.palette.secondary.main,
        },
        '& .textPrimary': {
          color: theme.palette.secondary.main,
        },
      }}
    >
      <DataGrid
        sx={{
          backgroundColor: theme.palette.primary.background, boxShadow: 12, border: 2, borderColor: theme.palette.secondary.main, '& .MuiDataGrid-cell:hover': {
            color: theme.palette.secondary.main,
          }, marginTop: 3, borderRadius: 6, height: '70vh'
        }}
        rows={rows}
        rowHeight={70}
        columns={columns}
        rowModesModel={rowModesModel}
        processRowUpdate={processRowUpdate}
        getRowId={(row) => row._id}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 15, page: 0 },
          },
        }}
        options={{
          search: true
        }}
      // checkboxSelection
      // disableRowSelectionOnClick
      />
    </Box>
  );
}