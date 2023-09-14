import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import {Menu, MenuItem} from '@mui/material';
import newtheme from '../../Themenew'
import { Link } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import Aos from 'aos';
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const navItems = ['Home', 'Courses', 'About', 'Contact',];

export default function DrawerAppBar() {
  const navigate = useNavigate();

  function deleteAll() {
    localStorage.removeItem("User", JSON.stringify([]));
    return navigate('/SignIn')
  }
  React.useEffect(()=>{
    Aos.init({duration:2500});
  },[])

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [isProfileOpen, setProfileOpen] = useState(false);

  const [anchorElCourses, setAnchorElCourses] = useState(null);
  const [anchorElAssignments, setAnchorElAssignments] = useState(null);
  const [anchorE2profile,setAnchorE2profile] = useState(null);
  const handleMenuOpenCourses = (event) => {
    setAnchorElCourses(event.currentTarget);
  };

  const handleMenuCloseCourses = () => {
    setAnchorElCourses(null);
  };

  const handleMenuOpenAssignments = (event) => {
    setAnchorElAssignments(event.currentTarget);
  };

  const handleMenuCloseAssignments = () => {
    setAnchorElAssignments(null);
  };
  const handleMenuOpenProfile = (event) => {
    setAnchorE2profile(event.currentTarget);
  };

  const handleMenuCloseProfile = () => {
    setAnchorE2profile(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleProfileOpen = () => setProfileOpen(true);

  const handleProfileClose = () => setProfileOpen(false);



  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton className="fontlink" sx={{ textAlign: 'center' }}>
              <Link href="#" sx={{ textDecoration: 'none', color: 'black' }}>
                {item}
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Button
              onClick={handleProfileOpen}
              sx={{
                fontWeight: 'bold',
                ':hover': {
                  backgroundColor: newtheme.palette.secondary.footer,
                },
                border: 2,
                borderRadius: 10,
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 2,
                paddingBottom: 2,
                backgroundColor: newtheme.palette.secondary.background,
                color: newtheme.palette.primary.background,
              }}
            >
              Sign Up
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  

  return (
    <ThemeProvider theme={newtheme}>
      <Box sx={{ display: 'flex', color: 'red' }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: newtheme.palette.primary.background, padding: '1%',boxShadow:'none' }} >
          <Toolbar >
            <IconButton
              color='theme.palette.primary.background'
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="div" sx={{ flexGrow: 1, display:'flex', flexDirection:'row', textAlign:'center', alignItems:'center',fontSize:30 }} data-aos="fade-right">
               <img style={{marginRight:10}} height={65} width={60} src='https://t3.ftcdn.net/jpg/01/75/47/24/360_F_175472459_m4dpg0n9MIynKofOrRpbw71HO6xgDlVq.jpg'/>
              <span style={{ color: newtheme.palette.secondary.footer, fontWeight: 'bolder'}}>PRO<span style={{color: newtheme.palette.secondary.background}}>GRADE</span></span>
            </Typography>

            <Box sx={{ display: { xs: 'none', sm: 'block', lg:'flex' }}}  data-aos="fade-left">
              
                <Button className="fontlink" onClick={() => { navigate('/Student/Home') }}  sx={{ color: newtheme.palette.primary.main, fontWeight: 'bold', marginRight: 4, ":hover": { borderBottom: '4px solid #ff2712' } }}>
                  Home
                </Button>
                <Button
          
                    aria-haspopup="true"
                    onMouseEnter={handleMenuOpenCourses}
                    
                    
                    sx={{color: newtheme.palette.primary.main, fontWeight: 'bold', marginRight: 4, ":hover": { borderBottom: '4px solid #ff2712'}}}
                    >
                    Courses
                </Button>
                <Menu
                anchorEl={anchorElCourses}
                open={Boolean(anchorElCourses)}
                onClose={handleMenuCloseCourses}
                
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                MenuListProps={{onMouseLeave: handleMenuCloseCourses}}
                
                sx={{ zIndex: 1200 }} 
                >
                        <MenuItem onClick={() => { navigate('/Student/AllCourses') }}>All Courses</MenuItem>
                        <MenuItem onClick={handleMenuCloseCourses}>java</MenuItem>
                        <MenuItem onClick={handleMenuCloseCourses}>C++</MenuItem>
                        <MenuItem onClick={handleMenuCloseCourses}>Python</MenuItem>
                        <MenuItem onClick={handleMenuCloseCourses}>C#</MenuItem>
                        <MenuItem onClick={handleMenuCloseCourses}>Nasm/Masm</MenuItem>
                        <MenuItem onClick={handleMenuCloseCourses}>C</MenuItem>
                </Menu>
                
                <Button
                
                aria-haspopup="true"
                onMouseEnter={handleMenuOpenAssignments}
                
                sx={{color: newtheme.palette.primary.main, fontWeight: 'bold', marginRight: 4, ":hover": { borderBottom: '4px solid #ff2712'}}}
                >
                Assignments
                </Button>
                <Menu
                anchorEl={anchorElAssignments}
                open={Boolean(anchorElAssignments)}
                onClose={handleMenuCloseAssignments}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                
                elevation={0}
                sx={{ zIndex: 1200 }} 
                
                MenuListProps={{onMouseLeave: handleMenuCloseAssignments}}
                >
                        <MenuItem
                        onClick={handleMenuCloseAssignments}>All Assignments</MenuItem>
                        <MenuItem onClick={handleMenuCloseAssignments}
                        >Java</MenuItem>
                        <MenuItem  onClick={handleMenuCloseAssignments}
                        >C++</MenuItem>
                        <MenuItem  onClick={handleMenuCloseAssignments}
                        >Python</MenuItem>
                        <MenuItem  onClick={handleMenuCloseAssignments}
                        >C#</MenuItem>
                        <MenuItem  onClick={handleMenuCloseAssignments}
                        >Nasm/Masm</MenuItem>
                        <MenuItem  onClick={handleMenuCloseAssignments}
                        >C</MenuItem>
                        
                </Menu>
                <Button className="fontlink" onClick={()=>{navigate('/ContactUs')}} sx={{ color: newtheme.palette.primary.main, fontWeight: 'bold', marginRight: 4, ":hover": { borderBottom: '4px solid #ff2712' } }}>
                  Reports
                </Button>
                <IconButton sx={{color:newtheme.palette.primary.main,marginRight:2}}>
                        <NotificationsActiveIcon />
                </IconButton>
                 <IconButton sx={{color:newtheme.palette.primary.main}}
                
                >
                <img style={{
              borderRadius: 20,
              border: "2px solid grey",
            }}
            height={40}
            width={40}
            src="https://demos.creative-tim.com/material-dashboard-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"
          ></img>
                </IconButton>
                <Menu
                anchorE2={anchorE2profile}
                open={Boolean(anchorE2profile)}
                onClose={handleMenuCloseProfile}

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                
                elevation={0}
                sx={{ zIndex: 1500 , marginTop:'3%' }} 
                onMouseEnter={handleMenuOpenProfile}
                
               
                MenuListProps={{onMouseLeave: handleMenuCloseProfile}}
                >
                  <MenuItem>My profile</MenuItem>
                  <MenuItem onClick={(e) => {
              e.preventDefault()
              deleteAll()}}>Logout</MenuItem>
                </Menu>


            </Box>
          </Toolbar>
        </AppBar>

        <Box component="nav">
          <Drawer

            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

            }}
          >
            {drawer}

          </Drawer>

        </Box>


      </Box>
    </ThemeProvider>
  );
}
