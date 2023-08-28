import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import {RiRadioButtonLine} from 'react-icons/ri';
import {PiStudentDuotone} from 'react-icons/pi';
import {CiEdit} from 'react-icons/ci';
import {CiRead} from 'react-icons/ci';
import {ImProfile} from 'react-icons/im';
import {RiLockPasswordLine} from 'react-icons/ri';
import {GoPerson} from 'react-icons/go';
import {HiOutlineMail} from 'react-icons/hi';
import {CiStar} from 'react-icons/ci';
import {GrStatusGoodSmall} from 'react-icons/gr';
import {GrLanguage} from 'react-icons/gr';
import {LiaLanguageSolid} from 'react-icons/lia';
import {TbRosetteNumber9} from 'react-icons/tb';
import {BsCalendarDate} from 'react-icons/bs';
import {SiTraefikproxy} from 'react-icons/si';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ViewProfile() {
  const theme = useTheme()
  const [value, setValue] = React.useState(0);
  const [isProfileOpen, setProfileOpen] = React.useState(false);
  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      
      <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
        <p style={{fontSize:25, fontWeight:'bolder', marginTop:0}}>My Profile</p>
      </Box>

      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{borderRadius:3,}}>
        {/* */}
          <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <Box sx={{boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset', borderRadius:5}}>
             <Box sx={{backgroundColor:'#000019',height:'30vh', borderRadius:5,backgroundImage: "url('https://png.pngtree.com/background/20210710/original/pngtree-blue-technology-world-telecommunication-day-banner-background-picture-image_1057076.jpg')", width:'100%',
                backgroundRepeat: "no-repeat", }}>
                <img style={{borderRadius:12, border:'5px solid white',position:'relative', top:140, marginLeft:30}} src='https://demos.creative-tim.com/material-dashboard-react/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg' height={130}></img>
             </Box>
             <Box sx={{backgroundColor:theme.palette.primary.background,height:'20vh', marginLeft:23,marginRight:5}}>
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box>
                        <Typography sx={{fontSize:22, fontWeight:'bolder', marginTop:1}}>John Doe</Typography>
                        <Box sx={{display:'flex', flexDirection:'row', }}>
                          <RiRadioButtonLine size={17} style={{marginRight:5, color:'#4cbb17'}}/>
                          <Typography style={{fontSize:14, color:'#4cbb17'}}>Active Now</Typography>
                        </Box>
                    </Box>
                    <p style={{fontSize:17, cursor:'pointer', padding:13, borderRadius:14, backgroundColor:theme.palette.secondary.button, color:theme.palette.primary.background}}>Log out</p>
                </Box>
             <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                  
                  <p style={{fontSize:16,color:'grey',marginTop:0}}><span style={{fontWeight:'bolder'}}>Role :</span> Teacher</p>
                </Box>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                <p style={{marginTop:0}}><SiTraefikproxy size={20} style={{marginRight:6}}/></p>
                  <p style={{fontSize:15,color:'grey',marginTop:0}}><span style={{fontWeight:'bolder'}}>Skilled At :</span> C | C++ | Java | Python | CSharp | MASM-NASM</p>
                </Box>
                <p style={{fontSize:15,color:'grey'}}></p>
             </Box>
             </Box>
          </Box>
          </Box>
        </Grid>
      </Grid>

     
      
            <Box sx={{ width: '100%', marginTop:3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{color:theme.palette.secondary.main}}>
                    <Tab icon={<ImProfile size={20}/>} iconPosition="start" sx={{fontWeight:'bold'}} label="Profile Information" {...a11yProps(0)} />
                    <Tab icon={<RiLockPasswordLine size={20}/>} iconPosition="start" sx={{fontWeight:'bold'}} label="Change Password" {...a11yProps(1)} />
                  </Tabs>
                </Box>
              <CustomTabPanel value={value} index={0}>
{/* information */}
                <Grid container gap={2}>
                  <Grid item xs={12} md={12} lg={6} >
                    <Box sx={{height:'80vh',boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset', borderRadius:5}}>
                      <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:5, marginRight:5, marginTop:1}}>
                        <Box sx={{marginTop:1}}>
                          <p style={{fontWeight:'bolder', fontSize:25}}>About</p>
                        </Box>
                        <Box sx={{marginTop:4}}>
                          <Button onClick={handleProfileOpen} sx={{":hover":{backgroundColor:"#4cbb17"},backgroundColor:"#4cbb17", color:theme.palette.primary.background, paddingRight:3, paddingLeft:3,paddingTop:1,paddingBottom:1, borderRadius:3}} startIcon={<CiEdit size={20}/>}>Edit</Button>
                        </Box>
                        <Modal
                            open={isProfileOpen}
                            onClose={handleProfileClose}
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                            }}>
                            <Fade in={isProfileOpen}>
                            <Box
                                sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '90%',
                                maxWidth: '400px',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: theme.palette.primary.background,
                                boxShadow: 24,
                                p: 4,
                                borderRadius: '5%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                }}
                            >
                                <Typography id="transition-modal-description" sx={{}}>
                                {/* Content of the modal */}
                                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                  <p style={{fontWeight:'bolder', fontSize:23, marginTop:0}}>Edit Profile Information</p>
                                </Box>
                                <Box>
                                    <Box sx={{ textDecoration: 'none', textAlign: 'center' }}>
                                    <TextField sx={{width:'100%'}} id="secondary" label="Full Name" variant="outlined"/>
                                    </Box>
                                </Box>
                                <br />
                                <Box>
                                    <Box onClick={()=>{navigate('/TeacherSignUp')}} sx={{ textDecoration: 'none', textAlign: 'center' }}>
                                    <TextField sx={{width:'100%'}} id="secondary" label="Email" variant="outlined"/>
                                    </Box>
                                </Box>
                                <br />
                                <Box>
                                    <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Profile Picture <Button variant="outlined" component="label" color='secondary' sx={{ width: '100%', padding: 0.5, borderStyle: 'dashed', borderRadius: 2 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                                        Click to browse or <br />
                                        Drag and Drop Files
                                        <input hidden accept="file/*" multiple type="file" />
                                    </Button></Button></Typography>
                                </Box>
                                <br/>
                                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                                  <Button
                                      type='submit'
                                      variant="contained" color="secondary"  sx={{ width: '90%', padding: 2, fontSize: 16, fontWeight: 'bold', marginTop: 1,borderRadius:2 }}>
                                      Save Changes
                                  </Button>
                                </Box>
                               
                                </Typography>
                              </Box>
                            </Fade>
                        </Modal>
                      </Box>
                      <Box sx={{marginLeft:4, marginRight:4}}>
                          <Box sx={{display:'flex', flexDirection:'row', marginTop:2}}>
                            <GoPerson size={22} style={{color:'black', marginRight:5}}/>
                            <p style={{marginTop:0, fontSize:18, marginRight:20}}>Full Name : </p>
                            <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>John Doe</p>
                          </Box>
                          <Box sx={{display:'flex', flexDirection:'row', marginTop:2}}>
                            <HiOutlineMail size={22} style={{color:'black', marginRight:5}}/>
                            <p style={{marginTop:0, fontSize:18, marginRight:20}}>Email Address : </p>
                            <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>JohnDoe@gmail.com</p>
                          </Box>
                          <Box sx={{display:'flex', flexDirection:'row', marginTop:2, justifyContent:'space-between'}}>
                            <Box sx={{display:'flex', flexDirection:'row'}}>
                              <CiStar size={27} style={{color:'black', marginRight:5}}/>
                              <p style={{marginTop:0, fontSize:18, marginRight:20}}>Role : </p>
                              <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>Teacher</p>
                            </Box>
                            <Box sx={{display:'flex', flexDirection:'row'}}>
                              <GrStatusGoodSmall size={22} style={{color:'black', marginRight:5}}/>
                              <p style={{marginTop:0, fontSize:18, marginRight:20}}>Status : </p>
                              <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>Active</p>
                            </Box>
                          </Box>
                          <Box sx={{display:'flex', flexDirection:'row', marginTop:2, justifyContent:'space-between'}}>
                            <Box sx={{display:'flex', flexDirection:'row'}}>
                              <GrLanguage size={22} style={{color:'black', marginRight:5}}/>
                              <p style={{marginTop:0, fontSize:18, marginRight:20}}>Country : </p>
                              <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>Pakistan</p>
                            </Box>
                            <Box sx={{display:'flex', flexDirection:'row'}}>
                              <LiaLanguageSolid size={22} style={{color:'black', marginRight:5}}/>
                              <p style={{marginTop:0, fontSize:18, marginRight:20}}>Language : </p>
                              <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>English</p>
                            </Box>
                          </Box>
                          <Box sx={{display:'flex', flexDirection:'row', marginTop:2}}>
                            <TbRosetteNumber9 size={22} style={{color:'black', marginRight:5}}/>
                            <p style={{marginTop:0, fontSize:18, marginRight:20}}>Number of Current Courses : </p>
                            <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>10</p>
                          </Box>
                          <Box sx={{display:'flex', flexDirection:'row', marginTop:2}}>
                            <SiTraefikproxy size={22} style={{color:'black', marginRight:5}}/>
                            <p style={{marginTop:0, fontSize:18, marginRight:20}}>Skills : </p>
                            <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>C | C++ | Java | Python | CSharp | MASM-NASM</p>
                          </Box>
                          <Box sx={{display:'flex', flexDirection:'row', marginTop:2}}>
                            <BsCalendarDate size={22} style={{color:'black', marginRight:5}}/>
                            <p style={{marginTop:0, fontSize:18, marginRight:20}}>Joined At : </p>
                            <p style={{marginTop:0, fontSize:18, fontWeight:'bold'}}>21/08/2023</p>
                          </Box>
                      </Box>
                    </Box>
                  </Grid>


{/* Notifications */}
                  <Grid item xs={12} md={12} lg={5} >
                    <Box sx={{height:'80vh',boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset', borderRadius:5}}>
                      <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:5, marginRight:5, marginTop:1}}>
                        <Box sx={{marginTop:1}}>
                        <p style={{fontWeight:'bolder', fontSize:25}}>Notifications</p>
                        </Box>
                        <Box sx={{marginTop:4}}>
                        <Button sx={{":hover":{backgroundColor:theme.palette.secondary.main},backgroundColor:theme.palette.secondary.button, color:theme.palette.primary.background, paddingRight:3, paddingLeft:3,paddingTop:1,paddingBottom:1, borderRadius:3}} startIcon={<CiRead size={20}/>}>Read All</Button>
                      
                        </Box>
                        </Box>
                      </Box>  
                  </Grid>
                </Grid>

{/* change password tab */}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Grid container sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                  <Grid item xs={12} md={12} lg={8} >
                    <Box sx={{height:'80vh',boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset', borderRadius:5}}>
                      <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <Typography sx={{fontWeight:'bolder', fontSize:27, marginTop:8}}>Change Password</Typography>
                      </Box>
                      <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                        <p style={{margin:0, fontSize:15, color:'grey'}}>Please Enter your previous password to change it to new password.</p>
                      </Box>
                      <Box sx={{marginTop:5}}>
                          <Box sx={{ textDecoration: 'none', textAlign: 'center' }}>
                            <TextField sx={{width:'50%'}} id="secondary" label="Enter Previous Password" variant="outlined"/>
                          </Box>
                                
                          <br />
                                
                          <Box sx={{ textDecoration: 'none', textAlign: 'center' }}>
                            <TextField sx={{width:'50%'}} id="secondary" label="Enter New Password" variant="outlined"/>
                          </Box>
                                
                          <br />
                          <Box sx={{ textDecoration: 'none', textAlign: 'center' }}>
                            <TextField sx={{width:'50%'}} id="secondary" label="Confirm New Password" variant="outlined"/>
                          </Box>

                          <br/>
                          <Box sx={{ marginTop: 1, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                            <Button 
                              variant="contained" color="secondary" sx={{ width: '50%', padding: 2, fontSize: 16, fontWeight: 'bold', borderRadius:2 }}>
                              Save New Password
                              </Button>
                          </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CustomTabPanel>
              
            </Box>
        

     
    </Box>
  );
}
export default ViewProfile;