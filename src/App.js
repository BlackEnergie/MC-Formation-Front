import React from 'react';
import './App.css';
import {
  Route,
  Routes,
} from 'react-router-dom';
import Connexion from './Connexion/Connexion';
import Layout from './Layout';
import DemandeFormation from './demandeFormation/DemandeFormation';
import Accueil from "./Accueil/AccueilFormations";
import ModificationFormation from "./ModificationFormation/ModificationFormation";
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import PageTest from './components/PageTest';
import RequireAuth from './components/RequireAuth';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="connexion" element={<Connexion />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={'ROLE_ASSO'} />}>
          <Route path="/" element={<Accueil />} />
          <Route path="demandeformation" element={<DemandeFormation />} />
          <Route path="modificationformation" element={<ModificationFormation />} />
          <Route path="pagetest" element={<PageTest />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
