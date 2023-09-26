import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import ViewUploadedAssig from "../ViewUploadedAssignment";

export default function AssignmentBody() {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <>
      <Box className={`app ${toggled ? "toggled" : ""}`}
        sx={{
          display: "flex",
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <Box sx={{marginTop:1}}></Box>
          <Routes>
            <Route path="/">
              <Route
                path="ViewUploadedAssig/:cid/:aid"
                element={<ViewUploadedAssig />}
              ></Route>
 
            </Route>
          </Routes>
        </Box>
      </Box>
    </>
  );
}
