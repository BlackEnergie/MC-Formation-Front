import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {theme} from './Theme.js';
import { ThemeProvider } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './auth/context/AuthProvider';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
              <Toaster
                position="top-center"
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                      background: 'white',
                      color: 'black',
                    },
                  }} 
              />
            </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
