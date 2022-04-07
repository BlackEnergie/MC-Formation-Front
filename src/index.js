import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
                className: '',
                duration: 5000,
                style: {
                  background: 'white',
                  color: 'black',
                },
              }} 
        />
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
