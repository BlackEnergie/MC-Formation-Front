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
import PersistLogin from './components/PersistLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
      <>
        <Routes>
          <Route exact path="/" element={<Layout />} >
            {/* public routes */}
            <Route path="/" element={<Connexion />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={['ROLE_ASSO']}/>}>
                <Route path="demande" element={<DemandeFormation />} />
                <Route path="accueil" element={<Accueil />} />
                <Route path="modification" element={<ModificationFormation />} />
                <Route path="pagetest" element={<PageTest />} />
              </Route>
            </Route>
            {/*
            <Route element={<RequireAuth allowedRoles={['ROLE_FORMATEUR']}/>}>
              <Route path="demande" element={<DemandeFormation />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={['ROLE_BN']}/>}>
              <Route path="demande" element={<DemandeFormation />} />
            </Route>
            */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </>
  );

}

export default App;
