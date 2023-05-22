import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "../../Teacher/Sidebar";
import Navbar from "../../Teacher/Navbar";
import { useTheme } from "@emotion/react";
import ViewUploadedAssig from "../Assignments/ViewUploadedAssignment";
import ViewUploadedAssigList from "../Assignments/ViewUploadedAssigList";
import PDFViewer from "../Assignments/pdf";

export default function AssignmentBody() {
    const theme = useTheme()
    return (
        <>
            <Navbar />
            <Box height={50} />
            <Box sx={{ display: 'flex', backgroundColor: theme.palette.secondary.background }}>
                <Sidebar />
                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path='/'>
                            {/* assig Routes */}
                            <Route path="ViewUploadedAssig" element={<ViewUploadedAssig />}></Route>
                            <Route path="ViewUploadedAssigList/:id" element={<ViewUploadedAssigList /> }></Route>


                            <Route path="ViewUploadedAssig/Pdf" element={<PDFViewer />}></Route>
                        </Route>
                    </Routes>
                </Box>
            </Box>
        </>
    )
}