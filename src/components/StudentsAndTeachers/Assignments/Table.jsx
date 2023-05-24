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
import DownloadIcon from '@mui/icons-material/Download';
import http from '../../../../Axios/axios';
import { delAssignment } from '../../../../Axios/assigAxios';
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
  {
    id: randomId(),
    imageUrl: 'https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png',
    assigNumber: "Assignment 02",

    size: "620KB",
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
    <GridToolbarContainer sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 4 }}>
      <Button sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }} variant="contained" color="secondary" onClick={() => { navigate(`/Teacher/AddAssignment/${courseID}`) }} startIcon={<AddIcon />}>
        Add Assignment
      </Button>
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

export default function Contents() {
  const theme = useTheme();
  const navigate = useNavigate()
  
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [courseID , setcourseID] = React.useState(null)
  const [rows, setRows] = React.useState([]);

  
 

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //setCourses(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  async function getAssignments() {
     var cid = location.pathname.split('/').pop();
      setcourseID(cid)

    try {
      const response = await http.get(`/assignment/viewAssigList/${cid}`)
      console.log(response)
      setRows(response.data.assignments)
      console.log(response.data.assignments)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAssignments()
  } ,[])

  const handleDeleteClick = (id) => () => {
    
    delAssignment(id,courseID)
    getAssignments()

   // setRows(rows.filter((row) => row.id !== id));
  };
  const columns = [
    {
        field: 'imageUrl', headerName: 'File', renderCell: (params) => (
          <img src='https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png' 
          style={{ width: 50,height: 50, border: "1px solid purple", borderRadius: '50%' }} 
        /*  onClick={() => {
            navigate(" " + id, {
              state: { Assignment: Assignment.find(c =>  c._id === id) },
            });
          }} */
          
          />
        )
      },
    { field: 'assignmentNumber', headerName: 'Assignment Number', width: 200},

    { field: 'format', headerName: 'Format', width: 200},
    {
      field: 'uploadDate',
      headerName: 'Date Uploaded',
      
      width: 200,
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        
        width: 200,
      },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 160,
      cellClassName: 'actions',
      getActions: ({ id }) => {

        return [
            <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            className="textPrimary"
            
            onClick={()=>navigate(`/Teacher/ViewUploadedAssig/${courseID}/${id}`)}
            sx={{ backgroundColor: '#ffa500', padding:1, ":hover":{backgroundColor:"#ffa500", border:'4px solid #ffa500'}}}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              navigate(`/Teacher/AddAssignment/${courseID}`, {
                // state: { course: courses.find(c =>  c._id === id) },
                state: { assig: rows.find(row =>  row._id === id) },
              });
            }} 
            sx={{ backgroundColor: '#03ac13', padding:1, ":hover":{backgroundColor:"#03ac13", border:'4px solid #03ac13'}}}

          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{color:'white'}}/>}
            label="Delete"
            onClick={handleDeleteClick(id)}

            sx={{ backgroundColor: "red",padding:1, ":hover":{backgroundColor:"red", border:'4px solid red'}}}       
           />,
          
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        marginBottom: 4,
        
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
          }, marginTop: 3, borderRadius: 6, height:'70vh'
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