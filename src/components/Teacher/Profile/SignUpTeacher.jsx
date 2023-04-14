import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import SignupImage from '../../../assets/signup.png'
import LogoImage from '../../../assets/logo.png'
import GoogleImage from '../../../assets/google.png'
import FbImage from '../../../assets/fb.png'
import { useTheme } from '@emotion/react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Person2Icon from '@mui/icons-material/Person2';
import { MuiTelInput } from 'mui-tel-input'
import { Link } from "react-router-dom";

const SignUp = () => {
    const theme = useTheme()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [phone, setPhone] = React.useState('+92')
    
// axios function

    async function addUser() {
        try {
          const url = ""; //paste the link here of local host
          const user = {
            //attributes and states here

          };
          const response = await axios.post(url, user);
        } catch (e) {
          console.log(e);
        }
      }

    return (
        <Box sx={{ flexDirection: 'row', display: 'flex', maxHeight: '100vh'}}>
            <Box bgcolor={theme.palette.secondary.main} sx={{ borderBottomRightRadius: 16, borderTopRightRadius: 16, width: '60%' }} >
                <Typography variant='h4' sx={{ color: theme.palette.primary.background, marginLeft: 3, marginTop: 4, fontWeight: 'bold' }}><img src={LogoImage} height={30} /> <span style={{ color: '#9F8C62' }}>Pro</span>Grade </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3, justifyContent: 'center' }}>
                    <Typography variant='h4' sx={{ color: theme.palette.primary.background, fontWeight: 'bold' }}>Welcome to <span style={{ color: '#9F8C62' }}>Pro</span>Grade </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Typography variant='h5' sx={{ color: theme.palette.primary.background }}>Sign In Now ! </Typography>
                </Box>
                <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
                    <img style={{ maxWidth: '100%', height: '60vh' }} src={SignupImage} />
                </Box>
            </Box>
            <Box sx={{ width: '80%' }}>
                <Box sx={{ marginLeft: 10, marginRight: 10, marginTop: 4 }}>
                    <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 3 }}>Create Account (Teacher) </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button variant="outlined" color='secondary'> <img src={GoogleImage} height={28} style={{ marginRight: 15 }} />Signup with Google</Button>
                        <Button variant="outlined" color='secondary' > <img src={FbImage} height={28} style={{ marginRight: 15 }} />Signup with Facebook</Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Typography sx={{ fontWeight: 'bold', marginBottom: 2, marginTop:2 }}>- OR -</Typography>
                    </Box>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel htmlFor="outlined-adornment-name" color='secondary'>Full Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-name"
                                color='secondary'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button
                                            aria-label="toggle name visibility"
                                            edge="end"
                                            color='secondary'
                                        >
                                            {<Person2Icon />}
                                        </Button>
                                    </InputAdornment>
                                }
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%', marginTop: 4 }}  >
                            <InputLabel htmlFor="outlined-adornment-email" color='secondary'>Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                color='secondary'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button
                                            aria-label="toggle email visibility"
                                            edge="end"
                                            color='secondary'
                                        >
                                            {<EmailIcon />}
                                        </Button>
                                    </InputAdornment>
                                }
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%', marginTop: 4 }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" color='secondary'>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                color='secondary'
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            color='secondary'
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </Button>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ width: '100%', marginTop: 4 }} variant="outlined" >
                            <InputLabel htmlFor="outlined-adornment-password" color='secondary'>Confirm Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                color='secondary'
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Button
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            color='secondary'
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </Button>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>
                        <MuiTelInput value={phone} onChange={(e) => setPhone(e.target.value)} sx={{ marginTop: 4 }} variant="outlined" color='secondary'>
                        </MuiTelInput>
                        <Box sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold' }} >
                            <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Upload CV*  <Button variant="outlined" component="label" color='secondary' sx={{ width: '100%', padding: 2, borderStyle: 'dashed', borderRadius: 6 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                                Click to browse or <br />
                                Drag and Drop Files
                                <input hidden accept="file/*" multiple type="file" />
                            </Button></Button></Typography>
                        </Box>
                        <Box sx={{ marginTop: 2, marginBottom: 4, fontWeight: 'bold' }} >
                            <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Upload Profile Picture* (Optional)  <Button variant="outlined" component="label" color='secondary' sx={{ width: '100%', padding: 2, borderStyle: 'dashed', borderRadius: 6 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                                Click to browse or <br />
                                Drag and Drop Files
                                <input hidden accept="file/*" multiple type="file" />
                            </Button></Button></Typography>
                        </Box>
                    </Box>
                    <Box >
                        <Button variant="contained" color="secondary" endIcon={<HowToRegIcon />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                            Sign Up
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: 'row', marginTop: 1, width: '100%', justifyContent: 'center', marginBottom: 4 }}>
                        <Typography variant='body1' sx={{ color: '#999999', marginBottom:4 }} >Already have an account?<Link style={{ textDecoration: 'none' }} to="/SignIn"><span style={{ color: "#6614A5" }}>Sign In</span></Link> </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SignUp;