import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LogoImage from '../assets/logo.png'
import SignInImage from '../assets/Saly.png'
import CircleImage from '../assets/circle.png'
import { useTheme } from '@emotion/react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';


function SignIn() {
    const theme = useTheme()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')



    //axios function request here below the states



    return (
        <Box sx={{ flexDirection: 'row', display: 'flex', height: '100vh' }}>
            <Box bgcolor={theme.palette.secondary.main} sx={{ borderBottomRightRadius: 16, borderTopRightRadius: 16, width: '60%' }} >
                <Typography variant='h4' sx={{ color: theme.palette.primary.background, marginLeft: 3, marginTop: 4, fontWeight: 'bold' }}><img src={LogoImage} height={30} /> <span style={{ color: '#9F8C62' }}>Pro</span>Grade </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3, justifyContent: 'center' }}>
                    <Typography variant='h4' sx={{ color: theme.palette.primary.background, fontWeight: 'bold' }}>Welcome to <span style={{ color: '#9F8C62' }}>Pro</span>Grade </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Typography variant='h5' sx={{ color: theme.palette.primary.background }}>Sign In Now ! </Typography>
                </Box>
                <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxWidth: '100%', maxHeight: '60vh' }} src={SignInImage} />
                </Box>
            </Box>
            <Box sx={{ width: '80%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <img src={CircleImage} height='150vh' />
                </Box>

                <Box sx={{ marginLeft: 10, marginRight: 10 }}>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 1 }}>Sign In </Typography>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 1 }}>
                        <FormControl sx={{ width: '100%', marginTop: 4 }}>
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
                        <Box sx={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-end', marginTop: 1 }}>
                            <Typography color='secondary'><Link to='/ForgotPassword' style={{ textDecoration: 'none' }}>Forgot Password?</Link></Typography>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 5 }}>
                        <Button variant="contained" color="secondary" endIcon={<LoginIcon />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                            Sign In
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: 'row', marginTop: 2, width: '100%', justifyContent: 'center' }}>
                        <Typography variant='body1' sx={{ color: '#999999' }} >Don't have an account?<Link to="/Teacher/SignUp" style={{ textDecoration: 'none' }}><span style={{ color: "#6614A5" }}>Sign Up</span></Link> </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default SignIn;
