import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchBar from '@mkyy/mui-search-bar';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Link } from "react-router-dom";

import storage from "../../../firebase";

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


const initialRows = [
  {
    id: randomId(),
    imageUrl: 'https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png',
    AssigName: "Assignment 01",

    size: "720KB",
    dateCreated: randomCreatedDate(),
    dueDate: randomCreatedDate()
  },
  {
    id: randomId(),
    imageUrl: 'https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png',
    AssigName: "Assignment 02",

    size: "620KB",
    dateCreated: randomCreatedDate(),
    dueDate: randomCreatedDate()
  },
 
];


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const navigate = useNavigate()
  const theme = useTheme();
  const [row, setRow] = React.useState(initialRows);
  const [searched, setSearched] = React.useState("");
  const[assigPresent,setassigPresent] = React.useState(false)

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
      
      <Paper sx={{ marginLeft: 2, marginTop: 2, marginBottom: 2, border: 1, borderColor: theme.palette.secondary.main }}>
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

export default function Contents({Assignments ,id}) {
  const theme = useTheme();
  const navigate = useNavigate()
  const [rows, setRows] = React.useState(Assignments);
  const [rowModesModel, setRowModesModel] = React.useState({});


  const handleDownload = async (userID) => {
    const folderRef = ref(storage, `Submission/${id}/${userID}/`);
    const fileList = await listAll(folderRef);
  
    async function downloadFile(index) {
      if (index >= fileList.items.length) {
        return; 
      }
  
      try {
        const item = fileList.items[index];
        const downloadURL = await getDownloadURL(item);
        const link = document.createElement("a");
        link.href = downloadURL;
        link.download = item.name;
        link.click();
  
        // Wait for a short delay before starting the next download
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
  
        // Download the next file
        downloadFile(index + 1);
      } catch (error) {
        console.error(`Error downloading file: ${error.message}`);
  
        
        downloadFile(index + 1);
      }
    }
  
    downloadFile(0); 
  };
  
  
  

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
   
    { field: 'studentName', headerName: 'Student Name',width:150},

    { field: 'totalQuestionsSubmitted', headerName: 'Questions Submitted',width:150},
    {
      field: 'totalObtainedMarks',
      headerName: 'Obtained Marks'
      ,width:150
    },
    {
        field: 'submissionDate',
        headerName: 'Submitted on'
        ,width:150
      },
      {
        field: 'submissionTime',
        headerName: 'Time'
        ,width:150
      },
    {
      field: 'actions',
      type: 'actions'
      ,width:150,
      headerName: 'Actions',
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
            <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            className="textPrimary"
            onClick={ () => handleDownload(id)}
            sx={{ border: 2, backgroundColor: theme.palette.secondary.background, color: theme.palette.primary.main }}
          />,
          
        
        ];
      },
    },
  ];

  return (
    <Box sx={{ marginBottom: 5, width: "100%" }}>
      <DataGrid
  sx={{
    backgroundColor: theme.palette.primary.background,
    '& .MuiDataGrid-cell:hover': {
      color: theme.palette.secondary.main,
    },
    marginTop: 3,
    borderRadius: 2,
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
  }}
  rows={rows}
  rowHeight={70}
  columns={columns}
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
      paginationModel: { pageSize: 15, page: 0 },
    },
  }}
  options={{
    search: true,
  }}
  getRowId={(row) => row.studentId} // Specify the custom id field
  // checkboxSelection
  // disableRowSelectionOnClick
/>

    </Box>
  );
}