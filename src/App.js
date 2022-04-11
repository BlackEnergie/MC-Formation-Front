import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import Connexion from './Connexion/Connexion';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Accueil from "./Accueil/AccueilFormations";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
      <>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route exact path="/" element={<Connexion/>} />
              <Route path="accueilformations" element={<Accueil/>}/>
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Page vide !</p>
                  </main>
                }
              />
            </Routes>
          <Footer/>
          </BrowserRouter>
      </>
  );

}

export default App;
