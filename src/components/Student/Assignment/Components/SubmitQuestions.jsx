import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@emotion/react";
import http from "../../../../../Axios/axios";
import { useLocation } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";


export default function Submit() {
  const Questions = useLocation().state?.Questions;
  const format = useLocation().state?.format
  const courseID = useLocation().state?.courseID

  const AssignmentID = window.location.pathname.split("/").pop()

    
  const [index, setIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [questionDescription, setQuestionDescription] = useState(
    Questions[index].questionDescription
  );
  const [questionMarks, setQuestionMarks] = useState(
    Questions[index].questionTotalMarks
  );
  const [nextClick, setNextClick] = useState(false);
  const theme = useTheme();
  const nav = useNavigate()

  const handleClick = async () => {
  
    if(fileInput.current.value == ''){
      const confirmUpload = window.confirm("No file selected. Do you want to continue without uploading a file?");
      if (confirmUpload) {
        fileInput.current.value = '';
        const newIndex = index + 1;
        setIndex(newIndex);
  
        if (newIndex < Questions.length) {
          await setQuestionMarks(Questions[newIndex].questionTotalMarks);
          await setQuestionDescription(Questions[newIndex].questionDescription);
        }
      }
    }
    else{
      
      fileInput.current.value = '';
      const newIndex = index + 1;
      setIndex(newIndex);

      if (newIndex < Questions.length) {
        await setQuestionMarks(Questions[newIndex].questionTotalMarks);
        await setQuestionDescription(Questions[newIndex].questionDescription);
      }
    }
    
  };

  const handleSubmit = async () => {
  
    if(fileInput.current.value == ''){
      const confirmUpload = window.confirm("No file selected. Do you want to continue without uploading a file?");
      if (confirmUpload) {
        nav(`/Teacher/ViewUploadedAssig/${courseID}/${AssignmentID}`)
      }
    }
    else{
      nav(`/Teacher/ViewUploadedAssig/${courseID}/${AssignmentID}`)

    }
    
  };
  const fileInput = useRef(null);

  const action = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const selectedFiles = fileInput.current.files;

    
   


    if(selectedFiles.length > 0){
      const FileSplit = selectedFiles[0].name.split('.')
      const FileFormat = `.${FileSplit[FileSplit.length - 1]}`

       if(FileFormat === format){
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('files', selectedFiles[i]);
        }
        let url;
        switch (
          format
        ) {
          case ".py":
            url = `/submit/Python/${Questions[index]._id}`
            break;
          case ".java":
            url = `/submit/Java/${Questions[index]._id}`
            break;
          case ".c":
            url = `/submit/C/${Questions[index]._id}`
            break;
          case ".cpp":
            url = `/submit/Cpp/${Questions[index]._id}`
            break;
          default:
            break;
        }
        try {
          const response = await http.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('There was an error uploading the file:', error);
        }
       }
       else{
        alert(`File Format should be  ${format}`)
        fileInput.current.value = '';
       }
  }
  else{
    alert("Select File to Upload");
  }
  };


 

  return (
    <Box sx={{ mt: "5%" }}>
      <Grid container spacing={2} sx={{ padding: "2%" }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h4">Question # {index + 1}</Typography>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Box sx={{ justifyContent: "flex-start" }}>
              <Typography variant="h5">{questionDescription}</Typography>
            </Box>
            <Box sx={{ justifyContent: "flex-end" }}>
              <Typography variant="h6">( {questionMarks} )</Typography>
            </Box>
          </Box>
        </Grid>

        <div className="container" style={{ paddingTop: '20px' }}>
      <form onSubmit={action} encType="multipart/form-data">
        <div id="uploadForm" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            type="file"
            name="files"
            ref={fileInput}
            className="btn btn-primary"
            style={{ flex: 0.8 }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ color: theme.palette.secondary.text,
              backgroundColor: theme.palette.secondary.main,
              fontWeight: "bold",
              boxShadow: 10,
              my: 3,
              ":hover": {
                backgroundColor: theme.palette.secondary.hoverButton,
                color: theme.palette.secondary.main,
              },
              border: 1,
              borderRadius: 2,
              paddingLeft: 1,
              paddingRight: 1,
              paddingTop: 1,
              paddingBottom: 1,
              borderColor: theme.palette.secondary.Button, }}
          >
            Upload
          </button>
        </div>
      </form>
    </div>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          {index + 1 < Questions.length && (
            <Button
              onClick={handleClick}
              disabled={index + 1 < Questions.length ? false : true}
              sx={{
                color: theme.palette.secondary.text,
                backgroundColor: theme.palette.secondary.main,
                fontWeight: "bold",
                boxShadow: 10,
                my: 3,
                ":hover": {
                  backgroundColor: theme.palette.secondary.hoverButton,
                  color: theme.palette.secondary.main,
                },
                border: 1,
                borderRadius: 2,
                paddingLeft: 1,
                paddingRight: 1,
                paddingTop: 1,
                paddingBottom: 1,
                borderColor: theme.palette.secondary.Button,
              }}
            >
              {"Next"}
              
            </Button>
          )}
          {index + 1 >= Questions.length && (
            <Button
            onClick={handleSubmit}
              sx={{
                color: theme.palette.secondary.text,
                backgroundColor: theme.palette.secondary.main,
                fontWeight: "bold",
                boxShadow: 10,
                my: 3,
                ":hover": {
                  backgroundColor: theme.palette.secondary.hoverButton,
                  color: theme.palette.secondary.main,
                },
                border: 1,
                borderRadius: 2,
                paddingLeft: 1,
                paddingRight: 1,
                paddingTop: 1,
                paddingBottom: 1,
                borderColor: theme.palette.secondary.Button,
              }}
            >
              {"Submit"}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

