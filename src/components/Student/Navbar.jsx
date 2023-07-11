import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { useTheme } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import newtheme from '../../Themenew'

const drawerWidth = 200;

const navItems = ['Home', 'Courses', 'About', 'Contact', 'Profile'];

export default function DrawerAppBar() {
  
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
              {item === 'Profile' && (
        <IconButton color={newtheme.palette.primary.main} >
          <AccountCircle />
        </IconButton>
      )}
            </ListItemButton>
          </ListItem>
        ))}
       
         
      </List>
      
    </Box>
  );

  

  return (
    <ThemeProvider theme={newtheme}>
    <Box sx={{ display: 'flex' , color: 'red' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: newtheme.palette.primary.background , padding:'1%',}} >
        <Toolbar>
          <IconButton
            color= 'theme.palette.primary.background'
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
              <span style={{ color: '#9F8C62',fontWeight:'bold' }}>ProGrade</span> 
          </Typography>
         
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: newtheme.palette.primary.main}}>
                {item}
              </Button>
            ))}
            <IconButton color="inherit" sx={{ ml: 1, color: newtheme.palette.primary.main }}>
               <AccountCircle />
            </IconButton>
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
