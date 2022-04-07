import React from 'react';
import './App.css';
import Connexion from './Connexion/Connexion';
import Header from './Connexion/Header';
import Footer from './Connexion/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
      <>
        <Header/>
        <Connexion/>
        <Footer/>
      </>
  );

}

export default App;
