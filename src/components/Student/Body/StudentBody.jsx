import { Routes, Route } from "react-router-dom";

import { Box } from "@mui/material";

import { useTheme } from "@emotion/react";

import DrawerAppBar from "../Navbar";
import StartPage from "../StartPage";
import Footer from "../Footer";

export default function StudentBody() {
    const theme = useTheme()
    return (
        <>
        
            <DrawerAppBar />
            <Box height={50} />
            <Box sx={{ display: 'flex', }}>
                
                <Box component='main' sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path='/'>
                            {/* */}
                           <Route path = "Landing" element= {<StartPage />} />
                            
                        </Route>
                    </Routes>
                </Box>
            </Box>
            <Footer />
        </>
    )
}