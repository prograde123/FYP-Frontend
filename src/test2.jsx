import React, { useState } from 'react';

const SimilarityResult = ({ similarityPercentage, fileAContent, similarContent, cuurentQuestion }) => {
  const [highlightedContent, setHighlightedContent] = useState('');

  const highlightSimilarContent = () => {
    const contentWords = fileAContent.match(/(\S+|\s)/g) || [];
    const similarWords = similarContent.match(/(\S+|\s)/g) || [];
  
    const highlightedWords = contentWords.map((word, index) => {
      const isWhitespace = /\s/.test(word);
  
      if (isWhitespace) {
        return <React.Fragment key={index}>{word}</React.Fragment>; 
      }
  
      const space = index < contentWords.length - 1 ? ' ' : ''; 
  
      if (similarWords.includes(word.trim())) {
        return (
          <React.Fragment key={index}>
            <span style={{ color: 'red' }}>{word}</span>
            {space}
          </React.Fragment>
        );
      }
  
      return (
        <React.Fragment key={index}>
          <span>{word}</span>
          {space}
        </React.Fragment>
      );
    });
  
    setHighlightedContent(highlightedWords);
  };
  
  
  
  React.useEffect(() => {
    highlightSimilarContent();
  }, []);

  return (
    <div>
      <center><h1>{cuurentQuestion}</h1></center>
      <h2>Similarity Percentage: {similarityPercentage}%</h2>
      <p>
        <strong>File A Content:</strong>
      </p>
      <p>{highlightedContent}</p>
    </div>
  );
};

export default SimilarityResult;
