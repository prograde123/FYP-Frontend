import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';
import SearchBar from '@mkyy/mui-search-bar';
import http from '../../../../../Axios/axios'
import { TbEdit } from "react-icons/tb";
import { VscNewFile } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
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
import { useEffect } from 'react';
import { Assignment } from '@mui/icons-material';


const initialRows = [
  {
    id: randomId(),
    imageUrl: 'https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png',
    assigNumber: "Assignment 01",

    size: "720KB",
    uploadDate: randomCreatedDate(),
    dueDate: randomCreatedDate()
  },
];


function EditToolbar(props) {
  const { setRows, setRowModesModel ,courseID } = props;
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
    <>
    </>

  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  
};

export default function TestcaseList({testCases}) {
  const theme = useTheme();
  const navigate = useNavigate()
  
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [courseID , setcourseID] = React.useState(null)
  const [rows, setRows] = React.useState(testCases);

  
 

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //setCourses(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  
  const columns = [
    
    {
      field: 'input',
      headerName: 'Input',
      
      width: 400,
    },
    {
        field: 'output',
        headerName: 'Output',
        
        width: 350,
      },
      
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 320,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
          <GridActionsCellItem
          icon={<TbEdit style={{color:theme.palette.secondary.main,fontSize:25,":hover":{fontSize:30}}}/>}
          label="Edit"
            // onClick={() => {
            //   navigate(`/Teacher/AddAssignment/${courseID}`, {
            //     // state: { course: courses.find(c =>  c._id === id) },
            //     state: { assig: rows.find(row =>  row._id === id) },
            //   });
            // }} 
            
          />,
          <GridActionsCellItem
          icon={<RiDeleteBin5Line style={{color:theme.palette.secondary.main,fontSize:25,":hover":{fontSize:30}}}/>}
          label="Delete"
            // onClick={handleDeleteClick(id)}
            />,
          
        ];
      },
    },
  ];

  return (
    <Box sx={{ marginBottom: 2,
       width: "100%" }}>
      <DataGrid 
        sx={{
            paddingX:2,backgroundColor: theme.palette.primary.background, '& .MuiDataGrid-cell:hover': {
            color: theme.palette.secondary.main,

          }, fontFamily:'Nunito, sans-serif', marginTop: 3, borderRadius: 2,  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'
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
          toolbar: { setRows, setRowModesModel ,courseID },
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