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
    lecture: "Lecture 01",
    title: "Loops and Arrays",
    size: "720KB",
    dateCreated: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://w7.pngwing.com/pngs/521/255/png-transparent-computer-icons-data-file-document-file-format-others-thumbnail.png',
    lecture: "Lecture 02",
    title: "Functions",
    size: "620KB",
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

export default function Contents() {
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
    {
        field: 'imageUrl', headerName: 'File', renderCell: (params) => (
          <img src={params.row.imageUrl} style={{ width: 50, borderRadius: '50%' }} />
        )
      },
    { field: 'lecture', headerName: 'Lecture', width: 200},
    { field: 'title', headerName: 'Title', width: 200},
    { field: 'size', headerName: 'Size', width: 200},
    {
      field: 'dateCreated',
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
            icon={<DownloadIcon />}
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