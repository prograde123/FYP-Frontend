import React , {useState} from 'react';
import { Box ,IconButton  } from '@mui/material';
import courseBg from '../../../assets/courseBg.jpg'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CourseContent from './CourseData/CourseContent';
import About from './CourseData/AboutCourse';
import Assignments from './CourseData/Assignments';
import Compiler from './CourseData/Compiler/Compile';
import Members from './CourseData/members';
import Instructor from './CourseData/Instructor';
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import python from '../../../assets/python.png';
import{ Divider } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { ThemeProvider } from '@mui/material/styles';
import newtheme from '../../../Themenew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FeedBack from './CourseData/FeedBack';
import AddIcon from '@mui/icons-material/Add';
function ViewCourse() {

  const [selectedTab, setSelectedTab] = useState('about');
  
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderSelectedContent = () => {
    switch (selectedTab) {
      case 'coursecontent':
        return <CourseContent />;
      case 'about':
        return <About />;
      case 'members':
        return <Members />;
      case 'instructor':
        return <Instructor />
      case 'assignments':
        return <Assignments />
      case 'compiler':
        return <Compiler />
      case 'feedback':
        return <FeedBack />
      default:
        return null;
    }
  };

  const [offset, setOffset] = useState(0);
  const MAX_VISIBLE_BUTTONS = 6
  
  const handleNext = () => {
    if (offset + MAX_VISIBLE_BUTTONS < buttons.length) {
      setOffset(offset + 1);
    }
  };

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  //Buttons

const buttons = [
  {
    label: 'About',
    tabName: 'about',
    icon: InfoIcon, 
  },
  {
    label: 'Compiler',
    tabName: 'compiler',
    icon: IntegrationInstructionsIcon,
  },
  
  {
    label: 'Assignments',
    tabName: 'assignments',
    icon: NoteAltIcon,
  },
  {
    label: 'FeedBack',
    tabName: 'feedback', 
    icon: FeedbackIcon,
  },
  
  {
    label: 'Members',
    tabName: 'members',
    icon: GroupsIcon,
  },
  {
    label: 'Instructor',
    tabName: 'instructor',
    icon: BadgeIcon,
  },
  {
    label: 'Course Contents',
    tabName: 'coursecontent',
    icon: FolderCopyIcon,
  },
 
];



  return (
    <ThemeProvider theme={newtheme}>
    <Box>
      <Box sx={{ position: 'relative' ,}}>
      <img src={courseBg} alt="Course Image"  style={{ height: 750, width: '100%' , marginTop:'-12%' }}/>
      <Box
        sx={{
          position:'absolute',
          left:0,
          top:0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(90,85,133, 0.7)', 
        }}
      />
    </Box>
    <Box sx={{ paddingBottom: "19%", display: 'flex', alignItems: 'center', 
        justifyContent: 'center',position: 'relative',
        flexDirection:'column',width:'100%'
        }}>
     
     <Box sx={{ width: '75%' }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', 
        width: '100%', marginTop: '-20%', marginBottom: '5%' }}>
          <Card sx={{ border: '1px solid #ccc', borderRadius: '8px', 
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', padding: '3%' }}>
          <Box sx={{ height: '150px', width: '150px', margin: '0 auto' }}>
            <CardMedia
              component="img"
              image={python} 
              alt="Course Image" 
              sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </Box>
            <CardContent><Box sx={{display:'flex',justifyContent:'center'}}>
              <Typography variant='h4' sx={{ fontWeight: 'bold'}}>
                Introduction To Python
              </Typography>
              </Box>
              <Grid container spacing={2} sx={{ marginTop: '2%', marginLeft:'2%' }}>
                <Grid item xs={2}>
                  <Typography variant="p"  sx={{fontWeight:'bold'}}>
                    Instructor
                  </Typography>
                  <Box sx={{paddingTop:'5%'}}>
                  <Typography variant="p" >
                    Micheal john
                  </Typography>
                  </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={2}>
                  <Typography variant="p" sx={{fontWeight:'bold'}}>
                    Language
                  </Typography>
                  <Box sx={{paddingTop:'5%'}}>
                  <Typography variant="p" >
                    Python
                  </Typography>
                  </Box>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3}>
                  <Typography variant="p"  sx={{fontWeight:'bold'}}>
                    Duration
                  </Typography>
                  <Box sx={{paddingTop:'5%'}}>
                  <Typography variant="p" >
                   23-2-2023 to 18-6-2023
                  </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Button  sx={{
                  fontWeight: 'bold', ':hover': { backgroundColor: newtheme.palette.secondary.footer }, border: 2, 
                  borderRadius: 4, paddingLeft: 3, paddingRight: 3, paddingTop: 2, paddingBottom: 2,
                  backgroundColor: newtheme.palette.secondary.background, color: newtheme.palette.primary.background
                }}> <AddIcon sx={{marginRight:1}} />
                    Join course 
                  </Button>
                </Grid>
              </Grid>
              
            </CardContent>
          </Card>
        </Grid>
    </Box>


          <Box sx={{ width: '75%' }}>
                  <Grid item xs={12}>
                  {offset > 0 && (
                      <IconButton onClick={handlePrev}>
                        <ArrowBackIosNewIcon />
                      </IconButton>
                    )}
                  {buttons.slice(offset, offset + MAX_VISIBLE_BUTTONS).map((button, index) => (
                    
                      <Button
                        key={index}
                        onClick={() => handleTabClick(button.tabName)}
                        sx={{
                          color: 'inherit',
                          position: 'relative',
                          fontWeight: 'bold',
                          '&::after': {
                            content: '""',
                            display: 'block',
                            width: '100%',
                            height: '2px',
                            background: 'red',
                            position: 'absolute',
                            bottom: '-4px',
                            transform: selectedTab === button.tabName ? 'scaleX(1)' : 'scaleX(0)',
                            transition: 'transform 0.3s ease',
                          },
                          '&:hover::after': {
                            transform: 'scaleX(1)',
                          },
                          marginLeft: index > 0 ? '2%' : '0', 
                        }}
                      >
                        {button.icon && <button.icon sx={{ marginRight: 1 }} />}
                        {button.label}
                      </Button>
                    ))}
                    {offset + MAX_VISIBLE_BUTTONS < buttons.length && (
                      <IconButton onClick={handleNext}>
                        <ArrowForwardIosIcon />
                      </IconButton>
                    )}
                    
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ padding: '1%', paddingTop: '2%' }}>
                      {renderSelectedContent()}
                    </Box>
                  </Grid>
           </Box>


    </Box>

    </Box>
    </ThemeProvider>
  );
}

export default ViewCourse;
