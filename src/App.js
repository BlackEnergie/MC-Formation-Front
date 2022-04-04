import logo from './logo.svg';
import React from 'react';
import './App.css';
import Connexion from './Connexion/Connexion';
import Header from './Connexion/Header';
import Footer from './Connexion/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  <head>
    <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'
          integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN' crossOrigin='anonymous'/>

    <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin></script>
    <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossOrigin></script>
    <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossOrigin></script>
    <script>var Alert = ReactBootstrap.Alert;</script>
  </head>


  return (
      <>
        <Header/>
        <Connexion/>
        <Footer/>
      </>
  );

}

export default App;
