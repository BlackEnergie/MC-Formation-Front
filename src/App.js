import React from 'react';
import './App.css';
import ModificationFormation from './ModificationFormation/ModificationFormation';
import Header from './Connexion/Header';
import Footer from './Connexion/Footer';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
      <>
        <Header/>
        <ModificationFormation/>
        <Footer/>
      </>
  );

}

export default App;
