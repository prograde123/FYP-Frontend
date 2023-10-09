import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Due Date', width: 200 },
  {
    field: 'firstName',
    headerName: 'Assignment',
    width: 200,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Status',
    width: 200,
  },
  {
    field: 'age',
    headerName: 'Obtained Marks',
    type: 'number',
    width: 200,
  },
  {
    field: 'fullName',
    headerName: 'Total Marks',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    type: 'number',
    width: 200,
  },
];

const rows = [
  { id: 1, lastName: 'Submitted', firstName: 'Assignment no 1', age: 35 },
  { id: 2, lastName: 'Not Submitted', firstName: 'Assignment no 1', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 12, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 13, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 14, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function FeedBack() {
  return (
    <Box sx={{ minHeight: '90vh', marginBottom:10}}>
      <p style={{ fontWeight: 'bold', marginBottom: 38, fontSize:25, marginLeft:9,marginTop:0, display:'flex', flexDirection:'row', justifyContent:'center' }}><span className='underline'>Graded Assignemnts</span></p>
      
      <DataGrid sx={{boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset'}}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        
        disableRowSelectionOnClick
      />
    </Box>
  );
}