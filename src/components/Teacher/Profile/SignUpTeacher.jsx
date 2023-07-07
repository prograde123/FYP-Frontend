import React from 'react';
import { Button, Typography } from '@mui/material';
import  Box from '@mui/material/Box';
import SignupImage from '../../../assets/signup.png'
import LogoImage from '../../../assets/logo.png'
import GoogleImage from '../../../assets/google.png'
import FbImage from '../../../assets/fb.png'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import {FormHelperText} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { storage } from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Person2Icon from '@mui/icons-material/Person2';
import { MuiTelInput } from 'mui-tel-input'
import { Link } from "react-router-dom";
import { Register } from '../../../../Axios/axiosall';

const SignUp = () => {
    const theme = useTheme()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate()
    
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [Cpass, setCPass] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [pic,setPic] = React.useState('')
    const [file, setFile] = React.useState(null)
    const [fileError,setFileError] = React.useState('')
    const [nameError,setNameError]  = React.useState('')
    const [emailError,setEmailError]  = React.useState('')
    const [passError, setPassError] = React.useState('')
    const [phoneError, setPhoneError] = React.useState('')


    const ValidateName = (name,setError) => {
        const namePattern = /^[A-Za-z\s]+$/
        if(!namePattern.test(name) || name == '') {
            setError('Invalid Name')
            return false
        }
        setError('')
        return true
    }
    const ValidateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailPattern.test(email) || email == '') {
            setEmailError('Email Error')
            return false
        }
        setEmailError('')
        return true
    }

    const ValidatePhone = () => {
        const phonePattern = /^03[0-4]\d{8}$/
        if(!phonePattern.test(phone) || phone == '') {
            setPhoneError('Invalid Phone Number')
            console.log(phone)
            return false
        }
        setPhoneError('')
        console.log(phone)
        return true
    }

    const validatePasswords = () => {
        if (pass != Cpass || pass == '' || Cpass == '') {
          setPassError('Passwords do not match');
          return false;
        }
        setPassError('');
        return true;
      };

    const validateFile = () => {
        if(file == null || file == ''){
            setFileError('File is required')
            return false;
        }
        setFileError('')
        return true;
    }
    const handleClick = () => {
        const isNameValid = ValidateName(name,setNameError)
        const isEmailValid = ValidateEmail()
        const isPhoneValid = ValidatePhone()
        const isPassValid = validatePasswords()
        const isValidFile = validateFile()
        if(isNameValid && isEmailValid && isPhoneValid && isPassValid && isValidFile){
            addFile()
        }
    }
    const addFile = () => {
        if (file === null) return;
        const cvRef = ref(storage, `CV/${file.name}`)
        const uploadTask = uploadBytesResumable(cvRef, file)
        uploadTask.on('state_changed', (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(progress)
        }, (error) => {
          console.log("error")
        }, () => {
          console.log("success!")
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            registerTeacher(downloadURL)
            
          })
        })
      }

      const registerTeacher = (cvURL) => {
        const isNameValid = ValidateName(name,setNameError)
        const isEmailValid = ValidateEmail()
        const isPhoneValid = ValidatePhone()
        const isPassValid = validatePasswords()
        if(isNameValid && isEmailValid && isPhoneValid && isPassValid && cvURL != ''){
           const response =  Register(name,email,pass,"Teacher",phone,pic,cvURL,'')
           if(response){
                navigate('/SignIn')
           }
           else{
            alert('Error Occured')
           }
        }
      }

    return (
        <Box sx={{ flexDirection: 'row', display: 'flex', maxHeight: '200vh'}}>
            <Box bgcolor={theme.palette.secondary.main} sx={{ borderBottomRightRadius: 16, borderTopRightRadius: 16, width: '60%' }} >
                <Typography variant='h4' sx={{ color: theme.palette.primary.background, marginLeft: 3, marginTop: 4, fontWeight: 'bold' }}><img src={LogoImage} height={30} /> <span style={{ color: '#9F8C62' }}>Pro</span>Grade </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 3, justifyContent: 'center' }}>
                    <Typography variant='h4' sx={{ color: theme.palette.primary.background, fontWeight: 'bold' }}>Welcome to <span style={{ color: '#9F8C62' }}>Pro</span>Grade </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Typography variant='h5' sx={{ color: theme.palette.primary.background }}>Sign In Now ! </Typography>
                </Box>
                <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
                    <img style={{ maxWidth: '100%', height: '100vh' }} src='https://www.paradisosolutions.com/wp-content/uploads/2020/03/4-2-300x300.png' />
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
                            <FormHelperText>
                                    <Typography variant="body2" color="error">
                                        {nameError}
                                    </Typography>
                            </FormHelperText>
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
                            <Typography variant="body2" color="error">
                                        {emailError}
                                    </Typography>
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
                                value={Cpass}
                                onChange={(e) => setCPass(e.target.value)}
                            />
                            <FormHelperText>
                                    <Typography variant="body2" color="error">
                                        {passError}
                                    </Typography>
                            </FormHelperText>
                        </FormControl>
                        <FormControl sx={{ width: '100%', marginTop: 4 }}  >
                            <InputLabel htmlFor="outlined-adornment-email" color='secondary'>Phone</InputLabel>
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
                                            {<PhoneEnabledIcon />}
                                        </Button>
                                    </InputAdornment>
                                }
                                label="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Typography variant="body2" color="error">
                                        {phoneError}
                                    </Typography>
                        </FormControl>
                  
                        <Box sx={{ marginTop: 4, marginBottom: 2, fontWeight: 'bold' }} >
                            <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Upload Profile  <Button variant="outlined" component="label" color='secondary' sx={{ width: '100%', padding: 2, borderStyle: 'dashed', borderRadius: 6 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                                Click to browse or <br />
                                Drag and Drop Files
                                <input hidden accept="file/*" multiple type="file" />
                            </Button></Button></Typography>
                        </Box>
                        <Box sx={{ marginTop: 1, fontWeight: 'bold', width: '100%' }} >
              <Typography variant='caption' sx={{ fontWeight: 'bold' }}>Upload CV* <Button variant="outlined" component="label" color='secondary' sx={{ width: '100%', padding: 2, borderStyle: 'dashed', borderRadius: 6 }}><Button variant="dashed" component="label" sx={{ color: '#999999' }}>
                Click to browse or <br />
                Drag and Drop Files
                <input name='file' onChange={(e) => { setFile(e.target.files[0]) }} hidden accept="file/cvt/*" multiple type="file" />
              </Button></Button></Typography>
              {(<p style={{ color: 'red',fontWeight:'normal', marginTop: 0, marginLeft: 4, marginBottom: 0,display:'flex', flexDirection:'row', justifyContent: 'center' }}>{fileError}</p>) }
            </Box>
                    </Box>
                    <Box >
                        <Button
                         type='submit' onClick={() => { handleClick() }}
                         
                        variant="contained" color="secondary" endIcon={<HowToRegIcon />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold', marginTop: '2%' }}>
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

