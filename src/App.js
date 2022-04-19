import React from 'react';
import './App.css';
import {
  Route,
  Routes,
} from 'react-router-dom';
import Connexion from './components/auth/Connexion/Connexion';
import Layout from './Layout';
import DemandeFormation from './components/formation/DemandeFormation/DemandeFormation';
import Accueil from "./components/Accueil/AccueilFormations";
import ModificationFormation from "./components/formation/ModificationFormation/ModificationFormation";
import Unauthorized from './components/defaults/Unauthorized';
import Missing from './components/defaults/Missing';
import PageTest from './components/defaults/PageTest';
import RequireAuth from './components/defaults/RequireAuth';
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
          <Route path="demandeFormation" element={<DemandeFormation />} />
          <Route path="modificationFormation" element={<ModificationFormation />} />
          <Route path="pagetest" element={<PageTest />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
