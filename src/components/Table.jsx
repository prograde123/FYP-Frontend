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
import SearchAppBar from './Teacher/Search';
import { Paper } from '@mui/material';


const initialRows = [
  {
    id: randomId(),
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    name: "Introduction to Computers",
    instructor: "ahmar",
    creditHours: 4,
    language: 'Python',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    name: "Introduction to Python",
    instructor: "ahmar",
    creditHours: 4,
    language: 'Python',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    name: "assembly language",
    instructor: "ahmar",
    creditHours: 4,
    language: 'Masm',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    name: "C++",
    instructor: "ahmar",
    creditHours: 4,
    language: 'C++',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    name: "C Sharp",
    instructor: "ahmar",
    creditHours: 4,
    language: 'C#',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    name: "Java Script",
    instructor: "ahmar",
    creditHours: 4,
    language: 'Java',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
    name: "Programming Fundamentals",
    instructor: "ahmar",
    creditHours: 4,
    language: 'Java',
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

export default function FullFeaturedCrudGrid() {
  const theme = useTheme();
  const navigate = useNavigate()
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    { field: 'imageUrl', headerName: 'Image', renderCell: (params) => (
     <img src={params.row.imageUrl} style={{width: 50, borderRadius: '50%'}}/>
    ) },
    { field: 'name', headerName: 'Course Name', width: 230, editable: true, validate: rowData => rowData.name !== '' },
    { field: 'instructor', headerName: 'Instructor', width: 150, editable: true },
    { field: 'language', headerName: 'Language', editable: true },
    {
      field: 'dateCreated',
      headerName: 'Started At',
      type: 'date',
      width: 150,
      editable: true,
    },
    {
      field: 'dateEnding',
      headerName: 'Ending At',
      type: 'date',
      width: 150,
      editable: true,
    },
    { field: 'creditHours', headerName: 'Credit Hours', type: 'number', editable: true },
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
            sx={{ border: 2, backgroundColor: theme.palette.secondary.background, color: theme.palette.primary.main }}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            sx={{ border: 2, backgroundColor: theme.palette.secondary.background, color: theme.palette.primary.main }}

          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}

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
        padding:1,
        '& .actions': {
          color: theme.palette.secondary.main,
        },
        '& .textPrimary': {
          color: theme.palette.secondary.main,
        },
      }}
    >
      <DataGrid
        sx={{ backgroundColor: theme.palette.primary.background, boxShadow: 12,border: 2, borderColor: theme.palette.secondary.main,'& .MuiDataGrid-cell:hover': {
          color: theme.palette.secondary.main,  
          
        }, marginTop: 3, borderRadius: 6, }}
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
          search: true
        }}
      />
    </Box>
  );
}