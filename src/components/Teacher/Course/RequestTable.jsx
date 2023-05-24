import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@emotion/react';
import SearchBar from '@mkyy/mui-search-bar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
        imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        name: "Amna",
        email: "Amna@gmail.com",
    },
    {
        id: randomId(),
        imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4',
        name: "Ahmed",
        email: "Ahmed@gmail.com",
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
                Accept All
            </Button>
            <Button sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2 }} variant="contained" color="secondary" onClick={() => { navigate('/Teacher/CreateCourse') }} startIcon={<AddIcon />}>
                Delete All
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

export default function Requests() {
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
            field: 'imageUrl', headerName: 'Avatar', renderCell: (params) => (
                <img src={params.row.imageUrl} style={{ width: 50, borderRadius: '50%' }} />
            )
        },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'email', headerName: 'Email', width: 300 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Accept',
            width: 230,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <Button sx={{color:"#03ac13" ,padding:1,borderRadius:6, ":hover":{border:'4px solid #03ac13'}}}  variant="outlined"  startIcon={<PersonAddIcon sx={{color:'#03ac13'}}/>}>Accept</Button>
                ];
            },
        },
        {
            field: 'action',
            type: 'actions',
            headerName: 'Decline',
            width: 230,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <Button  sx={{ backgroundColor: "red",padding:1,borderRadius:6, ":hover":{backgroundColor:"red", border:'4px solid red'}}} variant="contained" onClick={handleDeleteClick(id)}  startIcon={<DeleteIcon sx={{color:'white'}} />}>Decline</Button>
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
                    }, marginTop: 3, borderRadius: 6,height: '100vh'
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
            />
        </Box>
    );
}