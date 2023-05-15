import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

function ViewProfile() {
  const theme = useTheme()
  let user = {
    name: "Ahmed Ali",
    email: "Ahmedali@gmail.com",
    role: 'Teacher',
    phoneNo: '+92 318 5064050'
  }
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Box>
          <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>My Profile</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'white', border: 1, borderColor: theme.palette.secondary.main, borderRadius: 10, width: '100%', paddingLeft: 16, paddingRight: 16, marginTop: 1 }}>
          <Box sx={{ marginTop: 4 }}>
            <img style={{ height: 250, width: 250, border: '2px solid purple', borderColor: theme.palette.secondary.main, borderRadius: '50%' }} src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" />
            <CreateIcon sx={{ color: theme.palette.secondary.main }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}>
            <Box sx={{ marginBottom: 4, display: 'flex', flexDirection: 'row', justifyContent:'center' }}>
              <Button sx={{ marginLeft: 2, marginRight: 2, marginTop: 2, marginBottom: 2,padding:2 }} variant="contained" color="secondary" onClick={() => { navigate('/Teacher/CreateCourse') }} startIcon={<AddIcon />} >
                Edit Profile
              </Button>
            </Box>
            <Box sx={{ marginBottom: 4, paddingLeft: 16, paddingRight: 16 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', border: '1px solid purple', borderRadius: 2, marginBottom: 4 }}>
                <Typography sx={{ paddingBottom: 3, fontWeight: 'bold', fontSize: 20, marginTop: 3 }}>Role: </Typography>
                <Typography sx={{ paddingBottom: 3, fontWeight: 'bold', fontSize: 20, marginTop: 3 }}>{user.role}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', border: '1px solid purple', borderRadius: 2, marginBottom: 4 }}>
                <Typography sx={{ paddingBottom: 3, fontWeight: 'bold', fontSize: 20, paddingTop: 3 }}>Name: </Typography>
                <Typography sx={{ paddingBottom: 3, fontWeight: 'bold', fontSize: 20, paddingTop: 3 }}>{user.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', border: '1px solid purple', borderRadius: 2, marginBottom: 4 }}>
                <Typography sx={{ paddingBottom: 3, fontWeight: 'bold', fontSize: 20, paddingTop: 3, paddingRight: 20 }}>Email: </Typography>
                <Typography sx={{ paddingBottom: 3, fontWeight: 'bold', fontSize: 20, paddingTop: 3 }}>{user.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', border: '1px solid purple', borderRadius: 2, marginBottom: 4 }}>
                <Typography sx={{ paddingBottom: 3, fontWeight: 'bold', fontSize: 20, paddingTop: 3 }}>Phone: </Typography>
                <Typography sx={{ paddingBottom: 3, fontWeight: 'bold', fontSize: 20, paddingTop: 3 }}>{user.phoneNo}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
export default ViewProfile;