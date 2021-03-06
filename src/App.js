import React from 'react';
import './App.css';
import {Route, Routes,} from 'react-router-dom';
import Connexion from './components/auth/Connexion/Connexion';
import Layout from './Layout';
import DemandeFormation from './components/formation/DemandeFormation/DemandeFormation';
import Accueil from "./components/Accueil/AccueilFormations";
import ModificationFormation from "./components/formation/ModificationFormation/ModificationFormation";
import Missing from './components/defaults/Missing';
import VueDetailleeFormation from './components/formation/VueDetailleeFormation/VueDetailleeFormation'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/defaults/ProtectedRoute';
import FormulaireInscription from './components/auth/Inscription/FormulaireInscription';
import Admin from './components/Admin/Admin';
import MotDePasseOublie from './components/auth/MotDePasseOublie/MotDePasseOublie';
import ReinitialisationMotDePasse from "./components/auth/MotDePasseOublie/ReinitialisationMotDePasse";
import decodeToken from './auth/decodeToken';
import MonCompte from "./components/Utilisateur/MonCompte";
import ModificationMonCompte from "./components/Utilisateur/ModificationMonCompte";
import toast from "react-hot-toast";
import ModificationMotDePasse from './components/Utilisateur/ModificationMotDePasse';

function App() {

    const jwt = localStorage.getItem('accessToken') || null;
    let role = null;

    const setRole = () => {
        if (jwt !== null) {
            const {isValid, decoded} = decodeToken(jwt);
            if (isValid) {
                role = decoded.role;
            } else {
                localStorage.clear();
                window.location.href = '/connexion';
                toast.error('Session expirée');
                return false;
            }
        }
        return true
    }
    setRole();

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* public routes */}
                <Route path="connexion" element={<Connexion/>}/>
                <Route path="motDePasseOublie" element={<MotDePasseOublie/>}/>
                <Route path="reinitialiserMotDePasse/:token" element={<ReinitialisationMotDePasse/>}/>
                {/* protected routes */}
                <Route element={
                    <ProtectedRoute redirectPath='/connexion' isLoggedIn={setRole()} isAllowed={setRole()}/>}>
                    <Route path="/" element={<Accueil/>}/>
                </Route>
                <Route
                    path="demandeFormation"
                    element={
                        <ProtectedRoute redirectPath="/unauthorized" isLoggedIn={setRole()}
                                        isAllowed={['ROLE_ASSO'].includes(role)}>
                            <DemandeFormation/>
                        </ProtectedRoute>}
                />
                <Route
                    path="admin"
                    element={
                        <ProtectedRoute redirectPath="/unauthorized" isLoggedIn={setRole()}
                                        isAllowed={['ROLE_BN'].includes(role)}>
                            <Admin/>
                        </ProtectedRoute>}
                />
                <Route
                    path="formation/:id"
                    element={
                        <ProtectedRoute redirectPath="/unauthorized" isLoggedIn={setRole()}
                                        isAllowed={['ROLE_BN', 'ROLE_ASSO', 'ROLE_FORMATEUR'].includes(role)}>
                            <VueDetailleeFormation/>
                        </ProtectedRoute>}
                />
                <Route
                    path="formation/edit/:id"
                    element={
                        <ProtectedRoute redirectPath="/unauthorized" isLoggedIn={setRole()}
                                        isAllowed={['ROLE_BN', 'ROLE_ASSO', 'ROLE_FORMATEUR'].includes(role)}>
                            <ModificationFormation/>
                        </ProtectedRoute>}
                />
                <Route
                path="compte"
                element={
                    <ProtectedRoute redirectPath="/unauthorized" isLoggedIn={setRole()} isAllowed={['ROLE_BN','ROLE_ASSO', 'ROLE_FORMATEUR'].includes(role)}>
                        <MonCompte />
                    </ProtectedRoute>}
                />
                <Route
                    path="compte/modification/"
                    element={
                        <ProtectedRoute redirectPath="/unauthorized" isLoggedIn={setRole()} isAllowed={['ROLE_BN','ROLE_ASSO', 'ROLE_FORMATEUR'].includes(role)}>
                            <ModificationMonCompte />
                        </ProtectedRoute>}
                />
                <Route
                    path="compte/modification/motdepasse"
                    element={
                        <ProtectedRoute redirectPath="/unauthorized" isLoggedIn={setRole()} isAllowed={['ROLE_BN','ROLE_ASSO', 'ROLE_FORMATEUR'].includes(role)}>
                            <ModificationMotDePasse />
                        </ProtectedRoute>}
                />
                <Route path="unauthorized" element={<Missing/>}/>
                <Route path="inscription/:token" element={<FormulaireInscription/>}/>
                {/* catch all */}
                <Route path="*" element={<Missing/>}/>
            </Route>
        </Routes>
    );
}

export default App;
