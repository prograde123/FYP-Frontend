import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimilarityResult from './test2';
import storage from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Button } from '@mui/material';

const FileUploadForm = () => {
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [result, setResult] = useState([]);
  const [currQuestion , setCurrQuestion] = useState(null)


  const fetchFile_to_be_checked = async (AssignmentID, userID, index, format) => {
    try {
      const fileRef = ref(
        storage,
        `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
      );

      const downloadURL = await getDownloadURL(fileRef);
      console.log('Download URL:', downloadURL);

      const response = await fetch(downloadURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const fileBlob = await response.blob();
      console.log(`File: ${fileBlob}`);

      const customFileObject = new File([fileBlob], `Q${index + 1}${format}`, {
        type: fileBlob.type,
        lastModified: new Date().getTime(), 
      });

      setFileA(customFileObject);
      console.log('File fetched successfully.');
      
      return customFileObject
    } catch (error) {
      console.error('Error fetching file:', error);
      return null
    }
  };

  const fetchFile_for_comaprison = async (AssignmentID, userID, index, format) => {
  try {
    const fileRef = ref(
      storage,
      `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
    );

    const downloadURL = await getDownloadURL(fileRef);
    console.log('Download URL:', downloadURL);

    
    const response = await fetch(downloadURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const fileBlob = await response.blob();
    const customFileObject = new File([fileBlob], `Q${index + 1}${format}`, {
      type: fileBlob.type,
      lastModified: new Date().getTime(), 
    });

    setFileB(customFileObject);
    return customFileObject;

  } 
  catch (error) {
    console.error('Error fetching file:', error);
    return null
  }
};
 
  const handleSubmit = async () => {
    const Assig_id = '65242fcfe45348a1ece15c0b';
    const student_TO_be_checked = '64f0b6b7448605ec2c77b79a';
    const SubmittedSids = ['6513f3c68049d9b3df93e296'];
    const assigFormat = '.c';
    const numberOfQuestions = 1;
  
    for (let index = 0; index < numberOfQuestions; index++) {
      setFileA(null);
      const a = await fetchFile_to_be_checked(Assig_id, student_TO_be_checked, index, assigFormat);
      setCurrQuestion(index + 1);
  
      for (let j = 0; j < SubmittedSids.length; j++) {
        try {
          setFileB(null);
          const b = await fetchFile_for_comaprison(Assig_id, SubmittedSids[j], index, assigFormat);
          console.log(a)
          console.log(b)
        
          const formDataB = new FormData();
          formDataB.append('file_a', a);
          formDataB.append('file_b', b);
  
          const responseB = await axios.post('http://127.0.0.1:8000/get_plagiarism', formDataB, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          setResult((prevResult) => [...prevResult, responseB.data]);
        } catch (error) {
          console.error('Error uploading files:', error);
        }
      }
    }
  };
  
  

  return (
    <div>
      <Button onClick={handleSubmit}>
          Check Plagiarism
      </Button>
          {result.map((res, index) => (
        <div key={index}>
          <pre>
            <SimilarityResult
            similarityPercentage={res['similarity_percentage']}
            fileAContent={res['file_a_content']}
            similarContent={res['similar_content']}
           
          />
          </pre>
        </div>
      ))}
    </div>
  );
};

export default FileUploadForm;
