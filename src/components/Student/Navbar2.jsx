import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSolid, setIsSolid] = useState(false);
 

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

 

  
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const [anchorEl1, setAnchorEl1] = useState(null);

  function handleClick1(event) {
    if (anchorEl1 !== event.currentTarget) {
      setAnchorEl1(event.currentTarget);
    }
  }

  function handleClose1() {
    setAnchorEl1(null);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 0) {
      setIsSolid(true);
    } else {
      setIsSolid(false);
    }
  }, [scrollPosition]);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: isSolid ? '#fffff' : 'transparent', boxShadow: 'none', padding:'1%'}}>
      <Toolbar>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1, display:'flex', flexDirection:'row', textAlign:'center', alignItems:'center' }}>
               
              <span style={{ color: '#2a3290', fontWeight: 'bolder',fontStyle:'oblique' }}>Pro<span style={{
                color:  '#ff2712'}}>Grade</span></span>
        </Typography>
        <Button color="inherit">Home</Button>
        <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
        sx={{color:'white'}}
      >
          Courses
        </Button>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem onClick={handleClose}>C++</MenuItem>
        <MenuItem onClick={handleClose}>C#</MenuItem>
        <MenuItem onClick={handleClose}>C</MenuItem>
        <MenuItem onClick={handleClose}>Python</MenuItem>
        <MenuItem onClick={handleClose}>Java</MenuItem>
        <MenuItem onClick={handleClose}>MASM/NASM</MenuItem>
      </Menu>
      <Button
        aria-owns={anchorEl1 ? "simple-menu1" : undefined}
        aria-haspopup="true"
        onClick={handleClick1}
        onMouseOver={handleClick1}
        sx={{color:'white'}}
      >
          assignment
        </Button>
        <Menu
        id="simple-menu1"
        anchorEl={anchorEl1}
        open={Boolean(anchorEl1)}
        onClose={handleClose1}
        MenuListProps={{ onMouseLeave: handleClose1 }}
      >
        <MenuItem onClick={handleClose1}>C++ </MenuItem>
        <MenuItem onClick={handleClose1}>C</MenuItem>
        <MenuItem onClick={handleClose1}>C# </MenuItem>
        <MenuItem onClick={handleClose1}>Python</MenuItem>
        <MenuItem onClick={handleClose1}>Java</MenuItem>
        <MenuItem onClick={handleClose1}>MASM/NASM</MenuItem>
      </Menu>
        <Button color="inherit">Reports</Button>
        <IconButton color="inherit">
          <PersonIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
