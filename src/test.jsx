import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SimilarityResult from './test2';
import storage from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage";


const fetchFiles = async (AssignmentID, userID, index, format) => {
    try {
      const fileRef = ref(
        storage,
        `Submission/${AssignmentID}/${userID}/Q${index + 1}${format}`
      );
  
      const downloadURL = await getDownloadURL(fileRef);
  
      console.log("Download URL:", downloadURL);
    const response = await axios.get(downloadURL, { responseType: 'arraybuffer' });
    fs.writeFileSync(`Q${index + 1}${format}`, response.data);

    console.log("File created successfully.");
  
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };



const FileUploadForm = () => {
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState([]);

  useEffect(()=>{
    fetchFiles('64fb0492ed746530e938a1e9','6511c1f0bc2828793be83bfe',0 ,'.py')
  })
  const handleFileAChange = (e) => {
    setFileA(e.target.files[0]);
  };

  const handleFileBChange = (e) => {
    setFileB([...e.target.files]);
  };

  const [result, setResult] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    for (const file of fileB) {
      try {
        const formDataB = new FormData();
        formDataB.append('file_a', fileA); 
        formDataB.append('file_b', file);
  
        const responseB = await axios.post('http://127.0.0.1:8000/get_plagiarism', formDataB, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setResult(prevResult => [...prevResult, responseB.data]);
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileA">File A:</label>
          <input type="file" id="fileA" onChange={handleFileAChange} />
        </div>
        <div>
          <label htmlFor="fileB">File B (multiple files allowed):</label>
          <input type="file" id="fileB" onChange={handleFileBChange} multiple />
        </div>
        <button type="submit">Submit</button>
      </form>

      {result.map((res, index) => (
        <div key={index}>
          <b><p>Similarity from backend API: {res['similar_content']}</p></b>
          <b><p>File content from backend API: {res['file_a_content']}</p></b>
          <SimilarityResult
            similarityPercentage={res['similarity_percentage']}
            fileAContent={res['file_a_content']}
            similarContent={res['similar_content']}
          />
        </div>
      ))}
    </div>
  );
};

export default FileUploadForm;
