import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LoginIcon from '@mui/icons-material/Login';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@emotion/react';
import { useAppStore } from '../../appStore';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CreateIcon from '@mui/icons-material/Create';
import PreviewIcon from '@mui/icons-material/Preview';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GradingIcon from '@mui/icons-material/Grading';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate()
  const open = useAppStore((state) => state.dopen)
  const [sopen, setOpen] = React.useState(false);
  const[assOpen,setAssOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!sopen);
  };
  const handle = () => {
    setAssOpen(!assOpen);
  };
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => { setOpen(!open) }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ height: '100vh', backgroundColor: theme.palette.secondary.main }}>
          <ListItem disablePadding sx={{ display: 'block', color: theme.palette.primary.background }}>
            <ListItemButton onClick={() => navigate('/Teacher/Dashboard')}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.background
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ display: 'block', color: theme.palette.primary.background }}>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon sx={{ color: theme.palette.primary.background }}>
                <ContentPasteIcon />
              </ListItemIcon>
              <ListItemText primary="Courses" />
              {sopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={sopen} timeout="auto" unmountOnExit  >
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }} >
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/CreateCourse')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Course" />
                </ListItemButton>

              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/CoursesList')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <PreviewIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Courses" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/StudentRequests')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <PersonAddAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Enrolment Requests" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/AddCourseContent')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <AddBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Course Content" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/ContentList')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <GradingIcon />
                  </ListItemIcon>
                  <ListItemText primary="Course Contents" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/StudentList')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Students" />
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
          </ListItem>


          {/* <ListItem disablePadding sx={{ display: 'block', color: theme.palette.primary.background }}>
            <ListItemButton onClick={handle}>
              <ListItemIcon sx={{ color: theme.palette.primary.background }}>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Assignments" />
              {sopen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={sopen} timeout="auto" unmountOnExit  >
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }} >
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/CreateCourse')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Course" />
                </ListItemButton>

              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/CoursesList')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <PreviewIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Courses" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/StudentRequests')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <PersonAddAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Enrolment Requests" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/AddCourseContent')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <AddBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Course Content" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/ContentList')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <GradingIcon />
                  </ListItemIcon>
                  <ListItemText primary="Course Contents" />
                </ListItemButton>
              </List>
            </Collapse>
            <Collapse in={sopen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ ":hover": { backgroundColor: theme.palette.primary.background, color: theme.palette.secondary.main, fontWeight: 'bold', borderRadius: 15 } }}>
                <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/Teacher/StudentList')}>
                  <ListItemIcon sx={{ color: theme.palette.primary.background, ":hover": { color: theme.palette.secondary.main } }}>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Students" />
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
          </ListItem> */}
          <Divider />
          <ListItem disablePadding sx={{ display: 'block', color: theme.palette.primary.background }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.background
                }}
              >
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Students" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ display: 'block', color: theme.palette.primary.background }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.background
                }}
              >
                <SummarizeIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <br />
          {/* <ListItem disablePadding sx={{ display: 'block', color: theme.palette.primary.background }}>
            <Divider />
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.primary.background
                }}
              >
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem> */}
        </List>

      </Drawer>
    </Box>
  );
}