import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { theme } from "./theme"
 import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter  >
         <ThemeProvider theme={theme}>
          <App/>
        </ThemeProvider> 
    </BrowserRouter>
  </React.StrictMode>
)
