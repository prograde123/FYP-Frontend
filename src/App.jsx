import SignIn from "./components/SignIn";
import SignUp from "./components/SignUpTeacher";
import SignUpStudent from "./components/SignUpStudent";
import ForgotPassword from "./components/ForgotPassword";
import OTP from './components/OTP'
import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/TeacherSignUp" element={<SignUp />}></Route>
        <Route path="/StudentSignUp" element={<SignUpStudent />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/OTPVerification" element={<OTP />}></Route>
      </Routes>
    </>
  )
}

export default App
