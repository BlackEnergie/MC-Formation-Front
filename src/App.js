import React from 'react';
import './App.css';

import Connexion from './Connexion/Connexion';
import Header from './Header/Header';
import Footer from './Footer/Footer';

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
