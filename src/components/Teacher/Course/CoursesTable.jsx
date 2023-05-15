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
import { Paper } from '@mui/material';


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
  {
    id: randomId(),
    imageUrl: 'https://cdn.cdnlogo.com/logos/p/3/python.svg',
    name: "Introduction to Python",
    instructor: "Ahmar Ali",
    creditHours: 4,
    language: 'Python',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEUlNEz///8gMEkbLUdrcn8lNk4wPlXy8/RGUWQAGzs9SFwBID8iMkoAGToOJEEVKEOQlqAAFTgJI0Hd3+GqrbQAETbP0dUeLki9wMaBh5Lp6uyHjZi2ub/h4+aZnqczQFbDxcpBTGBPWWpeZ3ZtdYLMztN6gIxianmssLe3usEAACzu7/GWm6Shpa1MV2gABDMY/QibAAAKsUlEQVR4nO2deXuiOhTGEVwaWSIyqBWptZvtWOd+/293USTJSU7QK/Q68pzfXzNOBvKS5SwJwelp5KvsbePcJcPNa7bIdUEO+NtyMgwjPg9uXdcrCeZ8GjrfO6vCpJ9y99a1bEzA07ccV5iF3q1r1xJemCEKk0F064q1SOQkusKv+P77p0oQf0GFq/TWVWqddKUqXHRPYCFxIRUm8a1r8yOEiVA46NYYrHAHlcKsS7OoSpSVCjvaRw/E+VHhtiuG3sTrHxQuuziPVqTLQuGE37oaPwifFArX3ZxIS9xhz8nDW9fiRwlzZ9VVU1ESrZysy8OwGIiZs+3yMCwG4tYZ32vK4jKCjTO4dR1+mOGtK0AQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQP0Nw4NaVqCdwAZf/P4/7LPY9ZziYs5hN605tcA1sD8Us+d/UYBVdPwAuu6IbscHb03MyOr0bv5utJi+Rb3ul88FgiEscICWvFCZg4oyCks0FEr1wvDeOGun1Rottir1sFQzMsl9T7ML80Sz51vBNWHetXXB/9pU3l73OzIqULB+ZWSFM4RJ9R3m6Mkv2GyrkT9oFd+fereXBu03fser9VO8FmMLeGOsrMdIzmiqMl/oVX+q7qd+v03fgfaB1VVThI9Kf0YINFbovxhU/0RFSEU7OCSx4hZdAK77wzYt72/YVRp/GFUd1CtklAosGAtVHFY6Ql3ijffsKw5F5yZrX+PnbRQKLCVDtg6hCbCAybAZrphDtFlj/KXGHFwrs9YZK/XGFyMv0KVaumUL/GbumVWFotRIGidIJcYXvxm3ccesKAw+t3YflmkiLj/IkSfIdchHFUOMKR4ZCnmHlGinkH6jCd4YX192fxduAFYSMRQ/f2r+pZ1ZAhaKgYZami9O/7NRH1kghOrILPNRp1EZhvmay3JzHY63Hv4qaQYXCbXnSB2JY2eZ31Ug3URjMcYE9/FV+DizFezzXHkAKe4ScsKBCUWqmdZVAPMHvttqQ24zbDD1wAkxLeWi2MzSW0q5ChbInaP6hHOYvbSkMVS/wl1oL9NCQWL3vnzlSIgVupTB4UGEgCr3Ca0h7/49qpRsodB/UGw/UqQI9+EWdeHPUP4fBj5iStTYUA1ELY8SskP9uSSHwkZa/1SADOxclUCcai1fAVCliJoEK1+IxJPAuwt6v2mrDVO11+ykwt4hLBezxM64Q9PvPqomgwvFG/HGgjuX5n+rnj7QdhfNX9b4Pc6ZO0UgcDGJlvJc6fH/wAEryPd6GY+kLg8pLez9m7SicfimXKbplpM41S7Obwnq+4PflTMLx/zkORQT9qT5Hv7L3o9hvR2GkXqZoszkIFZE4GNx3515+/I2mMBIjPldTGaIPPfvtKPRAIHQYd6D3f5rdNISOWT++9NaaQi6HhxMghSa8HYVMzbYcnUiQBhqZA02Plt/ffHbR0baaQncq/qz4+PKJv8xbUQg9tuPEDkMHMw72zAzNbDKOI9yLtSsMpAev5BTlNBAFrSiEkUqZBwYjE7F4DEkI9PJfW86i2lroCmVnWErXVNj7hDmtKASR0GnEw3iYG02DplGOldpvfRZZT5rWFXofyl9EhaqffkWtKISJ4JP180BwYMbBAcca8cRs/2JrS12hcnMRxcikXxE6t6EwAongyoPx1R+ROPhcImq238bI2oWuUPHhhW8k45xifm1DIUgECy8UzK9IN3WYrZ9KFn1ft5SGQjkcRpVFFD8d0v0tKISJYOGiwdgAi4NjM79qsMti+D8NhUpgWkVhwt4vpq0ohKZtgwdyegxeSkRWhwxGj0y1k4ZCJW47xWmyyOG5tqAQJIIV3wmmC4eYOefD8z21uOZGaUZDoWKXTqNd2vvD426uENp2JSME8xrfqOvpRixDloh0+tLtMxXKFNioLCbs/fHvzRUKN768pWwqF9Qlt51DzMPNk549NHi1xRYBsKyliy/M87FNGyuEieBcHW5wAc++HuzyeD15rzGPPaWTmwoVB7CMIqPqr8cO1VghTASDtCVcMK1dD3YLA7/JVva2FBk7U6HiFR9LyWj8mJ1qrBAmgjdqxgtmp5aW5LeichpGL4+rBG3Nl7lNodpXDmZXjv+jB9BUIeykye+pym+wJnxmPbiSGTE2+FgYKiuHBVGoRGqHIEbY+zI51VShlggeQcC/IXGw9bH50ze9x568IkSh4lsUnrbDKjeuvGFTheEFc32l/lw3BXjxA1wIOcWYiMJAJu6KaEkWKN39hgrdzcUC//Ox7vMU2KHTTIUodKYylcmVcKpMtjdUCHJq57CvB+MEsVq500DEFPrSyX/zhBO5K/tMQ4Uptp5pRVHoRZKBLdoFzy9hVoX8W/ywikSO6/RImimEieCzyKVc7+Pzl+DL1rbA1p7CMkyhUo1lLCb3kx/eTCFIBJ9HxsGwd9vcHZAnWNoVOqH8ZSjUPsxbUBjVu1oGYvMozNLgXrnmFNW0oZp9/RDm65TCbKTQu3RHTIWIg2F4jKT9y4qr9mJmH4dql1g9w/LNFMJExQUI71IbwFs8tAIrWKupXaHyqJeVH1X5wU0Uakv32QQDbjmokoSBC34eDZA7uwx4E5kewCsKsd1HlfVtohAmgp9TjjAF3rdcD9Y2m+zGvm4yeASLjK1em6PsvJBUNqiJQlhLy9agFNxbrNQaGxv2DuNeuWM7mHsR8zM4i1WRJ64QhuHH8iLxdr1CbUewZZO95vVUOQBkB9XsaTuc8yjigz8f+5k+S1fzLa7Q3AElVjEaKISJYDSZ5hibTkUcjO1RPjCyGCAxglGFpn8sNtU2UAh3BFu/8eEDx07s33LhdzHP8WRZx686jrETUexxuV6h1jjWlx60xvpT3RnbSm9ladkTJRTqe85kqHa9QpgItnXSwlZB0yfj4BDdrYkjV/otCvWlLLkd83qFILSp+x4ULLiTbnZ4NolY8ViXLy2fo7aZU6bErlaoXbLme1BTOJMr2wxt2xl1MqWDWBQG2rCWm8CuVggtUN1357QFbWUxOggvWJspWlAdARaFejpFrnVdq1CzZ8b2TrUohxVWo8FwezY6ScYgg2VTGIEJTdkDdq1CD86E6Esr4h5wSgHOj2dd7S4ZPYbw0lChjCzhmrOS17u6DYeAM6lQWBheKOITa74ueWRG5wjW8kpr5XdX+X04OF/+vMRLXgAUd697BzDgbPNkeGm90expHKJvr1nua7tHUHPv/w2XMzbeTn4tZrMkmc2eP7/7G3bZDqI7IvB4NPUPu/R8PyrCjFvXhyAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAI4sY0/ubcX87Q2fzl311sSLBxtt1+Wc7dOjWv23cBPnFWF58IeJdEKwf7zkiHiHOn7syE+8dd9xzrgWOdgH8XCpfnvrd5z6TLQmHjL3j+xRwO7nDqz/a4cw6HhhyORsm6ajCiwylax8NfBt2cTsvT7I4Kk07axKA82a88wGfRxfk0LY+WOR1R9JV2LcQI0tPBPdUhTIuwW2PRZdVZUOKYqXzYpRk1Goqzf5SDtLKwK6bfUz8goh4VlvdT5KMx94bL01f1uDh4GNryex1G3PpFpr8e14vCgfbhEOMUx3yV9R/uND01fM0+jdP+/gWNvaC5IjSgYgAAAABJRU5ErkJggg==',
    name: "assembly language",
    instructor: "Mohammed Ali",
    creditHours: 4,
    language: 'Masm',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://w7.pngwing.com/pngs/46/626/png-transparent-c-logo-the-c-programming-language-computer-icons-computer-programming-source-code-programming-miscellaneous-template-blue.png',
    name: "C++",
    instructor: "Farooq Khan",
    creditHours: 4,
    language: 'C++',
    dateCreated: randomCreatedDate(),
    dateEnding: randomCreatedDate(),
  },
  {
    id: randomId(),
    imageUrl: 'https://cdn.worldvectorlogo.com/logos/c--4.svg',
    name: "C Sharp",
    instructor: "Basarat",
    creditHours: 4,
    language: 'C#',
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
    {
      field: 'imageUrl', headerName: 'Image', renderCell: (params) => (
        <img src={params.row.imageUrl} style={{ width: 50, borderRadius: '50%' }} onClick={()=>{navigate('/Teacher/CourseDetails')}}/>
      )
    },
    { field: 'name', headerName: 'Course Name', width: 230, editable: true, resizable: true},
    { field: 'instructor', headerName: 'Instructor', width: 150, editable: true, resizable: true },
    { field: 'language', headerName: 'Language', width: 150, editable: true, resizable: true },
    {
      field: 'dateCreated',
      headerName: 'Started At',
      type: 'date',
      width: 150,
      editable: true,
      resizable: true
    },
    {
      field: 'dateEnding',
      headerName: 'Ending At',
      type: 'date',
      width: 150,
      editable: true, resizable: true
    },
    { field: 'creditHours', headerName: 'Credit Hours', type: 'number', editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 160,
      resizable: true,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            onClick={()=>{navigate('/Teacher/CourseDetails')}}
            sx={{ border: 2, backgroundColor: theme.palette.secondary.background, color: theme.palette.secondary.main }}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            sx={{ border: 2, backgroundColor: theme.palette.secondary.background, color: theme.palette.secondary.main }}
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
    <Box sx={{ height: '100vh', width: "100%" }}>
      <DataGrid
        sx={{
          backgroundColor: theme.palette.primary.background, boxShadow: 12, border: 2, borderColor: theme.palette.secondary.main, '& .MuiDataGrid-cell:hover': {
            color: theme.palette.secondary.main,

          }, marginTop: 3, borderRadius: 6,
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