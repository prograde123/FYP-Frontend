import { Routes, Route,useNavigate  } from "react-router-dom";
import './App.css'
import SignIn from "./components/SignIn";
import OTP from './components/OTP'
import SignUpTeacher from "./components/Teacher/Profile/SignUpTeacher";
import SignUpStudent from "./components/Student/Profile/SignUpStudent";
import ForgotPassword from "./components/ForgotPassword";
import TeacherBody from "./components/Teacher/Body/TeacherBody";
import AssignmentBody from "./components/StudentsAndTeachers/body/assigBody";
import { useEffect } from "react";

function Auth() {
  const navigate = useNavigate()
  useEffect(() => {
    const val = localStorage.getItem('User')
    if (val == null) {
      return navigate('/SignIn')
    }
  }, [])
  return (<>
  </>)
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />}></Route>
        <Route path='/SignIn' element={<SignIn />}></Route>
        <Route path="/TeacherSignUp" element={<SignUpTeacher />} />
        <Route path="/StudentSignUp" element={<SignUpStudent />} />
        <Route path='/Teacher/*' element={<TeacherBody />} />
        <Route path="/Assignment/*" element={<AssignmentBody />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />
        <Route path="OTPVerification" element={<OTP />} />
      </Routes>
    </>
  )
}

export default App
