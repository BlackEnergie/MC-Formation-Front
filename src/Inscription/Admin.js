import React from 'react';
import { useState } from 'react';
import Api from '../api/Api';
import Select from 'react-select';
import { withCookies, Cookies } from 'react-cookie';



const Admin = () =>{

    const [mail, setMail] = useState('');
    const [role, setRole] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({});

    const handleSubmit = () => {
        console.log(role)
    }

    //(le token retourne rôle + mail)
    /*const mapFormToAssociation = () => {
        let association = new Association("test@nauetzrçcdeieazpzc.ccoyem", mdp, "testUsecr", acronyme, college, nomComplet, ville)
        console.log(association);
        return association;
    }*/

    const validate = () => {
        
        let hasUnfilled = {};
        let isValid = true;
        
        if (!mail) {
            isValid = false;
            hasUnfilled["mail"] = "Renseigner l'adresse mail.";
        }
        if (!role) {
            isValid = false;
            hasUnfilled["role"] = "Renseigner le rôle.";
        }
        if (isValid) {
            handleSubmit();
        }
        else {
            setHasUnfilled(hasUnfilled);
        }
    }

    return (
        <div className="col">
            <div className="container shadow p-4 mb-3 bg-white rounded">
                <div className="row">
                    <div className="col-6">
                        <div className="row d-flex justify-content-between">
                            <h3>Inviter des membres</h3>
                        </div>
                        <div className="row  mb-6">
                            <table>
                            <thead>
                            <tr>
                                <th scope="col">Adresse mail</th>
                                <th scope="col">Rôle</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                <input
                                    type="text"
                                    name="nomComplet"
                                    value={mail}
                                    onChange={event => setMail(event.target.value)}
                                    className="form-control mt-2"
                                    placeholder="Ex : prenom@gmail.com"
                                    id="email"/>
                                    <div className="text-danger">{hasUnfilled.mail}</div>
                                </td>
                                <td>
                                    <select class="form-select" aria-label="Default select example" onChange={(e) => setRole(e.target.value)}>
                                        <option value="FORMATEUR">Formateur</option>
                                        <option value="ASSO">Association</option>
                                        <option value="BN">Membre du Bureau National</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="p-2">
                                <input type="button" value="Valider" className="btn btn-primary" onClick={validate}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;