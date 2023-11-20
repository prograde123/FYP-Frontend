import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import OTP from "./components/OTP";
import SignUpTeacher from "./components/Teacher/Profile/SignUpTeacher";
import SignUpStudent from "./components/Student/Profile/SignUpStudent";
import ForgotPassword from "./components/ForgotPassword";
import TeacherBody from "./components/Teacher/Body/TeacherBody";
import { useEffect } from "react";
import StudentBody from "./components/Student/Body/StudentBody";
import StartPage from "./components/LandingPage/StartPage";
import ContactUs from "./components/LandingPage/ContactUs";
import FileUploadForm from "./test";


function Auth() {
  const navigate = useNavigate();
  useEffect(() => {
    const val = localStorage.getItem("User");
    if (val == null) {
      return navigate("/SignIn");
    }
  }, []);
  return <></>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/Auth" element={<Auth />}></Route>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/TeacherSignUp" element={<SignUpTeacher />} />
        <Route path="/StudentSignUp" element={<SignUpStudent />} />
        <Route path="/Teacher/*" element={<TeacherBody />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />
        <Route path="/testPlagiarism"  element={<FileUploadForm />} />
        
        <Route path="OTPVerification" element={<OTP />} />
        <Route path="/Student/*" element={<StudentBody />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
