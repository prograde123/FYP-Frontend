import { Routes, Route } from "react-router-dom";
import './App.css'
import SignIn from "./components/SignIn";
import OTP from './components/OTP'
import SignUpTeacher from "./components/Teacher/Profile/SignUpTeacher";
import SignUpStudent from "./components/Student/Profile/SignUpStudent";
import ForgotPassword from "./components/ForgotPassword";
import ViewProfileTeacher from "./components/Teacher/Profile/ViewProfile";
import ViewProfileStudent from "./components/Student/Profile/ViewProfile";
import Dashboard from "./components/Teacher/Dashboard";
import CreateCourse from "./components/Teacher/Course/CreateCourse";

function App() {
  return (
    <>
      <Routes>

        //Teacher Routes
        <Route path="/Teacher/SignUp" element={<SignUpTeacher />}></Route>
        <Route path="/Student/ViewProfile" element={<ViewProfileTeacher />}></Route>
        <Route path="/Teacher/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Teacher/CreateCourse" element={<CreateCourse />}></Route>


        //Student Routes
        <Route path="/Student/SignUp" element={<SignUpStudent />}></Route>
        <Route path="/Student/ViewProfile" element={<ViewProfileStudent />}></Route>


        //Teacher and Student
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/OTPVerification" element={<OTP />}></Route>
      </Routes>
    </>
  )
}

export default App
