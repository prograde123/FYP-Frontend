import { Routes, Route } from "react-router-dom";
import './App.css'
import SignIn from "./components/SignIn";
import OTP from './components/OTP'
import SignUpTeacher from "./components/Teacher/Profile/SignUpTeacher";
import SignUpStudent from "./components/Student/Profile/SignUpStudent";
import ForgotPassword from "./components/ForgotPassword";
import TeacherBody from "./components/Teacher/Body/TeacherBody";
function App() {
  return (
    <>
      <Routes>
        <Route path='/SignIn' element={<SignIn />}></Route>
        <Route path="/TeacherSignUp" element={<SignUpTeacher />} />
        <Route path="/StudentSignUp" element={<SignUpStudent />} />
        <Route path='/Teacher/*' element={<TeacherBody />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />
        <Route path="OTPVerification" element={<OTP />} />
      </Routes>
    </>
  )
}

export default App
