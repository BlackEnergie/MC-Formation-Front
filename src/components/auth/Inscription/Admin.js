import React, {useState} from 'react';
import axios from '../../../api/axios'
import toast from 'react-hot-toast';


const MAIL_URL = 'http://localhost:8080/auth/signup/invite'

const Admin = () => {

    const [email, setMail] = useState('');
    const [role, setRole] = useState('');
    const [hasUnfilled, setHasUnfilled] = useState({});

    const handleSubmit = async () => {
        try {
            const response = await axios.post(MAIL_URL, JSON.stringify({email, role}),
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                        "Content-Type": "application/json",
                        withCredentials: false,
                    }
                });
                toast.success(response.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
        resetForm()
    }

    const resetForm = () => {
        setMail('');
        setHasUnfilled({});
        setRole('');
    }


    const validate = (e) => {
        e.preventDefault();

        let hasUnfilled = {};
        let isValid = true;

        if (!email) {
            isValid = false;
            hasUnfilled["email"] = "Renseigner l'adresse mail.";
        }
        if (!role) {
            isValid = false;
            hasUnfilled["role"] = "Renseigner le rôle.";
        }
        if (isValid) {
            handleSubmit();
        } else {
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
                                            type="email"
                                            name="nomComplet"
                                            value={email}
                                            onChange={event => setMail(event.target.value)}
                                            className="form-control mt-2"
                                            placeholder="Ex : prenom@gmail.com"
                                            id="email"/>
                                        <div className="text-danger">{hasUnfilled.email}</div>
                                    </td>
                                    <td>
                                        <select className="form-select" aria-label="Default select example"
                                                onChange={(e) => setRole(e.target.value)}>
                                            <option value="" disabled selected hidden>Rôle</option>
                                            <option value="ROLE_FORMATEUR">Formateur</option>
                                            <option value="ROLE_ASSO">Association</option>
                                            <option value="ROLE_BN">Membre du Bureau National</option>
                                        </select>
                                        <div className="text-danger">{hasUnfilled.role}</div>
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
