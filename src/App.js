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
import VueDetailleeFormation from './components/formation/VueDetailleeFormation/VueDetailleeFormation'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormulaireInscription from './components/auth/Inscription/FormulaireInscription';
import Admin from './components/auth/Inscription/Admin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="connexion" element={<Connexion />} />
      
        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={'ROLE_ASSO'} />}>
          <Route path="accueil" element={<Accueil />} />
          <Route path="demandeFormation" element={<DemandeFormation />}/>
          <Route path="pagetest" element={<PageTest />} />
          <Route path="formation/:id" element={<VueDetailleeFormation/>} />
          <Route path="formation/edit/:id" element={<ModificationFormation/>}/>
        </Route>
        <Route element={<RequireAuth allowedRoles={'ROLE_BN'} />}>
          <Route path="admin" element ={<Admin/>}/>
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="inscription/:token" element={<FormulaireInscription/>} />

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
